var socket = io();

socket.on('connect',function(){
    console.log('Connected to server');
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

function scrollToBottom()
{
    var $messages = $('#messages');
    var $newMessage = $messages.children('li:last-child');

    var clientHeight = $messages.prop('clientHeight');
    var scrollTop = $messages.prop('scrollTop');
    var scrollHeight = $messages.prop('scrollHeight');
    var newMessageHeight = $newMessage.innerHeight();
    var prevMessageHeight = $newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + prevMessageHeight >=  scrollHeight)
    {
        $messages.scrollTop(scrollHeight);
    }
}

$(document).ready(function(){

    //send message
    $('#message-form').off().on('submit',function(e){
        e.preventDefault();
        var msg = $('input[name="message"]').val();
        if(!msg)
        {
            return alert('Message cannot be empty');
        }
        $('input[name="message"]').val('');
        socket.emit('createMessage',{
            from: 'User',
            text: msg
        },function(){
            console.log('Message sent!');
        });
    });

    var $locationBtn =  $('#send-location');
    $locationBtn.off().on('click',function(){
        if(!navigator.geolocation)
        {
            return alert('Geolocation not support!');
        }
        $locationBtn.attr('disabled','disabled').text('Sending location...');
        navigator.geolocation.getCurrentPosition(function(position){
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            $locationBtn.removeAttr('disabled').text('Sending location');
        },function(){
            alert('Unable to fetch location!');
            $locationBtn.removeAttr('disabled').text('Sending location');
        });
    });
});
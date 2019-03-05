var socket = io();

socket.on('connect',function(){
    console.log('Connected to server');

    /*
    socket.emit('createMessage',{
        from:'mohan',
        text:'hi this is mohan'
    });
    */
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    $('<li></li>').appendTo($('#messages')).text(message.from+' '+formattedTime+': '+message.text);
});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var $li = $('<li></li>').appendTo('#messages').text(message.from+' '+formattedTime+': ');
    var $a = $('<a target="_blank">My Current Location</a>').appendTo($li);
    $a.attr('href',message.url);
});

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
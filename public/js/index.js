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
    console.log('New Message',message);
    $('#messages').append('<li>'+message.from+':'+message.text+'</li>');
});

$(document).ready(function(){

    //send message
    $('.js-send').off().on('click',function(e){
        e.preventDefault();
        var msg = $('input[name="message"]').val();
        if(msg.length < 1)
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

});
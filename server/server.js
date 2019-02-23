const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });
    
    /*
    socket.emit('newMessage',{
        from: 'raju',
        text: 'Hey this is raju.',
        createdAt:123
    });
    */
    
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to the chat app',
        createdAt: Date.now()
    });

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New user joined',
        createdAt: Date.now()
    });

    socket.on('createMessage',function(message){
        console.log(message);

        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: Date.now()
        });
        
        /*
        socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: Date.now()
        });
        */

    });

});


server.listen(port,()=>{
    console.log(`Started on port ${port}`);
});
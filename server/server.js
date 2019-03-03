const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

const {generateMessage} = require('./utils/message');

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
    
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage',function(message,callback){
        io.emit('newMessage',generateMessage(message.from,message.text));
        typeof callback === 'function' && callback('from server');
        
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
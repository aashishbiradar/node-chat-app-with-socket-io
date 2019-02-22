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

    /* message events */
    socket.emit('newMessage',{
        from: 'raju',
        text: 'Hey this is raju.',
        createdAt:123
    });

    socket.on('createMessage',function(message){
        console.log(message);
    });

});


server.listen(port,()=>{
    console.log(`Started on port ${port}`);
});
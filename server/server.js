const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('disconnect',() => {
        console.log('User was disconnected');
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            socket.broadcast.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} left`));
        }
    });
    
    socket.on('join',(params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Invalid name or room!');
        }
        

        callback();

        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));


        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} joined`));
        
        socket.on('createMessage',function(message,callback){
            io.to(params.room).emit('newMessage',generateMessage(message.from,message.text));
            typeof callback === 'function' && callback('from server');
        });
    
        socket.on('createLocationMessage',(coords) => {
            io.to(params.room).emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
        });
    });
});


server.listen(port,()=>{
    console.log(`Started on port ${port}`);
});
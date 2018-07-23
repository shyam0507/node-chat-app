const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');

const {
    isRealString
} = require('./utils/validation');

const {
    Users
} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log("User was disconnected");
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });



    socket.on('join', (params, callback) => {
        //console.log(params);
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        } else {

            socket.join(params.room);

            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);

            console.log(users.getUserList(params.room));

            io.to(params.room).emit('updateUserList', users.getUserList(params.room));

            socket.emit('newMessage', generateMessage("Admin", 'Welcome to chat app'));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));


            callback();
        }

    });


    socket.on('createMessage', (newMessage, callback) => {
        console.log("New message", newMessage);

        //broadcast the message
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        callback();

    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
});




server.listen(PORT, () => {
    console.log("Server is up and running at port", PORT);
});
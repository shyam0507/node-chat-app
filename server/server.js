const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);



var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log("User was disconnected");
    });

    socket.emit('newMessage', {
        'from': 'Admin',
        'text': 'Welcome to chat app',
        'createdAt': new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        'from': 'Admin',
        'text': 'New user joined',
        'createdAt': new Date().getTime()
    });


    socket.on('createMessage', (newMessage) => {
        console.log("New message", newMessage);

        //broadcast the message
        io.emit('newMessage', {
            'from': newMessage.from,
            'text': newMessage.text,
            'createdAt': new Date().getTime()
        });

        // socket.broadcast.emit('newMessage', {
        //     'from': newMessage.from,
        //     'text': newMessage.text,
        //     'createdAt': new Date().getTime()
        // });
    });
});




server.listen(PORT, () => {
    console.log("Server is up and running at port", PORT);
});
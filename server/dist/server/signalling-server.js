"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
io.on('connection', function (socket) {
    socket.on('join_room', function (signallingMessage) {
        socket.join(signallingMessage.roomId);
        socket.to(signallingMessage.roomId).emit('room_users', signallingMessage);
    });
    socket.on('offer_signal', function (signallingMessage) {
        io.to(signallingMessage.calleeId).emit('offer', signallingMessage);
    });
    socket.on('answer_signal', function (signallingMessage) {
        io.to(signallingMessage.callerId).emit('answer', signallingMessage);
    });
    socket.on('disconnecting', function () {
        var rooms = socket.rooms;
        rooms.forEach(function (roomId) {
            io.to(roomId).emit('room_left', socket.id);
        });
    });
    socket.on('leave_room', function () {
        socket.disconnect();
    });
});
http.listen(port, function () { return console.log('listening on *:' + port); });

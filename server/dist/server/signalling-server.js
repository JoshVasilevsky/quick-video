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
        io.to(signallingMessage.callerId).emit('answer', { signalData: signallingMessage.signalData, calleeId: socket.id });
    });
    socket.on('disconnect', function () {
        io.emit('room_left', { type: 'disconnected', socketId: socket.id });
    });
});
http.listen(port, function () { return console.log('listening on *:' + port); });

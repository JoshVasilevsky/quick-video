var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
import { SignallingMessage } from '../frontend/src/app/models/signallingMessage.model';

io.on('connection', (socket: any) => {
    socket.on('join_room', (signallingMessage : SignallingMessage) => {
        socket.join(signallingMessage.roomId);
        socket.to(signallingMessage.roomId).emit('room_users', signallingMessage);
    })

    socket.on('offer_signal',  (signallingMessage : SignallingMessage) => {
        io.to(signallingMessage.calleeId).emit('offer', signallingMessage);
    });

    socket.on('answer_signal',  (signallingMessage : SignallingMessage) => {
        io.to(signallingMessage.callerId).emit('answer', { signalData: signallingMessage.signalData, calleeId: socket.id });
    });

    socket.on('disconnect', () => {
        io.emit('room_left', { type: 'disconnected', socketId: socket.id })
    })
});

http.listen(port, () => console.log('listening on *:' + port)); 
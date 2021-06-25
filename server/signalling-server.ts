var app = require('express')();
var path = require('path');
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
        io.to(signallingMessage.callerId).emit('answer', signallingMessage);
    });

    socket.on('disconnecting', () => {
        const rooms = socket.rooms
        rooms.forEach(roomId => {
            io.to(roomId).emit('room_left',  socket.id);
        });
    })

    socket.on('leave_room', () => {
        socket.disconnect();
    })
});

if(process.env.PROD){
    app.use(app.static(path.join(__dirname, '../frontend/src')));
    app.get('*', (req, res) =>{
        res.sendFild(path.join(__dirname, '../frontend/src/index.html'))
    })
}

http.listen(port, () => console.log('listening on *:' + port)); 
const express = require("express");
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    socket.on('join_room', (signallingMessage) => {
        socket.join(signallingMessage.roomId);
        socket.to(signallingMessage.roomId).emit('room_users', signallingMessage);
    })

    socket.on('offer_signal',  (signallingMessage) => {
        io.to(signallingMessage.calleeId).emit('offer', signallingMessage);
    });

    socket.on('answer_signal',  (signallingMessage) => {
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
    app.use(express.static(path.join(__dirname, './frontend/dist')));
    app.get('*', (req, res) =>{
        res.sendFild(path.join(__dirname, './frontend/dist/index.html'))
    })
}

http.listen(port, () => console.log('listening on *:' + port)); 
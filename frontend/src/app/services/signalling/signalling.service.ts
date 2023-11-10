import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import { Peer } from '../../models/peer.model';
import { SignallingMessage } from '../../models/signallingMessage.model';

@Injectable({
  providedIn: 'root'
})
export class SignallingService {

  private socket: Socket;

  get socketId() {
    return this.socket.id
  }

  connect() {
    this.socket = io('localhost:3000',  { transports: ['websocket', 'polling', 'flashsocket'] })
  }

  onConnect(fn: () => void) {
    this.socket.on('connect', fn)
  }

  requestToJoinRoom(message: SignallingMessage) {
    this.socket.emit('join_room', message)
  }

  onRoomPeers(fn: (roomPeers: Peer) => void) {
    this.socket.on('room_users', fn)
  }

  sendOfferSignal(message: SignallingMessage) {
    this.socket.emit('offer_signal', message)
  }

  onOffer(fn: (msg: SignallingMessage) => void) {
    this.socket.on('offer', fn)
  }

  sendAnswerSignal(message: SignallingMessage) {
    this.socket.emit('answer_signal', message);
  }

  onAnswer(fn: (messsage: SignallingMessage) => void) {
    this.socket.on('answer', fn)
  }

  onRoomLeft(fn: (socketId: string) => void) {
    this.socket.on('room_left', fn);
  }

  leaveRoom(){
    this.socket.emit('leave_room');
  }

}

import { Component, Input, OnInit} from '@angular/core';
import Peer from "simple-peer";
import { SignallingMessage } from '../../models/signallingMessage.model';
import { VideoElement } from '../../models/videoElement.model';
import { Peer as userPeer } from '../../models/peer.model';
import { RoomSettings } from '../../models/room-settings.model';
import { EventEmitterService } from '../../services/event-emitter/event-emitter.service';
import { SignallingService } from '../../services/signalling/signalling.service';
import { Message } from '../../models/message.model';


@Component({
  selector: 'room-display',
  templateUrl: './room-display.component.html',
  styleUrls: ['./room-display.component.scss']
})

export class RoomDisplayComponent implements OnInit {
  
  @Input() roomSettings: RoomSettings;
  peers: Array<userPeer> = new Array();
  videos: VideoElement[] = [];
  messages: Message[] = [];
  unreadMessages: number = 0;
  isConnected: boolean = false;

  currentUser: userPeer;
  userStream: MediaStream;
  
  constructor(private eventEmitterService: EventEmitterService, private signalingService: SignallingService,) { }

  ngOnInit(): void {
    this.subscribeToToggleChatEventUpdate();
    this.subscribeToToggleMicEventUpdate();
    this.subscribeToToggleCameraEventUpdate();
    this.subscribeToSendMessageEventUpdate();
    this.subscribeToDisconnectEventUpdate()
   
    navigator.mediaDevices.getUserMedia({ audio: true, video: {width: 500, height:400} }).then(stream => {
      this.userStream = stream;
      this.handleStreamConnection(this.userStream);
    })
    .catch(err => {
      console.log(err)
    });
  }

  handleStreamConnection(stream: MediaStream){
    this.signalingService.connect();
   
    this.signalingService.onConnect(() => {
      this.addUserVideo(this.signalingService.socketId, this.roomSettings.username, this.userStream, true);
      this.isConnected = true;
      this.setMic(this.roomSettings.isAudioEnabled);
      this.setCamera(this.roomSettings.isVideoEnabled);
      console.log(`Socket Id ${this.signalingService.socketId}`);

      this.currentUser = { 
        username: this.roomSettings.username, 
        peerId: this.signalingService.socketId 
      }

      const signallingMessage: SignallingMessage = { 
        roomId: this.roomSettings.roomId, 
        username: this.roomSettings.username, 
        calleeId: this.signalingService.socketId 
      }

      this.signalingService.requestToJoinRoom(signallingMessage);
      
      this.signalingService.onRoomPeers(roomPeer => {
        this.createPeerAsCaller(roomPeer, stream);
      });
      
      this.signalingService.onOffer(message => {
        this.createPeerAsCallee(message, stream);
      });
      
      this.signalingService.onAnswer(message => {
        let userPeer = this.peers.find(peer => peer.peerId === message.calleeId);
        if(userPeer){
          userPeer.peer.signal(message.signalData);
        }
      });

      this.signalingService.onRoomLeft(socketId => {
        this.handleUserLeave(socketId);
      })
    })
  }

  createPeerAsCaller(message: SignallingMessage, stream: MediaStream): void {
    const peer = new Peer({initiator: true, trickle: false, stream});
    peer.on('stream', stream => this.addUserVideo(message.calleeId, message.username, stream, false));
    peer.on('data', data => this.handleMessageRecieved(data));
    peer.on('signal', signal => this.handleSendOffer(signal, message.calleeId));
    this.peers.push({ peerId: message.calleeId, peer: peer, username: message.username });
    
  }

 createPeerAsCallee(message: SignallingMessage, stream: MediaStream): void {
    const peer = new Peer({initiator: false, trickle: false, stream});
    peer.on('stream', stream => this.addUserVideo(message.callerId, message.username, stream, false));
    peer.on('data', data => this.handleMessageRecieved(data));
    peer.on('signal', signal => this.handleOfferRecieved(signal, message.callerId));
    peer.signal(message.signalData);
    this.peers.push({ peerId: message.callerId, peer: peer, username: message.username });
  }

  addUserVideo(videoId: string, username: string, stream: MediaStream, muted:boolean): void {
    if (!this.videos.some(video => video.videoId === videoId)) {
      this.videos.push({muted: muted,srcObject: stream, videoId, username});
    }else{
      console.log(this.videos, videoId);
    }
  }

  handleUserLeave(socketId){
    this.videos = this.videos.filter(video => socketId !== video.videoId);
    const peer: userPeer = this.peers.find(peer => socketId === peer.peerId);
    if(peer){
      peer.peer.destroy();
      this.peers = this.peers.filter(peer => socketId !== peer.peerId);
    }
    if(socketId === this.signalingService.socketId){
      this.userStream.getTracks().forEach(track => track.stop());
      this.peers.forEach(peer => peer.peer.destroy());
      this.isConnected = false;
    }

  }

  handleSendOffer(signal: any, calleeId: string): void{
    const signallingMessage: SignallingMessage = { 
      signalData: signal, 
      callerId: this.signalingService.socketId, 
      calleeId: calleeId, 
      username: this.roomSettings.username
    }
    this.signalingService.sendOfferSignal(signallingMessage);
  }

  handleOfferRecieved(signal: any, callerId: string): void{
    const signallingMessage: SignallingMessage = { 
      signalData: signal, 
      callerId: callerId, 
      calleeId: this.signalingService.socketId, 
    }
    this.signalingService.sendAnswerSignal(signallingMessage);
  }

  handleMessageRecieved(data) {
    const stringMessage: string = new TextDecoder().decode(data); 
    const message: Message = JSON.parse(stringMessage);
    message.time = new Date(message.time);
    this.messages.push(message)
    if(!this.roomSettings.isChatOpen){
      this.unreadMessages++;
    }
  }

  subscribeToDisconnectEventUpdate(){
    this.eventEmitterService.getDisconnectEvent().subscribe(()=>{
      if(this.isConnected){
        this.signalingService.leaveRoom();
        //this.roomSettings.isSharingScreen = false;
        this.roomSettings.isChatOpen = false;
        this.roomSettings.isInCall = false;
        this.eventEmitterService.emitJoinLeaveRoomEvent(this.roomSettings)
      }
    });
  }

  subscribeToToggleChatEventUpdate(){
    this.eventEmitterService.getToggleChatEvent().subscribe((isChatOpen: boolean)=>{
      this.roomSettings.isChatOpen = isChatOpen;
      if(isChatOpen){
        this.unreadMessages = 0;
      }
    });
  }

  subscribeToSendMessageEventUpdate(){
    this.eventEmitterService.getSendMessageEvent().subscribe((message: Message)=>{
      if(this.isConnected){
        this.messages.push(message);
        this.peers.forEach(userPeer=>{
          userPeer.peer.send(JSON.stringify(message));
        })
      }
    });
  }

  subscribeToToggleMicEventUpdate(){
    this.eventEmitterService.getToggleMicEvent().subscribe((isAudioEnabled: boolean)=>{
      if(this.isConnected){
        this.roomSettings.isAudioEnabled = isAudioEnabled;
        this.setMic(isAudioEnabled);
      }
    });
  }
  
  subscribeToToggleCameraEventUpdate(){
    this.eventEmitterService.getToggleCameraEvent().subscribe((isVideoEnabled: boolean)=>{
      if(this.isConnected){
        this.roomSettings.isVideoEnabled = isVideoEnabled;
        this.setCamera(isVideoEnabled);
      }
    });
  }

  setMic(isAudioEnabled){
    this.userStream.getAudioTracks()[0].enabled = isAudioEnabled;
  }

  setCamera(isVideoEnabled){
    this.userStream.getVideoTracks()[0].enabled = isVideoEnabled;
  }

  /* add later
  subscribeToToggleSharingScreenEventUpdate(){
    this.eventEmitterService.getToggleShareScreenEvent().subscribe((isSharingScreen: boolean)=>{
      if(isSharingScreen){
        // @ts-ignore
        navigator.mediaDevices.getDisplayMedia({audio: true,video: true}).then(stream => {
          this.roomSettings.isSharingScreen = isSharingScreen;
          this.handleStreamConnection(stream);
        })
        .catch(err => {
          console.log(err)
        });
      }
      
    })
  }*/
  

}



import { Component, Input, OnInit} from '@angular/core';
import Peer from "simple-peer";
import { SignallingMessage } from '../../models/signallingMessage.model';
import { VideoElement } from '../../models/videoElement.model';
import { Peer as userPeer } from '../../models/peer.model';
import { RoomSettings } from '../../models/room-settings.model';
import { EventEmitterService } from '../../services/event-emitter/event-emitter.service';
import { SignallingService } from '../../services/signalling/signalling.service';


@Component({
  selector: 'room-display',
  templateUrl: './room-display.component.html',
  styleUrls: ['./room-display.component.scss']
})

export class RoomDisplayComponent implements OnInit {

  peers: Array<userPeer> = new Array();
  userStream: MediaStream;

  @Input() roomSettings: RoomSettings;

  videos: VideoElement[] = [];
 
  
  constructor(private eventEmitterService: EventEmitterService, private signalingService: SignallingService,) { }

  ngOnInit(): void {
    this.subscribeToToggleChatEventUpdate();
    this.subscribeToToggleMicEventUpdate();
    this.subscribeToToggleCameraEventUpdate();
    this.subscribeToToggleSharingScreenEventUpdate();
   
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
      console.log(`Socket Id ${this.signalingService.socketId}`);

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
        let userPeer = this.peers.find(userPeer => userPeer.peerId === message.calleeId);
        if(userPeer){
          userPeer.peer.signal(message.signalData);
        }
      });

      /*this.signalingService.onRoomLeft(socketId => {
        this.peers = this.peers.filter(mitronPeer => socketId != mitronPeer.peerId)
      })*/
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

  addUserVideo(videoId: string, username: string, stream: MediaStream, muted:boolean): void {
    if (!this.videos.some(video => video.videoId === videoId)) {
      this.videos.push({muted: muted,srcObject: stream, videoId, username});
    }else{
      console.log(this.videos, videoId);
    }
  }

  sendMessage(){
    console.log('click test');
    this.peers.forEach(userPeer=>{
      console.log(userPeer);
      userPeer.peer.send(JSON.stringify("test"));
    })
  }

  handleMessageRecieved(data) {
    console.log(JSON.parse(data.toString()));
  }

  subscribeToToggleChatEventUpdate(){
    this.eventEmitterService.getToggleChatEvent().subscribe((isChatOpen: boolean)=>{
      this.roomSettings.isChatOpen = isChatOpen;
    })
  }

  subscribeToToggleMicEventUpdate(){
    this.eventEmitterService.getToggleMicEvent().subscribe((isAudioEnabled: boolean)=>{
      this.roomSettings.isAudioEnabled = isAudioEnabled;
      this.userStream.getAudioTracks()[0].enabled = isAudioEnabled;
     
    })
  }
  
  subscribeToToggleCameraEventUpdate(){
    this.eventEmitterService.getToggleCameraEvent().subscribe((isVideoEnabled: boolean)=>{
      this.roomSettings.isVideoEnabled = isVideoEnabled;
      this.userStream.getVideoTracks()[0].enabled = isVideoEnabled;
    })
  }

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
  }
  

}



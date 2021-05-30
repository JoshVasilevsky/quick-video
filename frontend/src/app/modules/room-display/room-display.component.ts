import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import SimplePeer from 'simple-peer';
import { SignallingMessage } from '../../models/signallingMessage.model';
import { VideoElement } from '../../models/videoElement.model';
import { Peer } from '../../models/peer.model';
import { RoomSettings } from '../../models/room-settings.model';
import { EventEmitterService } from '../../services/event-emitter/event-emitter.service';
import { SignalingService } from '../../services/signalling/signalling.service';


@Component({
  selector: 'room-display',
  templateUrl: './room-display.component.html',
  styleUrls: ['./room-display.component.scss']
})

export class RoomDisplayComponent implements OnInit {

  peers: Array<Peer> = new Array();
  userStream: MediaStream;

  @Input() roomSettings: RoomSettings;

  @ViewChild('userVideo')
  userVideo: ElementRef<HTMLVideoElement>
  @ViewChild('userVideoDisplay')
  userVideoDisplay: ElementRef<HTMLVideoElement>

  videos: VideoElement[] = [];
 
  
  constructor(private eventEmitterService: EventEmitterService, private signalingService: SignalingService,) { }

  ngOnInit(): void {
    this.subscribeToToggleChatEventUpdate();
    this.subscribeToToggleMicEventUpdate();
    this.subscribeToToggleCameraEventUpdate();
    this.subscribeToToggleSharingScreenEventUpdate();
   
    navigator.mediaDevices.getUserMedia({ audio: true, video: {width: 500, height:400} }).then(stream => {
      this.userVideo.nativeElement.srcObject = this.userStream = stream;
      this.userVideo.nativeElement.muted = true;
      this.handleStreamConnection(this.userStream);
    })
    .catch(err => {
      console.log(err)
    });
  }

  handleStreamConnection(stream: MediaStream){
    this.signalingService.connect();

    this.signalingService.onConnect(() => {
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
        console.log(message);
        let peer = this.peers.find(peer => peer.peerId === message.calleeId);
        if(peer){
          peer.peer.signal(message.signalData);
        }
      });

      /*this.signalingService.onRoomLeft(socketId => {
        this.peers = this.peers.filter(mitronPeer => socketId != mitronPeer.peerId)
      })*/
    })
  }

  createPeerAsCaller(message: SignallingMessage, stream: MediaStream): void {
    console.log(message);
    const peer: SimplePeer.Instance = new SimplePeer({initiator: true, trickle: false, stream});
    peer.on('stream', stream => {
      this.addUserVideo(message.calleeId, message.username, stream);
    });
    peer.on('signal', signal => {
      const signallingMessage: SignallingMessage = { 
        signalData: signal, 
        callerId: this.signalingService.socketId, 
        calleeId: message.calleeId, 
        username: this.roomSettings.username
      }
      this.signalingService.sendOfferSignal(signallingMessage);
    });
    this.peers.push({ peerId: message.calleeId, peer: peer, username: message.username });
  }

 createPeerAsCallee(message: SignallingMessage, stream: MediaStream): void {
   console.log(message);
    const peer: SimplePeer.Instance = new SimplePeer({initiator: false, trickle: false, stream});
    peer.on('stream', stream => {
      this.addUserVideo(message.callerId, message.username, stream);
    });
    peer.on('signal', signal => {
      this.signalingService.sendAnswerSignal({ signalData: signal, callerId: message.callerId});
    });
    peer.signal(message.signalData);
    this.peers.push({ peerId: message.callerId, peer: peer, username: message.username });
  }

  addUserVideo(videoId: string, username: string, stream: MediaStream): void {
    if (!this.videos.some(video => video.videoId === videoId)) {
      this.videos.push({muted: false,srcObject: stream, videoId, username});
    }else{
      console.log(this.videos, videoId);
    }
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
      this.roomSettings.isSharingScreen = isSharingScreen;
      if(isSharingScreen){
        // @ts-ignore
        navigator.mediaDevices.getDisplayMedia({audio: true,video: true}).then(stream => {
          this.userVideoDisplay.nativeElement.srcObject = stream;
          this.userVideoDisplay.nativeElement.muted = true;
          this.handleStreamConnection(stream);
        })
        .catch(err => {
          console.log(err)
        });
      }
      
    })
  }
  

}



import { Component, Input} from '@angular/core';
import { RoomSettings } from 'src/app/models/room-settings.model';
import { EventEmitterService } from '../../../app/services/event-emitter/event-emitter.service';

@Component({
  selector: 'call-toolbar',
  templateUrl: './call-toolbar.component.html',
  styleUrls: ['./call-toolbar.component.scss']
})
export class CallToolbarComponent{

  @Input() roomSettings: RoomSettings;

  constructor(private eventEmitterService: EventEmitterService){}

  toggleChat(){
    this.roomSettings.isChatOpen= !this.roomSettings.isChatOpen;
    this.eventEmitterService.emitToggleChatEvent(this.roomSettings.isChatOpen)
  } 

  toggleMic(){
    this.roomSettings.isAudioEnabled = !this.roomSettings.isAudioEnabled;
    this.eventEmitterService.emitToggleMicEvent(this.roomSettings.isAudioEnabled)
  }

  toggleCamera(){
    this.roomSettings.isVideoEnabled = !this.roomSettings.isVideoEnabled;
    this.eventEmitterService.emitToggleCameraEvent(this.roomSettings.isVideoEnabled)
  }

  toggleShareScreen(){
    this.roomSettings.isSharingScreen = !this.roomSettings.isSharingScreen;
    this.eventEmitterService.emitToggleShareScreenEvent(this.roomSettings.isSharingScreen)
  }

  leaveCall(){
    this.roomSettings.isSharingScreen = false;
    this.roomSettings.isChatOpen = false;
    this.roomSettings.isInCall = false;
    this.eventEmitterService.emitJoinLeaveRoomEvent(this.roomSettings)
  }
}

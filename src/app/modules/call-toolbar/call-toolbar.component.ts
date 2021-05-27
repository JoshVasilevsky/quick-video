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
  isSharingScreen: boolean = false;
  isChatOpen: boolean = false;

  constructor(private eventEmitterService: EventEmitterService){}

  toggleChat(){
    this.isChatOpen= !this.isChatOpen;
    this.eventEmitterService.emitToggleChatEvent(this.isChatOpen)
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
    this.isSharingScreen = !this.isSharingScreen;
    this.eventEmitterService.emitToggleShareScreenEvent(this.isSharingScreen)
  }

  leaveCall(){
    this.eventEmitterService.emitJoinLeaveRoomEvent(this.roomSettings)
  }
}

import { Component, Input} from '@angular/core';
import { RoomSettings } from '../../../app/models/room-settings.model';
import { EventEmitterService } from '../../../app/services/event-emitter/event-emitter.service';

@Component({
  selector: 'call-toolbar',
  templateUrl: './call-toolbar.component.html',
  styleUrls: ['./call-toolbar.component.scss']
})
export class CallToolbarComponent{

  @Input() roomSettings: RoomSettings
  @Input() unreadMessages: number;

  constructor(private eventEmitterService: EventEmitterService){}

  toggleChat(){
    this.eventEmitterService.emitToggleChatEvent(!this.roomSettings.isChatOpen)
  } 

  toggleMic(){
    this.eventEmitterService.emitToggleMicEvent(!this.roomSettings.isAudioEnabled)
  }

  toggleCamera(){
    this.eventEmitterService.emitToggleCameraEvent(!this.roomSettings.isVideoEnabled)
  }

  toggleShareScreen(){
    this.eventEmitterService.emitToggleShareScreenEvent(!this.roomSettings.isSharingScreen)
  }

  leaveCall(){
    this.eventEmitterService.emitDisconnectEvent()
  }
}

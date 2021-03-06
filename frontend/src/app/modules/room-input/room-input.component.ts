import { Component, Input} from '@angular/core';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../services/event-emitter/event-emitter.service';
import { RoomSettings } from '../../models/room-settings.model';

@Component({
  selector: 'room-input',
  templateUrl: './room-input.component.html',
  styleUrls: ['./room-input.component.scss']
})

export class RoomInputComponent{

  @Input() roomSettings: RoomSettings;

  constructor(private location: Location, private eventEmitterService: EventEmitterService) {}

  updateRoomURL(event: Event): void{
    const target = event.target as HTMLInputElement
    this.location.go(target.value);
    this.roomSettings.roomId = target.value;
  }
  
  joinRoom():void{
    if(!((!this.roomSettings.roomId.trim() || this.roomSettings.roomId.length > 25) || (!this.roomSettings.username.trim() || this.roomSettings.username.length > 25))){
      this.roomSettings.isInCall = true;
      this.eventEmitterService.emitJoinLeaveRoomEvent(this.roomSettings)
    }
   
  }
}

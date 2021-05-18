import { Component, Input} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter/event-emitter.service';
import { RoomJoinSettings } from '../../models/roomJoinSettings.model';

@Component({
  selector: 'room-input',
  templateUrl: './room-input.component.html',
  styleUrls: ['./room-input.component.scss']
})
export class RoomInputComponent{
  roomId : string;
  username: string;
  isAudioChecked : boolean = true;
  isVideoChecked : boolean = true;

  constructor(private location: Location, private route: ActivatedRoute, private eventEmitterService: EventEmitterService) {
    this.route.params.subscribe( params => this.roomId = params.id );
   }

  updateRoomURL(event: Event): void{
    const target = event.target as HTMLInputElement
    this.location.go(target.value);
  }
  
  joinRoom():void{
    let roomJoinSettings: RoomJoinSettings = {
      roomId: this.roomId,
      username: this.username,
      isAudioEnabled: this.isAudioChecked,
      isVideoEnabled: this.isVideoChecked
    };
    this.eventEmitterService.emitJoinRoomEvent(roomJoinSettings)
  }
}

import { Component, Input} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'room-input',
  templateUrl: './room-input.component.html',
  styleUrls: ['./room-input.component.scss']
})
export class RoomInputComponent{
  roomId : string;
  isAudioChecked : boolean = true;
  isVideoChecked : boolean = true;

  constructor(private location: Location, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.roomId = params.id );
   }

  updateRoomURL(event: Event): void{
    const target = event.target as HTMLInputElement
    this.location.go(target.value);
  }
  
}

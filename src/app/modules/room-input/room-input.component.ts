import { Component, Input} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'room-input',
  templateUrl: './room-input.component.html',
  styleUrls: ['./room-input.component.scss']
})
export class RoomInputComponent{
  @Input() roomId : string;
  isAudioChecked : boolean = true;
  isVideoChecked : boolean = true;

  constructor(private location: Location) { }

  updateRoomURL(event: Event): void{
    const target = event.target as HTMLInputElement
    this.location.go(target.value);
  }
  
}

import { Component, Input} from '@angular/core';

@Component({
  selector: 'create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent{
  @Input() roomId : string;

}

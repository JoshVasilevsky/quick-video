import { Component, Input} from '@angular/core';
import { RoomSettings } from 'src/app/models/room-settings.model';

@Component({
  selector: 'landing-display',
  templateUrl: './landing-display.component.html',
  styleUrls: ['./landing-display.component.scss']
})
export class LandingDisplayComponent{
  @Input() roomSettings: RoomSettings;

}

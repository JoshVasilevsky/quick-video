import { Component, OnInit } from '@angular/core';
import { RoomJoinSettings } from 'src/app/models/roomJoinSettings.model';
import { EventEmitterService } from '../../services/event-emitter/event-emitter.service';

@Component({
  selector: 'app-display',
  templateUrl: './app-display.component.html',
  styleUrls: ['./app-display.component.scss']
})
export class AppDisplayComponent implements OnInit {
  isInCall: boolean = false;
  roomJoinSettings : RoomJoinSettings;
  
  constructor(private eventEmitterService: EventEmitterService) {}


  ngOnInit(): void {
    this.subscribeToJoinRoomUpdate();
  }

  subscribeToJoinRoomUpdate(){
    this.eventEmitterService.getJoinRoomEvent().subscribe((roomJoinSettings : RoomJoinSettings)=>{
      this.isInCall = true;
      this.roomJoinSettings = roomJoinSettings;
      console.log(JSON.stringify(roomJoinSettings))
    })
  }
}

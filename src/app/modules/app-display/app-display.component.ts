import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomSettings } from 'src/app/models/room-settings.model';
import { EventEmitterService } from '../../services/event-emitter/event-emitter.service';

@Component({
  selector: 'app-display',
  templateUrl: './app-display.component.html',
  styleUrls: ['./app-display.component.scss']
})
export class AppDisplayComponent implements OnInit {
  isInCall: boolean = false;
  roomSettings : RoomSettings = new RoomSettings();
  
  constructor(private eventEmitterService: EventEmitterService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.roomSettings.roomId = params.id );
  }

  ngOnInit(): void {
    this.subscribeToJoinLeaveRoomUpdate();
  }

  subscribeToJoinLeaveRoomUpdate(){
    this.eventEmitterService.getJoinLeaveRoomEvent().subscribe((roomSettings : RoomSettings)=>{
      this.isInCall = !this.isInCall;
      this.roomSettings = roomSettings;
    })
  }


}

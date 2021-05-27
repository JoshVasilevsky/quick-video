import { Component, Input, OnInit } from '@angular/core';
import { RoomSettings } from 'src/app/models/room-settings.model';

@Component({
  selector: 'room-display',
  templateUrl: './room-display.component.html',
  styleUrls: ['./room-display.component.scss']
})
export class RoomDisplayComponent implements OnInit {

  @Input() roomSettings: RoomSettings;

  constructor() { }

  ngOnInit(): void {
  }
}



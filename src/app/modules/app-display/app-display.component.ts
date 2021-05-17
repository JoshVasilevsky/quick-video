import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './app-display.component.html',
  styleUrls: ['./app-display.component.scss']
})
export class AppDisplayComponent implements OnInit {
  isInCall: boolean = false;
  roomId: string;
  
  ngOnInit(): void {}

}

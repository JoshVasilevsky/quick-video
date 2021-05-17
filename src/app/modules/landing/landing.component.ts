import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  
  isInCall: boolean = false;
  roomId: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.roomId = params.id );
  }
  
  ngOnInit(): void {}

}

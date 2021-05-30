import { Component, OnInit } from '@angular/core';
import {timer} from "rxjs";

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  time: number = 0;
  timerDisplay: any = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  
  ngOnInit(): void {
    timer(0, 1000).subscribe(ec => {
      this.time++;
      this.timerDisplay = this.getDisplayTimer(this.time);
    });
  }

  getDisplayTimer(time: number): any {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time % 3600 / 60);
    const seconds =Math.floor(time % 3600 % 60);
    if(hours<1000){
      return{   
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
      }
    }else{
      return{   
        hours: '--',
        minutes: '--',
        seconds: '--',
      }
    }

   
   
  }
}



import { NgModule } from "@angular/core";
import { TimerComponent } from "./timer.component";
import { CommonModule } from '@angular/common';  

@NgModule({
    imports: [CommonModule],
    declarations:[TimerComponent],
    exports: [TimerComponent]
  })

  export class TimerModule { }
  
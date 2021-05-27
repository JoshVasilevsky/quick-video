import { NgModule } from "@angular/core";
import { CallToolbarComponent } from "./call-toolbar.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from "@angular/forms";
import { TimerModule } from "../timer/timer.module";

@NgModule({
    imports: [MatIconModule, MatButtonModule, MatToolbarModule, FormsModule, TimerModule],
    declarations:[CallToolbarComponent],
    exports: [CallToolbarComponent]
  })

  export class CallToolbarModule { }
  
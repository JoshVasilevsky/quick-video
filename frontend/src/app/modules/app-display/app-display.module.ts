import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LandingDisplayModule } from "../landing-display/landing-display.module";
import { RoomDisplayModule } from "../room-display/room-display.module";
import { AppDisplayComponent } from "./app-display.component";

@NgModule({
    imports: [CommonModule, LandingDisplayModule, RoomDisplayModule],
    declarations:[AppDisplayComponent],
    exports: [AppDisplayComponent]
  })

  export class AppDisplayModule { }
  
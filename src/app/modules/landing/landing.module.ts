import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CreateRoomModule } from "../create-room/create-room.module";
import { RoomDisplayModule } from "../room-display/room-display.module";
import { LandingComponent } from "./landing.component";

@NgModule({
    imports: [CommonModule, CreateRoomModule, RoomDisplayModule],
    declarations:[LandingComponent],
    exports: [LandingComponent]
  })

  export class LandingModule { }
  
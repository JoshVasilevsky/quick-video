import { NgModule } from "@angular/core";
import { CreateRoomModule } from "../create-room/create-room.module";
import { LandingComponent } from "./landing.component";

@NgModule({
    imports: [CreateRoomModule],
    declarations:[LandingComponent],
    exports: [LandingComponent]
  })

  export class LandingModule { }
  
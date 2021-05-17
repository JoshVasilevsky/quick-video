import { NgModule } from "@angular/core";
import { LandingDisplayComponent } from "./landing-display.component";
import { RoomInputModule } from "../room-input/room-input.module";
import { LandingBackgroundModule } from "../landing-background/landing-background.module";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
    imports: [RoomInputModule, LandingBackgroundModule, MatToolbarModule],
    declarations:[LandingDisplayComponent],
    exports: [LandingDisplayComponent]
  })

  export class LandingDisplayModule { }
  
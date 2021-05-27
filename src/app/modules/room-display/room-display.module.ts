import { NgModule } from "@angular/core";
import { RoomDisplayComponent } from "./room-display.component";
import { CallToolbarModule } from "../call-toolbar/call-toolbar.module";

@NgModule({
    imports: [CallToolbarModule],
    declarations:[RoomDisplayComponent],
    exports: [RoomDisplayComponent]
  })

  export class RoomDisplayModule { }
  
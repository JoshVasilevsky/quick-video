import { NgModule } from "@angular/core";
import { RoomDisplayComponent } from "./room-display.component";
import { CallToolbarModule } from "../call-toolbar/call-toolbar.module";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CallToolbarModule, CommonModule],
    declarations:[RoomDisplayComponent],
    exports: [RoomDisplayComponent]
  })

  export class RoomDisplayModule { }
  
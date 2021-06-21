import { NgModule } from "@angular/core";
import { RoomDisplayComponent } from "./room-display.component";
import { CallToolbarModule } from "../call-toolbar/call-toolbar.module";
import { CommonModule } from "@angular/common";
import { ChatContainerModule } from "../chat-container/chat-container.module";

@NgModule({
    imports: [CallToolbarModule, CommonModule, ChatContainerModule],
    declarations:[RoomDisplayComponent],
    exports: [RoomDisplayComponent]
  })

  export class RoomDisplayModule { }
  
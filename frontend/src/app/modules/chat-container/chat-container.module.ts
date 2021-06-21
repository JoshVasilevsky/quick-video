import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ChatInputModule } from "../chat-input/chat-input.module";
import { MessageContainerModule } from "../message-container/message-container.module";
import { ChatContainerComponent } from "./chat-container.component";

@NgModule({
    imports: [ChatInputModule, CommonModule, MessageContainerModule, MatIconModule, MatButtonModule],
    declarations:[ChatContainerComponent],
    exports: [ChatContainerComponent]
  })

  export class ChatContainerModule { }
  
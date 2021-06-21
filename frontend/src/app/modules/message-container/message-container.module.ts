import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MessageContainerComponent } from "./message-container.component";

@NgModule({
    imports: [CommonModule],
    declarations:[MessageContainerComponent],
    exports: [MessageContainerComponent]
  })

  export class MessageContainerModule { }
  
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon"
import { ChatInputComponent } from "./chat-input.component";
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from "@angular/forms";


@NgModule({
    imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
    declarations:[ChatInputComponent],
    exports: [ChatInputComponent]
  })

  export class ChatInputModule { }
  
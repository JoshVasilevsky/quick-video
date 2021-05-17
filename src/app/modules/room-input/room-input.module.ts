import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import { RoomInputComponent } from "./room-input.component";
import { Location } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatIconModule } from "@angular/material/icon"
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [ MatInputModule, MatButtonModule, MatSlideToggleModule, MatIconModule, FormsModule],
    declarations:[RoomInputComponent],
    providers:[Location],
    exports: [RoomInputComponent]
  })

  export class RoomInputModule { }
  
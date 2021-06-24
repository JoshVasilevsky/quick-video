import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import { RoomInputComponent } from "./room-input.component";
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatIconModule } from "@angular/material/icon"
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [ MatInputModule, MatButtonModule, MatSlideToggleModule, MatIconModule, FormsModule, MatCardModule,  MatToolbarModule, CommonModule ],
    declarations:[RoomInputComponent],
    providers:[Location],
    exports: [RoomInputComponent]
  })

  export class RoomInputModule { }
  
import { NgModule } from "@angular/core";
import { CreateRoomComponent } from "./create-room.component";
import {MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [MatCardModule, MatButtonModule],
    declarations:[CreateRoomComponent],
    exports: [CreateRoomComponent]
  })

  export class CreateRoomModule { }
  
import { NgModule } from "@angular/core";
import { CreateRoomComponent } from "./create-room.component";
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RoomInputModule } from "../room-input/room-input.module";

@NgModule({
    imports: [MatCardModule, RoomInputModule, MatToolbarModule],
    declarations:[CreateRoomComponent],
    exports: [CreateRoomComponent]
  })

  export class CreateRoomModule { }
  
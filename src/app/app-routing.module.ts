import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing.component';
import { RoomDisplayComponent } from './modules/room-display/room-display.component';



const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'room',
    component: RoomDisplayComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

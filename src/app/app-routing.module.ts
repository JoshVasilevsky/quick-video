import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing.component';
const uuid = require("uuid");

const DEFAULT_ROOM_ID_LENGTH = 8;

const routes: Routes = [
  {
    path: ':id',
    component: LandingComponent,
  },
  { path: '', redirectTo: uuid.v4().substring(0,DEFAULT_ROOM_ID_LENGTH), pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

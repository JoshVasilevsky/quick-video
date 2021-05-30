import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDisplayComponent } from './modules/app-display/app-display.component';
const uuid = require("uuid");

const DEFAULT_ROOM_ID_LENGTH = 8;

const routes: Routes = [
  {
    path: ':id',
    component: AppDisplayComponent,
  },
  { path: '', redirectTo: uuid.v4().substring(0,DEFAULT_ROOM_ID_LENGTH), pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

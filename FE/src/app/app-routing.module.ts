import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomePageComponent} from "./componetnts/welcome-page/welcome-page.component";
import {BoardPageComponent} from "./componetnts/board-page/board-page.component";
import {PacientProfileComponent} from "./componetnts/pacient-profil/pacient-profile.component";



const routes: Routes = [
  { path:"", component: WelcomePageComponent },
  { path:"pacient", component: PacientProfileComponent},
  { path:"borad", component:BoardPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

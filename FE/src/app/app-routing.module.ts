import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomePageComponent} from "./componetnts/welcome-page/welcome-page.component";
import {BoardPageComponent} from "./componetnts/board-page/board-page.component";
import {AlergiePageComponent} from "./componetnts/alergie-page/alergie-page.component";
import {OchoreniaPageComponent} from "./componetnts/ochorenia-page/ochorenia-page.component";



const routes: Routes = [
  { path:"", component: WelcomePageComponent },
  { path:"pacient", component: AlergiePageComponent},
  { path: "ochorenia", component: OchoreniaPageComponent},
  { path:"borad", component:BoardPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

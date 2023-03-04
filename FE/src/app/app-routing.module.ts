import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomePageComponent} from "./componetnts/welcome-page/welcome-page.component";
import {BoardPageComponent} from "./componetnts/board-page/board-page.component";



const routes: Routes = [
  { path:"", component: WelcomePageComponent },
  { path:"borad", component:BoardPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

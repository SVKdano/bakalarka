import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './componetnts/welcome-page/welcome-page.component';
import { AppRoutingModule } from './app-routing.module';
import { BoardPageComponent } from './componetnts/board-page/board-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    BoardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

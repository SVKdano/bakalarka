import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './componetnts/welcome-page/welcome-page.component';
import { AppRoutingModule } from './app-routing.module';
import { BoardPageComponent } from './componetnts/board-page/board-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { PacientProfileComponent } from './componetnts/pacient-profil/pacient-profile.component';
import { PanelComponent } from './componetnts/panel/panel.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './componetnts/navbar/navbar.component';
import { AlergieComponent } from './componetnts/alergie/alergie.component';
import { AlergiePageComponent } from './componetnts/alergie-page/alergie-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    BoardPageComponent,
    PacientProfileComponent,
    PanelComponent,
    NavbarComponent,
    AlergieComponent,
    AlergiePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

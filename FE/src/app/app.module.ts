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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PacientProfileComponent } from './componetnts/pacient-profil/pacient-profile.component';
import { PanelComponent } from './componetnts/panel/panel.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './componetnts/navbar/navbar.component';
import { AlergieComponent } from './componetnts/alergie/alergie.component';
import { AlergiePageComponent } from './componetnts/alergie-page/alergie-page.component';
import { OchoreniaPageComponent } from './componetnts/ochorenia-page/ochorenia-page.component';
import { LiekyPageComponent } from './componetnts/lieky-page/lieky-page.component';
import { DoktoriPageComponent } from './componetnts/doktori-page/doktori-page.component';
import { ZaznamyPageComponent } from './componetnts/zaznamy-page/zaznamy-page.component';
import { OrderPipe } from './pipe/order.pipe';
import { ZaznamDetailComponent } from './componetnts/zaznam-detail/zaznam-detail.component';
import { ListkyPageComponent } from './componetnts/listky-page/listky-page.component';
import { DoktorWelcomeComponent } from './componetnts/doktor-welcome/doktor-welcome.component';
import { DoktorProfileComponent } from './componetnts/doktor-profile/doktor-profile.component';
import { DoktorPanelComponent } from './componetnts/doktor-panel/doktor-panel.component';
import { DoktorPacientiComponent } from './componetnts/doktor-pacienti/doktor-pacienti.component';
import { PacientDoktorProfileComponent } from './componetnts/pacient-doktor-profile/pacient-doktor-profile.component';
import { RegisterComponent } from './componetnts/register/register.component';
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import { PacientUpdateComponent } from './componetnts/pacient-update/pacient-update.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    BoardPageComponent,
    PacientProfileComponent,
    PanelComponent,
    NavbarComponent,
    AlergieComponent,
    AlergiePageComponent,
    OchoreniaPageComponent,
    LiekyPageComponent,
    DoktoriPageComponent,
    ZaznamyPageComponent,
    OrderPipe,
    ZaznamDetailComponent,
    ListkyPageComponent,
    DoktorWelcomeComponent,
    DoktorProfileComponent,
    DoktorPanelComponent,
    DoktorPacientiComponent,
    PacientDoktorProfileComponent,
    RegisterComponent,
    PacientUpdateComponent
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
        HttpClientModule,
        MatSelectModule,
        FormsModule,
        MatMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

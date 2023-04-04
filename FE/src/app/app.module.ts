import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './componetnts/welcome-page/welcome-page.component';
import { AppRoutingModule } from './app-routing.module';
import { BoardPageComponent } from './componetnts/board-page/board-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PacientProfileComponent } from './componetnts/pacient-profil/pacient-profile.component';
import { PanelComponent } from './componetnts/panel/panel.component';
import { HttpClientModule } from "@angular/common/http";
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
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { PacientUpdateComponent } from './componetnts/pacient-update/pacient-update.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule} from "@angular/material/core";
import { DoktorNewpacientComponent } from './componetnts/doktor-newpacient/doktor-newpacient.component';
import { DoktorPacientAlergieComponent } from './componetnts/doktor-pacient-alergie/doktor-pacient-alergie.component';
import { InnerpanelDoktorpacientComponent } from './componetnts/innerpanel-doktorpacient/innerpanel-doktorpacient.component';
import { DoktorPacientProfileComponent } from './componetnts/doktor-pacient-profile/doktor-pacient-profile.component';
import { DoktorPacientAlergieChangeComponent } from './componetnts/doktor-pacient-alergie-change/doktor-pacient-alergie-change.component';
import { PacientHesloComponent } from './componetnts/pacient-heslo/pacient-heslo.component';
import { PanelDoktorComponent } from './componetnts/panel-doktor/panel-doktor.component';
import { DoktorPacientLiekyComponent } from './componetnts/doktor-pacient-lieky/doktor-pacient-lieky.component';
import { DoktorPacientZaznamyComponent } from './componetnts/doktor-pacient-zaznamy/doktor-pacient-zaznamy.component';
import { DoktorPacientOchoreniaComponent } from './componetnts/doktor-pacient-ochorenia/doktor-pacient-ochorenia.component';
import { DoktorPacientListkyComponent } from './componetnts/doktor-pacient-listky/doktor-pacient-listky.component';
import { DoktorPacientLiekyChangeComponent } from './componetnts/doktor-pacient-lieky-change/doktor-pacient-lieky-change.component';
import { DoktorPacientOchoreniaChangeComponent } from './componetnts/doktor-pacient-ochorenia-change/doktor-pacient-ochorenia-change.component';
import { DoktorPacientListkyChangeComponent } from './componetnts/doktor-pacient-listky-change/doktor-pacient-listky-change.component';
import { DoktorPacientAlegrgiaShareComponent } from './componetnts/doktor-pacient-alegrgia-share/doktor-pacient-alegrgia-share.component';
import { DoktorPacientZaznamyDetailComponent } from './componetnts/doktor-pacient-zaznamy-detail/doktor-pacient-zaznamy-detail.component';
import { DoktorPacientZaznamyPridajComponent } from './componetnts/doktor-pacient-zaznamy-pridaj/doktor-pacient-zaznamy-pridaj.component';
import { DoktorPacientZaznamyChangeComponent } from './componetnts/doktor-pacient-zaznamy-change/doktor-pacient-zaznamy-change.component';
import { DoktorZdielaneAlergieComponent } from "./componetnts/doktor-zdielane-alergie/doktor-zdielane-alergie.component";
import {
  DoktorZazdielaneAlergieComponent
} from "./componetnts/doktor-zazdielane-alergie/doktor-zazdielane-alergie.component";
import { DoktorZdielaniePanelComponent } from './componetnts/doktor-zdielanie-panel/doktor-zdielanie-panel.component';
import { DoktorZazdielaneLiekyComponent } from './componetnts/doktor-zazdielane-lieky/doktor-zazdielane-lieky.component';
import { DoktorZazdielaniePanelComponent } from './componetnts/doktor-zazdielanie-panel/doktor-zazdielanie-panel.component';
import { DoktorZdielaneLiekyComponent } from './componetnts/doktor-zdielane-lieky/doktor-zdielane-lieky.component';
import { DoktorPacientLiekyShareComponent } from './componetnts/doktor-pacient-lieky-share/doktor-pacient-lieky-share.component';
import { DoktorZazdielanieOchoreniaComponent } from './componetnts/doktor-zazdielanie-ochorenia/doktor-zazdielanie-ochorenia.component';
import { DoktorZdielanieOchoreniaComponent } from './componetnts/doktor-zdielanie-ochorenia/doktor-zdielanie-ochorenia.component';
import { DoktorPacientOchoreniaShareComponent } from './componetnts/doktor-pacient-ochorenia-share/doktor-pacient-ochorenia-share.component';
import { DoktorZazdielanieZaznamyComponent } from './componetnts/doktor-zazdielanie-zaznamy/doktor-zazdielanie-zaznamy.component';
import { DoktorZdielaneZaznamyComponent } from './componetnts/doktor-zdielane-zaznamy/doktor-zdielane-zaznamy.component';
import { DoktorZdielaneZaznamyDetailComponent } from './componetnts/doktor-zdielane-zaznamy-detail/doktor-zdielane-zaznamy-detail.component';
import { DoktorBoardComponent } from './componetnts/doktor-board/doktor-board.component';

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
    PacientUpdateComponent,
    DoktorNewpacientComponent,
    DoktorPacientAlergieComponent,
    InnerpanelDoktorpacientComponent,
    DoktorPacientProfileComponent,
    DoktorPacientAlergieChangeComponent,
    PacientHesloComponent,
    PanelDoktorComponent,
    DoktorPacientLiekyComponent,
    DoktorPacientZaznamyComponent,
    DoktorPacientOchoreniaComponent,
    DoktorPacientListkyComponent,
    DoktorPacientLiekyChangeComponent,
    DoktorPacientOchoreniaChangeComponent,
    DoktorPacientListkyChangeComponent,
    DoktorPacientAlegrgiaShareComponent,
    DoktorPacientZaznamyDetailComponent,
    DoktorPacientZaznamyPridajComponent,
    DoktorPacientZaznamyChangeComponent,
    DoktorZdielaneAlergieComponent,
    DoktorZazdielaneAlergieComponent,
    DoktorZdielaniePanelComponent,
    DoktorZazdielaneLiekyComponent,
    DoktorZazdielaniePanelComponent,
    DoktorZdielaneLiekyComponent,
    DoktorPacientLiekyShareComponent,
    DoktorZazdielanieOchoreniaComponent,
    DoktorZdielanieOchoreniaComponent,
    DoktorPacientOchoreniaShareComponent,
    DoktorZazdielanieZaznamyComponent,
    DoktorZdielaneZaznamyComponent,
    DoktorZdielaneZaznamyDetailComponent,
    DoktorBoardComponent
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
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

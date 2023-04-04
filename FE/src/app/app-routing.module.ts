import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomePageComponent} from "./componetnts/welcome-page/welcome-page.component";
import {AlergiePageComponent} from "./componetnts/alergie-page/alergie-page.component";
import {OchoreniaPageComponent} from "./componetnts/ochorenia-page/ochorenia-page.component";
import {LiekyPageComponent} from "./componetnts/lieky-page/lieky-page.component";
import {DoktoriPageComponent} from "./componetnts/doktori-page/doktori-page.component";
import {ZaznamyPageComponent} from "./componetnts/zaznamy-page/zaznamy-page.component";
import {ZaznamDetailComponent} from "./componetnts/zaznam-detail/zaznam-detail.component";
import {ListkyPageComponent} from "./componetnts/listky-page/listky-page.component";
import {PacientGuardGuard} from "./guards/pacient-guard.guard";
import {DoktorWelcomeComponent} from "./componetnts/doktor-welcome/doktor-welcome.component";
import {DoktorProfileComponent} from "./componetnts/doktor-profile/doktor-profile.component";
import {DoktorPacientiComponent} from "./componetnts/doktor-pacienti/doktor-pacienti.component";
import {PacientDoktorProfileComponent} from "./componetnts/pacient-doktor-profile/pacient-doktor-profile.component";
import {RegisterComponent} from "./componetnts/register/register.component";
import {PacientUpdateComponent} from "./componetnts/pacient-update/pacient-update.component";
import {DoktorNewpacientComponent} from "./componetnts/doktor-newpacient/doktor-newpacient.component";
import {DoktorPacientAlergieComponent} from "./componetnts/doktor-pacient-alergie/doktor-pacient-alergie.component";
import {DoktorPacientProfileComponent} from "./componetnts/doktor-pacient-profile/doktor-pacient-profile.component";
import {
  DoktorPacientAlergieChangeComponent
} from "./componetnts/doktor-pacient-alergie-change/doktor-pacient-alergie-change.component";
import {PacientProfileComponent} from "./componetnts/pacient-profil/pacient-profile.component";
import {PacientHesloComponent} from "./componetnts/pacient-heslo/pacient-heslo.component";
import {DoktorPacientLiekyComponent} from "./componetnts/doktor-pacient-lieky/doktor-pacient-lieky.component";
import {DoktorPacientZaznamyComponent} from "./componetnts/doktor-pacient-zaznamy/doktor-pacient-zaznamy.component";
import {
  DoktorPacientOchoreniaComponent
} from "./componetnts/doktor-pacient-ochorenia/doktor-pacient-ochorenia.component";
import {DoktorPacientListkyComponent} from "./componetnts/doktor-pacient-listky/doktor-pacient-listky.component";
import {
  DoktorPacientLiekyChangeComponent
} from "./componetnts/doktor-pacient-lieky-change/doktor-pacient-lieky-change.component";
import {
  DoktorPacientOchoreniaChangeComponent
} from "./componetnts/doktor-pacient-ochorenia-change/doktor-pacient-ochorenia-change.component";
import {
  DoktorPacientListkyChangeComponent
} from "./componetnts/doktor-pacient-listky-change/doktor-pacient-listky-change.component";
import {
  DoktorPacientAlegrgiaShareComponent
} from "./componetnts/doktor-pacient-alegrgia-share/doktor-pacient-alegrgia-share.component";
import {
  DoktorPacientZaznamyDetailComponent
} from "./componetnts/doktor-pacient-zaznamy-detail/doktor-pacient-zaznamy-detail.component";
import {
  DoktorPacientZaznamyPridajComponent
} from "./componetnts/doktor-pacient-zaznamy-pridaj/doktor-pacient-zaznamy-pridaj.component";
import {
  DoktorPacientZaznamyChangeComponent
} from "./componetnts/doktor-pacient-zaznamy-change/doktor-pacient-zaznamy-change.component";
import {DoktorZdielaneAlergieComponent} from "./componetnts/doktor-zdielane-alergie/doktor-zdielane-alergie.component";
import {
  DoktorZazdielaneAlergieComponent
} from "./componetnts/doktor-zazdielane-alergie/doktor-zazdielane-alergie.component";
import {DoktorZazdielaneLiekyComponent} from "./componetnts/doktor-zazdielane-lieky/doktor-zazdielane-lieky.component";
import {DoktorZdielaneLiekyComponent} from "./componetnts/doktor-zdielane-lieky/doktor-zdielane-lieky.component";
import {
  DoktorPacientLiekyShareComponent
} from "./componetnts/doktor-pacient-lieky-share/doktor-pacient-lieky-share.component";
import {
  DoktorZazdielanieOchoreniaComponent
} from "./componetnts/doktor-zazdielanie-ochorenia/doktor-zazdielanie-ochorenia.component";
import {
  DoktorZdielanieOchoreniaComponent
} from "./componetnts/doktor-zdielanie-ochorenia/doktor-zdielanie-ochorenia.component";
import {
  DoktorPacientOchoreniaShareComponent
} from "./componetnts/doktor-pacient-ochorenia-share/doktor-pacient-ochorenia-share.component";
import {
  DoktorZazdielanieZaznamyComponent
} from "./componetnts/doktor-zazdielanie-zaznamy/doktor-zazdielanie-zaznamy.component";
import {DoktorZdielaneZaznamyComponent} from "./componetnts/doktor-zdielane-zaznamy/doktor-zdielane-zaznamy.component";
import {
  DoktorZdielaneZaznamyDetailComponent
} from "./componetnts/doktor-zdielane-zaznamy-detail/doktor-zdielane-zaznamy-detail.component";



const routes: Routes = [
  { path:"", component: WelcomePageComponent},
  { path: "pacient/:rodnecislo", component: PacientProfileComponent, canActivate: [PacientGuardGuard]},
  { path: "alergie/:rodnecislo", component: AlergiePageComponent, canActivate: [PacientGuardGuard]},
  { path: "ochorenia/:rodnecislo", component: OchoreniaPageComponent, canActivate: [PacientGuardGuard]},
  { path: "lieky/:rodnecislo", component: LiekyPageComponent, canActivate: [PacientGuardGuard]},
  { path: "doktori/:rodnecislo", component: DoktoriPageComponent, canActivate: [PacientGuardGuard]},
  { path: "doktori/:rodnecislo/:osobnecislo", component: PacientDoktorProfileComponent},
  { path: "zaznamy/:rodnecislo", component: ZaznamyPageComponent, canActivate: [PacientGuardGuard]},
  { path: "zaznamy/:rodnecislo/:idzaznam", component:ZaznamDetailComponent, canActivate: [PacientGuardGuard] },
  { path: "odporucacieLisky/:rodnecislo", component: ListkyPageComponent, canActivate: [PacientGuardGuard]},
  { path: "udaje/:rodnecislo", component: PacientUpdateComponent, canActivate: [PacientGuardGuard]},
  { path: "heslo/:rodnecislo", component: PacientHesloComponent, canActivate: [PacientGuardGuard]},
  { path: "doktor", component: DoktorWelcomeComponent},
  { path: "doktor/:osobnecislo", component:DoktorProfileComponent},
  { path: "doktor/:osobnecislo/pacienti", component:DoktorPacientiComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/zaznamy/:idzaznam", component:DoktorPacientZaznamyDetailComponent},
  { path: "doktor/:osobnecislo/pridajPacienta", component: DoktorNewpacientComponent},
  { path: "doktor/:osobnecislo/:rodnecislo", component: DoktorPacientProfileComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/alergie", component: DoktorPacientAlergieComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/lieky", component: DoktorPacientLiekyComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/zaznamy", component: DoktorPacientZaznamyComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/ochorenia", component: DoktorPacientOchoreniaComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/odporucenia", component: DoktorPacientListkyComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/alergieZmena", component: DoktorPacientAlergieChangeComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/liekyZmena", component: DoktorPacientLiekyChangeComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/listkyZmena", component: DoktorPacientListkyChangeComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/ochoreniaZmena", component: DoktorPacientOchoreniaChangeComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/zaznamPridaj/:idzaznam", component: DoktorPacientZaznamyPridajComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/zaznamZmena/:idzaznam", component: DoktorPacientZaznamyChangeComponent},
  { path: "zdielatAlergiu/:osobnecislo/:rodnecislo", component: DoktorPacientAlegrgiaShareComponent},
  { path: "zdielatLieky/:osobnecislo/:rodnecislo", component: DoktorPacientLiekyShareComponent},
  { path: "zdielatOchorenia/:osobnecislo/:rodnecislo", component: DoktorPacientOchoreniaShareComponent},
  { path: "zdielaneMnou/:osobnecislo/alergie", component: DoktorZazdielaneAlergieComponent},
  { path: "zdielaneMne/:osobnecislo/alergie", component:DoktorZdielaneAlergieComponent},
  { path: "zdielaneMnou/:osobnecislo/lieky", component:DoktorZazdielaneLiekyComponent},
  { path: "zdielaneMne/:osobnecislo/lieky", component:DoktorZdielaneLiekyComponent},
  { path: "zdielaneMnou/:osobnecislo/ochorenia", component:DoktorZazdielanieOchoreniaComponent},
  { path: "zdielaneMne/:osobnecislo/ochorenia", component:DoktorZdielanieOchoreniaComponent},
  { path: "zdielaneMnou/:osobnecislo/zaznamy", component:DoktorZazdielanieZaznamyComponent},
  { path: "zdielaneMne/:osobnecislo/zaznamy", component:DoktorZdielaneZaznamyComponent},
  { path: "zazdielanyZaznam/:idzaznam/:osobnecislo", component:DoktorZdielaneZaznamyDetailComponent},
  { path: "registracia", component:RegisterComponent},
  { path: "**", component: WelcomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
  { path: "doktor/:osobnecislo/:rodnecislo/alergiaShare/:kodalergie", component: DoktorPacientAlegrgiaShareComponent},
  { path: "registracia", component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

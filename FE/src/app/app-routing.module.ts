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



const routes: Routes = [
  { path:"", component: WelcomePageComponent },
  { path: "pacient/:rodnecislo", component: AlergiePageComponent, canActivate: [PacientGuardGuard]},
  { path: "ochorenia/:rodnecislo", component: OchoreniaPageComponent, canActivate: [PacientGuardGuard]},
  { path: "lieky/:rodnecislo", component: LiekyPageComponent, canActivate: [PacientGuardGuard]},
  { path: "doktori/:rodnecislo", component: DoktoriPageComponent, canActivate: [PacientGuardGuard]},
  { path: "doktori/:rodnecislo/:osobnecislo", component: PacientDoktorProfileComponent},
  { path: "zaznamy/:rodnecislo", component: ZaznamyPageComponent, canActivate: [PacientGuardGuard]},
  { path: "zaznamy/:rodnecislo/:idzaznam", component:ZaznamDetailComponent, canActivate: [PacientGuardGuard] },
  { path: "odporucacieLisky/:rodnecislo", component: ListkyPageComponent, canActivate: [PacientGuardGuard]},
  { path: "udaje/:rodnecislo", component: PacientUpdateComponent, canActivate: [PacientGuardGuard]},
  { path: "doktor", component: DoktorWelcomeComponent},
  { path: "doktor/:osobnecislo", component:DoktorProfileComponent},
  { path: "doktor/:osobnecislo/pacienti", component:DoktorPacientiComponent},
  { path: "doktor/:osobnecislo/pridajPacienta", component: DoktorNewpacientComponent},
  { path: "doktor/:osobnecislo/:rodnecislo", component: DoktorPacientProfileComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/alergie", component: DoktorPacientAlergieComponent},
  { path: "doktor/:osobnecislo/:rodnecislo/alergieZmena", component: DoktorPacientAlergieChangeComponent},
  { path: "registracia", component:RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

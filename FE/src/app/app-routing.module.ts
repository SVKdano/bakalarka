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
import {DoktorBoardComponent} from "./componetnts/doktor-board/doktor-board.component";
import {
  DoktorPacientZaznamyShareComponent
} from "./componetnts/doktor-pacient-zaznamy-share/doktor-pacient-zaznamy-share.component";
import {
  DoktorZazdielanieZaznamyDetailComponent
} from "./componetnts/doktor-zazdielanie-zaznamy-detail/doktor-zazdielanie-zaznamy-detail.component";
import {NemocnicaWelcomeComponent} from "./componetnts/nemocnica-welcome/nemocnica-welcome.component";
import {NemocnicaProfileComponent} from "./componetnts/nemocnica-profile/nemocnica-profile.component";
import {AdminProfileComponent} from "./componetnts/admin-profile/admin-profile.component";
import {AdminGuardGuard} from "./guards/admin-guard.guard";
import {NemocnicaOddeleniaComponent} from "./componetnts/nemocnica-oddelenia/nemocnica-oddelenia.component";
import {NemocnicaDoktoriComponent} from "./componetnts/nemocnica-doktori/nemocnica-doktori.component";
import {PacientResetHeslaComponent} from "./componetnts/pacient-reset-hesla/pacient-reset-hesla.component";
import {
  NemocnicaNoveOddelenieComponent
} from "./componetnts/nemocnica-nove-oddelenie/nemocnica-nove-oddelenie.component";
import {ZmenaHeslaDoktorComponent} from "./componetnts/zmena-hesla-doktor/zmena-hesla-doktor.component";
import {ZmenaHeslaNemocnicaComponent} from "./componetnts/zmena-hesla-nemocnica/zmena-hesla-nemocnica.component";
import {
  NemocnicaDoktorOddelenieComponent
} from "./componetnts/nemocnica-doktor-oddelenie/nemocnica-doktor-oddelenie.component";
import {
  NemocnicaDoktorOddelenieZmenaComponent
} from "./componetnts/nemocnica-doktor-oddelenie-zmena/nemocnica-doktor-oddelenie-zmena.component";
import {NemocnicaNovyDoktorComponent} from "./componetnts/nemocnica-novy-doktor/nemocnica-novy-doktor.component";
import {DoktorResetHeslaComponent} from "./componetnts/doktor-reset-hesla/doktor-reset-hesla.component";
import {NemocnicaResetHeslaComponent} from "./componetnts/nemocnica-reset-hesla/nemocnica-reset-hesla.component";
import {AdminNovaNemocnicaComponent} from "./componetnts/admin-nova-nemocnica/admin-nova-nemocnica.component";
import {DoktorGuardGuard} from "./guards/doktor-guard.guard";



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
  { path: "doktor/:osobnecislo", component:DoktorProfileComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/pacienti", component:DoktorPacientiComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/zaznamy/:idzaznam", component:DoktorPacientZaznamyDetailComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/pridajPacienta", component: DoktorNewpacientComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo", component: DoktorPacientProfileComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/alergie", component: DoktorPacientAlergieComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/lieky", component: DoktorPacientLiekyComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/zaznamy", component: DoktorPacientZaznamyComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/ochorenia", component: DoktorPacientOchoreniaComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/odporucenia", component: DoktorPacientListkyComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/alergieZmena", component: DoktorPacientAlergieChangeComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/liekyZmena", component: DoktorPacientLiekyChangeComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/listkyZmena", component: DoktorPacientListkyChangeComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/ochoreniaZmena", component: DoktorPacientOchoreniaChangeComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/zaznamPridaj/:idzaznam", component: DoktorPacientZaznamyPridajComponent, canActivate: [DoktorGuardGuard]},
  { path: "doktor/:osobnecislo/:rodnecislo/zaznamZmena/:idzaznam", component: DoktorPacientZaznamyChangeComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielatAlergiu/:osobnecislo/:rodnecislo", component: DoktorPacientAlegrgiaShareComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielatLieky/:osobnecislo/:rodnecislo", component: DoktorPacientLiekyShareComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielatOchorenia/:osobnecislo/:rodnecislo", component: DoktorPacientOchoreniaShareComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielaneMnou/:osobnecislo/alergie", component: DoktorZazdielaneAlergieComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielatOchorenia/:osobnecislo/:rodnecislo/:idzaznam", component:DoktorPacientZaznamyShareComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielaneMne/:osobnecislo/alergie", component:DoktorZdielaneAlergieComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielaneMnou/:osobnecislo/lieky", component:DoktorZazdielaneLiekyComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielaneMne/:osobnecislo/lieky", component:DoktorZdielaneLiekyComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielaneMnou/:osobnecislo/ochorenia", component:DoktorZazdielanieOchoreniaComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielaneMne/:osobnecislo/ochorenia", component:DoktorZdielanieOchoreniaComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielaneMnou/:osobnecislo/zaznamy", component:DoktorZazdielanieZaznamyComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielaneMne/:osobnecislo/zaznamy", component:DoktorZdielaneZaznamyComponent, canActivate: [DoktorGuardGuard]},
  { path: "zdielanyZaznam/:idzaznam/:osobnecislo", component:DoktorZdielaneZaznamyDetailComponent, canActivate: [DoktorGuardGuard]},
  { path: "zazdielanyZaznam/:idzaznam/:osobnecislo", component:DoktorZazdielanieZaznamyDetailComponent, canActivate: [DoktorGuardGuard]},
  { path: "vytazenie/:osobnecislo", component:DoktorBoardComponent, canActivate: [DoktorGuardGuard]},
  { path: "zmenaHesla/:osobnecislo", component:ZmenaHeslaDoktorComponent, canActivate: [DoktorGuardGuard]},
  { path: "nemocnica", component: NemocnicaWelcomeComponent},
  { path: "nemocnica/:idnemocnice", component:NemocnicaProfileComponent},
  { path: "nemocnica/:idnemocnice/oddelenia", component:NemocnicaOddeleniaComponent},
  { path: "nemocnica/:idnemocnice/doktori", component:NemocnicaDoktoriComponent},
  { path: "nemocnica/:idnemocnice/pridajOddelenie", component:NemocnicaNoveOddelenieComponent},
  { path: "nemocnica/:idnemocnice/zmenaHesla", component: ZmenaHeslaNemocnicaComponent},
  { path: "nemocnica/:idnemocnice/doktorOddelenie", component: NemocnicaDoktorOddelenieComponent},
  { path: "nemocnica/:idnemocnice/zmenaOddelenia/:osobnecislo", component:NemocnicaDoktorOddelenieZmenaComponent},
  { path: "nemocnica/:idnemocnice/novyDoktor", component: NemocnicaNovyDoktorComponent},
  { path: "admin", component:AdminProfileComponent, canActivate:[AdminGuardGuard]},
  { path: "admin/novaNemocnica", component: AdminNovaNemocnicaComponent, canActivate:[AdminGuardGuard]},
  { path: "resetHeslaPacient", component: PacientResetHeslaComponent},
  { path: "resetHeslaDoktor", component: DoktorResetHeslaComponent},
  { path: "resetHeslaNemocnica", component: NemocnicaResetHeslaComponent},
  { path: "registracia", component:RegisterComponent},
  { path: "**", component: WelcomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

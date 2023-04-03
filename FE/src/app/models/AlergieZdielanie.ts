import {Doktor} from "./Doktor";
import {PacientAlergie} from "./PacientAlergie";

export class AlergieZdielanie {
  zdielajuci:string = "";
  cielovy:string = "";
  rodnecislo:string = "";
  kodalergie:string = "";
  datumdo:Date = new Date();
  cielovyNavigation?:Doktor;
  zdielajuciNavigation?:Doktor;
  pacientAlergie?:PacientAlergie;
}

import {Alergie} from "./Alergie";
import {Pacient} from "./Pacient";

export class PacientAlergie {
  rodnecislo:string = "";
  kodalergie:string = "";
  informacie:string = "";
  kodalergieNavigation?: Alergie;
  rodnecisloNavigation?: Pacient;
}

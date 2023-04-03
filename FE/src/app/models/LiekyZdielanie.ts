import {Doktor} from "./Doktor";
import {PacientLieky} from "./PacientLieky";

export class LiekyZdielanie {
  zdielajuci:string = "";
  cielovy:string = "";
  registracnecislo:string = "";
  rodnecislo:string = "";
  datumod:string = "";
  datumdoZdielanie:string = "";
  cielovyNavigation?:Doktor;
  pacientovelieky:PacientLieky = new PacientLieky();
  zdielajuciNavigation?:Doktor;
}

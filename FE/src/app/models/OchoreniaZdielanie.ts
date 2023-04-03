import {Doktor} from "./Doktor";
import {PacientOchorenie} from "./PacientOchorenie";

export class OchoreniaZdielanie {
  zdielajuci:string = "";
  cielovy:string = "";
  rodnecislo:string = "";
  kodochorenia:string = "";
  datumod:string = "";
  datumdoZdielanie:string = "";
  cielovyNavigation?:Doktor;
  zdielajuciNavigation?:Doktor;
  pacientoveochorenium:PacientOchorenie = new PacientOchorenie();
}

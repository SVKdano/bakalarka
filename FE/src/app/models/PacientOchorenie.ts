import {Ochorenie} from "./Ochorenie";
import {Pacient} from "./Pacient";

export class PacientOchorenie {
  datumod:Date = new Date();
  datumdo:Date = new Date();
  rodnecislo:string = "";
  kodochorenia:string = "";
  dalsiaspecifikacia:string = "";
  kodochoreniaNavigation!: Ochorenie;
  rodnecisloNavigation?:Pacient;
}

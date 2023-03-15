import {Doktor} from "./Doktor";
import {Pacient} from "./Pacient";

export class DoktorPacient {
  rodnecislo:string = "";
  osobnecislo:string = "";
  datumod!:Date;
  osobnecisloNavigation?:Doktor;
  rodnecisloNavigation?:Pacient;
}

import {Lieky} from "./Lieky";
import {Pacient} from "./Pacient";

export class PacientLieky {
  rodnecislo:string = "";
  datumod:Date = new Date();
  datumdo?:Date;
  davkovanie: string = "";
  registracnecislo:string = "";
  registracnecisloNavigation!: Lieky;
  rodnecisloNavigation?:Pacient;
}

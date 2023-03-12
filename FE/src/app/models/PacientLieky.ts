import {Lieky} from "./Lieky";

export class PacientLieky {
  rodnecislo:string = "";
  datumod:Date = new Date();
  datumdo?:Date;
  davkovanie: string = "";
  registracnecisloNavigation!: Lieky;
}

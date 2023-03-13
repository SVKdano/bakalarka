import {Oddelenie} from "./Oddelenie";
import {Doktor} from "./Doktor";
import {Pacient} from "./Pacient";

export class OdporucaciListok {
  datumodporucenia!: Date;
  kododdelenia: string = "";
  idnemocnice: string = "";
  osobnecislo: string = "";
  rodnecislo: string = "";
  oddelenie?: Oddelenie;
  osobnecisloNavigation?: Doktor;
  rodnecisloNavigation?: Pacient;
}

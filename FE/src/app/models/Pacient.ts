import {Poistovna} from "./Poistovna";
import {Mesto} from "./Mesto";

export class Pacient {
  rodneCislo: string = "";
  meno: string = "";
  priezvisko: string = "";
  ulica: string = "";
  idpoistovne: number = 0;
  poistenyvpoistovniod?: Date;
  umrtie?: Date;
  heslo: string = "";
  rola: string = "";
  idpoistovneNavigation?: Poistovna;
  idmestaNavigation?: Mesto;
}

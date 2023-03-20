import {Poistovna} from "./Poistovna";
import {Mesto} from "./Mesto";

export class Pacient {
  rodnecislo: string = "";
  meno: string = "";
  priezvisko: string = "";
  ulica: string = "";
  idpoistovne: number = 0;
  idmesta: number = 0;
  poistenyvpoistovniod?: Date;
  umrtie?: Date;
  email: string = "";
  heslo: string = "";
  rola: string = "";
  idpoistovneNavigation?: Poistovna[];
  idmestaNavigation?: Mesto;
}

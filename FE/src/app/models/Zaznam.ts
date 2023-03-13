import {Time} from "@angular/common";
import {Doktor} from "./Doktor";

export class Zaznam {
  idzaznam:number = 0;
  rodnecislo:string = "";
  osobnecislo:string = "";
  dovodnavstevy:string = "";
  datum!:Date;
  cas!:Time;
  vysledokvysetrenia:string = "";
  doplnujuceinformacie:string = "";
  zaver:string = "";
  osobnecisloNavigation?:Doktor;
}

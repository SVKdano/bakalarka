import {Oddelenie} from "./Oddelenie";
import {DoktorSpecializacia} from "./DoktorSpecializacia";

export class Doktor {
  osobnecislo:string = "";
  meno:string = "";
  priezvisko:string = "";
  kododdelenia:string = "";
  idnemocnice:string = "";
  oddelenie?:Oddelenie;
  specializaciaDoktors?:DoktorSpecializacia[];
}

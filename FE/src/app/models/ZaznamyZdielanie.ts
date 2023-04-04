import {Zaznam} from "./Zaznam";
import {Doktor} from "./Doktor";

export class ZaznamyZdielanie {
  zdielajuci:string = "";
  cielovy:string = "";
  idzaznamu:number = 0;
  datumdoZdielanie:string = "";
  idzaznamuNavigation:Zaznam = new Zaznam();
  zdielajuciNavigation?:Doktor;
  cielovyNavigation?:Doktor;
}

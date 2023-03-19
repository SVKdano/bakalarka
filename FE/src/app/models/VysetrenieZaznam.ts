import {Zaznam} from "./Zaznam";
import {Vysetrenie} from "./Vysetrenie";

export class VysetrenieZaznam {
  kod: string = "";
  idzaznam: number = 0;
  datum:Date = new Date();
  vysledokvysetrenia: string = "";
  idzaznamNavigation!: Zaznam;
  kodNavigation!: Vysetrenie;
}

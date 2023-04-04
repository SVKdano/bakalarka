import { Component } from '@angular/core';
import {ZaznamyZdielanie} from "../../models/ZaznamyZdielanie";
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-zdielane-zaznamy',
  templateUrl: './doktor-zdielane-zaznamy.component.html',
  styleUrls: ['./doktor-zdielane-zaznamy.component.css']
})
export class DoktorZdielaneZaznamyComponent {
  osobneCislo:string = "";

  ochorenia:ZaznamyZdielanie[] = [];
  filtered:ZaznamyZdielanie[] = [];

  menoFilter: string = "";
  priezviskoFilter: string = "";
  rodnecisloFilter: string = "";

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;
    this.doctorService.getMneZazdielaneZaznamy(this.osobneCislo).subscribe(
      (result:ZaznamyZdielanie[]) => {
        this.ochorenia = result;
        this.filtered = result;
      }
    );
  }

  filter() {
    this.filtered = [];

    this.ochorenia.forEach(a => {
      if (a.idzaznamuNavigation && a.idzaznamuNavigation.rodnecislo.includes(this.rodnecisloFilter))
      {
        if (a.idzaznamuNavigation && a.idzaznamuNavigation.rodnecisloNavigation
          && a.idzaznamuNavigation.rodnecisloNavigation.meno.toLowerCase().includes(this.menoFilter.toLowerCase()))
        {
          if (a.idzaznamuNavigation && a.idzaznamuNavigation.rodnecisloNavigation
            && a.idzaznamuNavigation.rodnecisloNavigation.priezvisko.toLowerCase().includes(this.priezviskoFilter.toLowerCase()))
          {
            this.filtered.push(a);
          }
        }
      }
    })
  }
  reset() {
    this.filtered = this.ochorenia;

    this.rodnecisloFilter = "";
    this.menoFilter = "";
    this.priezviskoFilter = "";
  }
}

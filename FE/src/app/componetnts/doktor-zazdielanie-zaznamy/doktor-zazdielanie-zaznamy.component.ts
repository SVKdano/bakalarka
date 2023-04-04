import { Component } from '@angular/core';
import {OchoreniaZdielanie} from "../../models/OchoreniaZdielanie";
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";
import {ZaznamyZdielanie} from "../../models/ZaznamyZdielanie";

@Component({
  selector: 'app-doktor-zazdielanie-zaznamy',
  templateUrl: './doktor-zazdielanie-zaznamy.component.html',
  styleUrls: ['./doktor-zazdielanie-zaznamy.component.css']
})
export class DoktorZazdielanieZaznamyComponent {
  osobneCislo:string = "";

  ochorenia:ZaznamyZdielanie[] = [];
  filtered:ZaznamyZdielanie[] = [];

  menoFilter: string = "";
  priezviskoFilter: string = "";
  rodnecisloFilter: string = "";

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;
    this.doctorService.getMnouZazdielaneZaznamy(this.osobneCislo).subscribe(
      (result:ZaznamyZdielanie[]) => {
        this.ochorenia = result;
        this.filtered = result;
        console.log(this.filtered);
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

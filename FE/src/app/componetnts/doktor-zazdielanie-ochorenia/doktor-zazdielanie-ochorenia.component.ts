import {Component, OnInit} from '@angular/core';
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";
import {LiekyZdielanie} from "../../models/LiekyZdielanie";
import {OchoreniaZdielanie} from "../../models/OchoreniaZdielanie";

@Component({
  selector: 'app-doktor-zazdielanie-ochorenia',
  templateUrl: './doktor-zazdielanie-ochorenia.component.html',
  styleUrls: ['./doktor-zazdielanie-ochorenia.component.css']
})
export class DoktorZazdielanieOchoreniaComponent implements OnInit {
  osobneCislo:string = "";

  ochorenia:OchoreniaZdielanie[] = [];
  filtered:OchoreniaZdielanie[] = [];

  menoFilter: string = "";
  priezviskoFilter: string = "";
  rodnecisloFilter: string = "";

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;
    this.doctorService.getMnouZazdielaneOchorenia(this.osobneCislo).subscribe(
      (result:OchoreniaZdielanie[]) => {
        this.ochorenia = result;
        this.filtered = result;
      }
    );
  }

  filter() {
    this.filtered = [];

    this.ochorenia.forEach(a => {
      if (a.rodnecislo.toLowerCase().includes(this.rodnecisloFilter.toLowerCase()))
      {
        if (a.pacientoveochorenium && a.pacientoveochorenium.rodnecisloNavigation
          && a.pacientoveochorenium.rodnecisloNavigation.meno.toLowerCase().includes(this.menoFilter.toLowerCase()))
        {
          if (a.pacientoveochorenium && a.pacientoveochorenium.rodnecisloNavigation
            && a.pacientoveochorenium.rodnecisloNavigation.priezvisko.toLowerCase().includes(this.priezviskoFilter.toLowerCase()))
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

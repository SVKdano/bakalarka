import {Component, OnInit} from '@angular/core';
import {OchoreniaZdielanie} from "../../models/OchoreniaZdielanie";
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-zdielanie-ochorenia',
  templateUrl: './doktor-zdielanie-ochorenia.component.html',
  styleUrls: ['./doktor-zdielanie-ochorenia.component.css']
})
export class DoktorZdielanieOchoreniaComponent implements OnInit {
  osobneCislo:string = "";

  ochorenia:OchoreniaZdielanie[] = [];
  filtered:OchoreniaZdielanie[] = [];

  menoFilter: string = "";
  priezviskoFilter: string = "";
  rodnecisloFilter: string = "";

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;
    this.doctorService.getMneZazdielaneOchorenia(this.osobneCislo).subscribe(
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

import {Component, OnInit} from '@angular/core';
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";
import {LiekyZdielanie} from "../../models/LiekyZdielanie";

@Component({
  selector: 'app-doktor-zazdielane-lieky',
  templateUrl: './doktor-zazdielane-lieky.component.html',
  styleUrls: ['./doktor-zazdielane-lieky.component.css']
})
export class DoktorZazdielaneLiekyComponent implements OnInit {

  lieky:LiekyZdielanie[] = [];
  filtered:LiekyZdielanie[] = [];

  osobneCislo:string = "";

  menoFilter: string = "";
  priezviskoFilter: string = "";
  rodnecisloFilter: string = "";

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;
    this.doctorService.getMnouZazdielaneLieky(this.osobneCislo).subscribe(
      (result:LiekyZdielanie[]) => {
        this.lieky = result;
        this.filtered = result;
      }
    )
  }

  filter() {
    this.filtered = [];

    this.lieky.forEach(a => {
      if (a.rodnecislo.toLowerCase().includes(this.rodnecisloFilter.toLowerCase()))
      {
        if (a.pacientovelieky && a.pacientovelieky.rodnecisloNavigation
          && a.pacientovelieky.rodnecisloNavigation.meno.toLowerCase().includes(this.menoFilter.toLowerCase()))
        {
          if (a.pacientovelieky && a.pacientovelieky.rodnecisloNavigation
            && a.pacientovelieky.rodnecisloNavigation.priezvisko.toLowerCase().includes(this.priezviskoFilter.toLowerCase()))
          {
            this.filtered.push(a);
          }
        }
      }
    })
  }
  reset() {
    this.filtered = this.lieky;

    this.rodnecisloFilter = "";
    this.menoFilter = "";
    this.priezviskoFilter = "";
  }
}

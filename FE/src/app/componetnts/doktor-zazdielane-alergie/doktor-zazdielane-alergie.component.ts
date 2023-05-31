import {Component, OnInit} from '@angular/core';
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";
import {AlergieZdielanie} from "../../models/AlergieZdielanie";

@Component({
  selector: 'app-doktor-zazdielane-alergie',
  templateUrl: './doktor-zazdielane-alergie.component.html',
  styleUrls: ['./doktor-zazdielane-alergie.component.css']
})
export class DoktorZazdielaneAlergieComponent implements OnInit {
  osobneCislo:string = "";

  zazdielane:AlergieZdielanie[] = [];
  filtered:AlergieZdielanie[] = [];

  menoFilter: string = "";
  priezviskoFilter: string = "";
  rodnecisloFilter: string = "";

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;

    this.doctorService.getMnouZazdielane(this.osobneCislo).subscribe(
      (result:AlergieZdielanie[]) =>
      {
        this.zazdielane = result;
        this.filtered = result;
      }
    );
  }

  filter() {
    this.filtered = [];

    this.zazdielane.forEach(a => {
      if (a.rodnecislo.toLowerCase().includes(this.rodnecisloFilter.toLowerCase()))
      {
        if (a.pacientAlergie && a.pacientAlergie.rodnecisloNavigation
          && a.pacientAlergie.rodnecisloNavigation.meno.toLowerCase().includes(this.menoFilter.toLowerCase()))
        {
          if (a.pacientAlergie && a.pacientAlergie.rodnecisloNavigation
            && a.pacientAlergie.rodnecisloNavigation.priezvisko.toLowerCase().includes(this.priezviskoFilter.toLowerCase()))
          {
            this.filtered.push(a);
          }
        }
      }
    })
  }


  reset() {
    this.filtered = this.zazdielane;

    this.rodnecisloFilter = "";
    this.menoFilter = "";
    this.priezviskoFilter = "";
  }

  printPage() {
    window.print();
  }
}

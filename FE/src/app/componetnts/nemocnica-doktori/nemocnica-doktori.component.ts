import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NemocnicaService} from "../../services/nemocnica.service";
import {Oddelenie} from "../../models/Oddelenie";
import {Doktor} from "../../models/Doktor";

@Component({
  selector: 'app-nemocnica-doktori',
  templateUrl: './nemocnica-doktori.component.html',
  styleUrls: ['./nemocnica-doktori.component.css']
})
export class NemocnicaDoktoriComponent implements OnInit {

  oddelenia: Oddelenie[] = [];
  doktori: Doktor[] = [];
  filteredDoktori: Doktor[] = [];

  menoFilter: string = "";
  priezviskoFilter: string = "";
  kodOddelenia:string = "";

  constructor(private route:ActivatedRoute, private nemocnicaService:NemocnicaService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idnemocnice');
    this.nemocnicaService.getDoktoriVNemocnici(id!).subscribe(
      (result:Doktor[]) =>
      {
        this.doktori = result;
        this.filteredDoktori = result;
      }
    );

    this.nemocnicaService.getOddeleniaNemocnice(id!).subscribe(
      (result:Oddelenie[]) =>
      {
        this.oddelenia = result;
      }
    );
  }

  setKodOddelenia(oddelenie:Oddelenie) {
    this.kodOddelenia = oddelenie.kododdelenia;
  }

  filterOddelenie() {
    this.filteredDoktori = [];

    this.doktori.forEach( a => {
      if (a.kododdelenia.includes(this.kodOddelenia)) {
        this.filteredDoktori.push(a);
      }
    })
  }

  filter() {
    var pom:Doktor[] = [];

    this.filteredDoktori.forEach( a => {
      if (a.meno.toLowerCase().includes(this.menoFilter.toLowerCase()))
      {
        if (a.priezvisko.toLowerCase().includes(this.priezviskoFilter.toLowerCase()))
        {
          pom.push(a);
        }
      }
    })

    this.filteredDoktori = pom;
  }

  reset() {
    this.kodOddelenia = "";
    this.menoFilter = "";
    this.priezviskoFilter = "";

    this.filteredDoktori = this.doktori;
  }
}

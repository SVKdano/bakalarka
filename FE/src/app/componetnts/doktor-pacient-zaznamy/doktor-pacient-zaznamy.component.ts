import { Component } from '@angular/core';
import {Zaznam} from "../../models/Zaznam";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-pacient-zaznamy',
  templateUrl: './doktor-pacient-zaznamy.component.html',
  styleUrls: ['./doktor-pacient-zaznamy.component.css']
})
export class DoktorPacientZaznamyComponent {
  zaznamy:Zaznam[] = [];
  filteredZaznamy: Zaznam[] = [];

  start:Date = new Date();
  end:Date = new Date();

  rodneCislo:string = "";
  datum:string = "";

  constructor(private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.rodneCislo = this.route.snapshot.paramMap.get('rodnecislo')!;
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientZaznamy(id!).subscribe(
      (result:Zaznam[]) => {
        this.zaznamy = result;
        this.filteredZaznamy = result;
      }
    );


    if (this.rodneCislo.length == 10 && Number(this.rodneCislo.substring(0,2)) >= 54 ) {
      this.datum = "19" + this.rodneCislo.substring(0,2) + "-" + Number(this.rodneCislo.substring(2,4)) % 50 + "-" + this.rodneCislo.substring(4,6);
    } else if (this.rodneCislo.length == 9) {
      this.datum = "19" + this.rodneCislo.substring(0,2) + "-" + Number(this.rodneCislo.substring(2,4)) % 50 + "-" + this.rodneCislo.substring(4,6);
    } else {
      this.datum = "20" + this.rodneCislo.substring(0,2) + "-" + Number(this.rodneCislo.substring(2,4)) % 50 + "-" + this.rodneCislo.substring(4,6);
    }

    this.start = new Date(this.datum);
  }

  filter() {
    this.filteredZaznamy = [];

    this.zaznamy.forEach(a => {
      if ((new Date(a.datum) >= this.start) && (new Date(a.datum) <= this.end))
      {
        this.filteredZaznamy.push(a);
      }
    });

    console.log(this.filteredZaznamy);
  }

  reset() {
    this.start = new Date(this.datum);
    this.end = new Date();

    this.filteredZaznamy = this.zaznamy;
  }
}

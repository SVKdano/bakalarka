import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {OdporucaciListok} from "../../models/OdporucaciListok";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-listky-page',
  templateUrl: './listky-page.component.html',
  styleUrls: ['./listky-page.component.css']
})
export class ListkyPageComponent implements OnInit {
  listky:OdporucaciListok[] = [];
  filteredListky: OdporucaciListok[] = [];

  start:Date = new Date();
  end:Date = new Date();

  rodneCislo:string = "";
  datum:string = "";

  constructor(private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.rodneCislo = this.route.snapshot.paramMap.get('rodnecislo')!;
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientListky(id!).subscribe(
      (result:OdporucaciListok[]) => {
        this.listky = result;
        this.filteredListky = result;
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
    this.filteredListky = [];

    this.listky.forEach(a => {
      if ((new Date(a.datumodporucenia) >= this.start) && (new Date(a.datumodporucenia) <= this.end))
      {
        this.filteredListky.push(a);
      }
    });

    console.log(this.filteredListky);
  }

  reset() {
    this.start = new Date(this.datum);
    this.end = new Date();

    this.filteredListky = this.listky;
  }
}

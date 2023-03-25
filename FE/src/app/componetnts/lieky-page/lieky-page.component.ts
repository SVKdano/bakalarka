import {Component, OnInit} from '@angular/core';
import {PacientLieky} from "../../models/PacientLieky";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lieky-page',
  templateUrl: './lieky-page.component.html',
  styleUrls: ['./lieky-page.component.css']
})
export class LiekyPageComponent implements OnInit {

  lieky:PacientLieky[] = [];
  filteredLiekyEnd:PacientLieky[] = [];
  filteredLiekyNoEnd:PacientLieky[] = [];

  startDateEnd: Date = new Date();
  endDateEnd: Date = new Date();

  startDateNoEnd: Date = new Date();
  endDateNoEnd:Date = new Date();

  rodneCislo: string = "";
  datum: string = "";

  constructor(private pacientService:PacientService, private route:ActivatedRoute ) {}

  ngOnInit() {
    this.rodneCislo = this.route.snapshot.paramMap.get('rodnecislo')!;
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientLieky(id!).subscribe(
      (result:PacientLieky[]) => {
        (this.lieky = result);
        this.filteredLiekyEnd = result;
        this.filteredLiekyNoEnd = result;
      }
    );


    if (this.rodneCislo.length == 10 && Number(this.rodneCislo.substring(0,2)) >= 54 ) {
      this.datum = "19" + this.rodneCislo.substring(0,2) + "-" + Number(this.rodneCislo.substring(2,4)) % 50 + "-" + this.rodneCislo.substring(4,6);
    } else if (this.rodneCislo.length == 9) {
      this.datum = "19" + this.rodneCislo.substring(0,2) + "-" + Number(this.rodneCislo.substring(2,4)) % 50 + "-" + this.rodneCislo.substring(4,6);
    } else {
      this.datum = "20" + this.rodneCislo.substring(0,2) + "-" + Number(this.rodneCislo.substring(2,4)) % 50 + "-" + this.rodneCislo.substring(4,6);
    }

    this.startDateEnd = new Date(this.datum);
    this.startDateNoEnd = new Date(this.datum);
  }

  filterUkoncene() {
    this.filteredLiekyEnd = [];
    this.lieky.forEach(a => {
      if (new Date(a.datumod) >= this.startDateEnd  && a.datumdo && new Date(a.datumdo) <= this.endDateEnd)
      {
        this.filteredLiekyEnd.push(a);
      }
    });

    console.log(this.filteredLiekyEnd);

  }

  filterNeukoncene() {
    this.filteredLiekyNoEnd = [];
    this.lieky.forEach(a => {
      if (new Date(a.datumod) >= this.startDateNoEnd  && !a.datumdo)
      {
        this.filteredLiekyNoEnd.push(a);
      }
    });

    console.log(this.filteredLiekyNoEnd);

  }

  resetUkoncene() {

    this.startDateEnd = new Date(this.datum);
    this.endDateEnd = new Date();

    this.filteredLiekyEnd = this.lieky;
  }

  resetNeukoncene() {

    this.startDateNoEnd = new Date(this.datum);
    this.endDateNoEnd = new Date();

    this.filteredLiekyNoEnd = this.lieky;
  }

}

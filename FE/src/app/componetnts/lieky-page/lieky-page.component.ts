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

  constructor(private pacientService:PacientService, private route:ActivatedRoute ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientLieky(id!).subscribe(
      (result:PacientLieky[]) => {
        (this.lieky = result);
        this.filteredLiekyEnd = result;
        this.filteredLiekyNoEnd = result;
      }
    );
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
    this.filteredLiekyEnd = this.lieky;
  }

  resetNeukoncene() {
    this.filteredLiekyNoEnd = this.lieky;
  }

}

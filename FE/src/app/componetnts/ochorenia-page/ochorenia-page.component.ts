import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {PacientOchorenie} from "../../models/PacientOchorenie";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ochorenia-page',
  templateUrl: './ochorenia-page.component.html',
  styleUrls: ['./ochorenia-page.component.css']
})
export class OchoreniaPageComponent implements OnInit {

  ochorenia:PacientOchorenie[] = [];
  filteredOchorenia:PacientOchorenie[] = [];
  filteredOchoreniaTwo:PacientOchorenie[] = [];

  startDate: Date = new Date();
  endDate: Date = new Date();

  startDateTwo: Date = new Date();
  endDateTwo: Date = new Date();

  rodneCislo:string = "";
  datum:string = "";

  constructor(private pacientService:PacientService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.rodneCislo = this.route.snapshot.paramMap.get('rodnecislo')!;
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientOchorenia(id!).subscribe(
      (result:PacientOchorenie[]) => {
        (this.ochorenia = result);
        this.filteredOchorenia = result;
        this.filteredOchoreniaTwo = result;
      }
    );

    if (this.rodneCislo.length == 10 && Number(this.rodneCislo.substring(0,2)) >= 54 ) {
      this.datum = "19" + this.rodneCislo.substring(0,2) + "-" + Number(this.rodneCislo.substring(2,4)) % 50 + "-" + this.rodneCislo.substring(4,6);
    } else if (this.rodneCislo.length == 9) {
      this.datum = "19" + this.rodneCislo.substring(0,2) + "-" + Number(this.rodneCislo.substring(2,4)) % 50 + "-" + this.rodneCislo.substring(4,6);
    } else {
      this.datum = "20" + this.rodneCislo.substring(0,2) + "-" + Number(this.rodneCislo.substring(2,4)) % 50 + "-" + this.rodneCislo.substring(4,6);
    }


    this.startDate = new Date(this.datum);
    this.startDateTwo = new Date(this.datum);
  }

  filterUkoncene() {
    this.filteredOchorenia = [];
    this.ochorenia.forEach(a => {
      if (new Date(a.datumod) >= this.startDate && new Date(a.datumdo) <= this.endDate && a.datumdo)
      {
        this.filteredOchorenia.push(a);
      }
    });

    console.log(this.filteredOchorenia);

  }

  filterNeukoncene() {
    this.filteredOchoreniaTwo = [];
    this.ochorenia.forEach(a => {
      if (new Date(a.datumod) >= this.startDateTwo && new Date(a.datumdo) <= this.endDateTwo && !a.datumdo)
      {
        this.filteredOchoreniaTwo.push(a);
      }
    });

    console.log(this.filteredOchorenia);

  }

  resetUkoncene() {

    this.startDate = new Date(this.datum);
    this.endDate = new Date();

    this.filteredOchorenia = this.ochorenia;
  }

  resetNeukoncene() {

    this.startDateTwo = new Date(this.datum);
    this.endDateTwo = new Date();

    this.filteredOchoreniaTwo = this.ochorenia;
  }

  printPage() {
    window.print();
  }

}

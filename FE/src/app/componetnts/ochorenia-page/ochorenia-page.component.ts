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

  constructor(private pacientService:PacientService, private route: ActivatedRoute) {}



  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientOchorenia(id!).subscribe(
      (result:PacientOchorenie[]) => {
        (this.ochorenia = result);
        this.filteredOchorenia = result;
        this.filteredOchoreniaTwo = result;
      }
    );
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
    this.filteredOchorenia = this.ochorenia;
  }

  resetNeukoncene() {
    this.filteredOchoreniaTwo = this.ochorenia;
  }

}

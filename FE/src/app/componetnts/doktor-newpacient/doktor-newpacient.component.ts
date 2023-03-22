import {Component, OnInit} from '@angular/core';
import {DoktorPacient} from "../../models/DoktorPacient";
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";
import {Pacient} from "../../models/Pacient";

@Component({
  selector: 'app-doktor-newpacient',
  templateUrl: './doktor-newpacient.component.html',
  styleUrls: ['./doktor-newpacient.component.css']
})
export class DoktorNewpacientComponent implements OnInit {
  possiblePacients: Pacient[] = [];
  doctorPacients: DoktorPacient[] = [];
  docPacients: Pacient[] = [];
  filteredPacients: Pacient[] = [];

  constructor(private doktorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('osobnecislo');
    this.doktorService.getAllPacients().subscribe(
      (result:Pacient[]) =>
      {
        this.possiblePacients = result;
        this.doktorService.getPacientiDoktora(id!).subscribe(
          (result:DoktorPacient[]) =>
          {
            this.doctorPacients= result;
            this.doctorPacients.forEach(a =>
            {
              if (a.rodnecisloNavigation != null)
              {
                this.docPacients.push(a.rodnecisloNavigation);
              }
            });
            this.filteredPacients = this.possiblePacients
              .filter(item => !this.docPacients.some(removed => removed.rodnecislo === item.rodnecislo));
            console.log(this.filteredPacients);
          }
        )
      });
  }
}

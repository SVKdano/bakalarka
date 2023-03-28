import {Component, OnInit} from '@angular/core';
import {PacientLieky} from "../../models/PacientLieky";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";
import {Lieky} from "../../models/Lieky";
import {DoktorService} from "../../services/doktor.service";
import {LiekUpdate} from "../../UpdateModels/LiekUpdate";

@Component({
  selector: 'app-doktor-pacient-lieky-change',
  templateUrl: './doktor-pacient-lieky-change.component.html',
  styleUrls: ['./doktor-pacient-lieky-change.component.css']
})
export class DoktorPacientLiekyChangeComponent implements OnInit {

  lieky: PacientLieky[] = [];
  allLieky: Lieky[] = [];
  filteredLiekyNoEnd: PacientLieky[] = [];

  datum: Date = new Date();
  addedLiek:LiekUpdate = new LiekUpdate();
  updatedLiek:LiekUpdate = new LiekUpdate();

  rodneCislo: string = "";

  nazovLieku:string = "";

  constructor(private pacientService: PacientService, private route: ActivatedRoute, private doktorService: DoktorService) {
  }

  ngOnInit() {
    this.rodneCislo = this.route.snapshot.paramMap.get('rodnecislo')!;
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientLieky(id!).subscribe(
      (result: PacientLieky[]) => {
        (this.lieky = result);
        this.filterNeukoncene();
      }
    );

    this.doktorService.getAllLieky().subscribe(
      (result:Lieky[]) => {
        this.allLieky = result;
      }
    )
  }

  pridajLiek() {
    this.addedLiek.rodnecislo = this.rodneCislo;
    this.addedLiek.datumod = this.datum.toISOString().substring(0,10);

    this.doktorService.addLiek(this.addedLiek).subscribe(
      {
        next:(() =>
          {
            this.pacientService.getPacientLieky(this.rodneCislo).subscribe(
              (result: PacientLieky[]) => {
                (this.lieky = result);
                this.filterNeukoncene();
              }
            );
          })
      }
    );
  }

  initUpdate(liek:PacientLieky) {
    this.addedLiek.registracnecislo = liek.registracnecisloNavigation.registracnecislo;
    this.updatedLiek.registracnecislo = liek.registracnecisloNavigation.registracnecislo;

    this.nazovLieku = liek.registracnecisloNavigation.nazov;

    this.updatedLiek.rodnecislo = liek.rodnecislo;
    this.addedLiek.rodnecislo = liek.rodnecislo;

    this.updatedLiek.davkovanie = liek.davkovanie;
    this.addedLiek.davkovanie = liek.davkovanie;


    this.updatedLiek.datumod = liek.datumod.toString();
    this.addedLiek.datumod = liek.datumod.toString();

  }

  updateUzivanie() {
    this.updatedLiek.datumdo = undefined;

    this.updatedLiek.davkovanie =  this.addedLiek.davkovanie;

    console.log(this.updatedLiek);

    this.doktorService.updateLiek(this.updatedLiek).subscribe(
      {
        next:(() => {
          this.pacientService.getPacientLieky(this.rodneCislo).subscribe(
            (result: PacientLieky[]) => {
              (this.lieky = result);
              this.filterNeukoncene();
              console.log("Prešiel");
            }
          );
        }),
        error:(err => {
          alert(err.error.message);
        })
      }
    );
  }

  ukonciUzivanie(liek:PacientLieky) {
    var datum: Date = new Date();

    this.updatedLiek.rodnecislo = this.rodneCislo;
    this.updatedLiek.registracnecislo = liek.registracnecisloNavigation.registracnecislo;
    this.updatedLiek.datumod = liek.datumod.toString().substring(0,10);
    this.updatedLiek.davkovanie = liek.davkovanie;
    this.updatedLiek.datumdo = datum.toISOString().substring(0,10);

    this.doktorService.updateLiek(this.updatedLiek).subscribe(
      {
        next:(() => {
          this.pacientService.getPacientLieky(this.rodneCislo).subscribe(
            (result: PacientLieky[]) => {
              (this.lieky = result);
              this.filterNeukoncene();
            }
          );
        }),
        error:(err => {
          alert(err.error.message);
        })
      }
    );
  }

  filterNeukoncene() {
    this.filteredLiekyNoEnd = [];
    this.lieky.forEach(a => {
      if (!a.datumdo)
      {
        this.filteredLiekyNoEnd.push(a);
      }
    });
  }

  setKodLieku(cislo: string) {
    this.addedLiek.registracnecislo = cislo;

    console.log(this.addedLiek);
  }
}

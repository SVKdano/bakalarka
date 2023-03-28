import {Component, OnInit} from '@angular/core';
import {PacientOchorenie} from "../../models/PacientOchorenie";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";
import {DoktorService} from "../../services/doktor.service";
import {Ochorenie} from "../../models/Ochorenie";
import {OchorenieUpdate} from "../../UpdateModels/OchorenieUpdate";

@Component({
  selector: 'app-doktor-pacient-ochorenia-change',
  templateUrl: './doktor-pacient-ochorenia-change.component.html',
  styleUrls: ['./doktor-pacient-ochorenia-change.component.css']
})
export class DoktorPacientOchoreniaChangeComponent implements OnInit {
  ochorenia:PacientOchorenie[] = [];
  filteredOchoreniaTwo:PacientOchorenie[] = [];

  allOchorenia:Ochorenie[] = [];

  rodneCislo:string = "";
  datum: Date = new Date();
  nazovOchorenia:string = "";

  addedOchorenie:OchorenieUpdate = new OchorenieUpdate();
  updatedOchorenie:OchorenieUpdate = new OchorenieUpdate();

  constructor(private pacientService: PacientService, private route: ActivatedRoute, private doktorService: DoktorService) {}

  ngOnInit() {
    this.rodneCislo = this.route.snapshot.paramMap.get('rodnecislo')!;
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientOchorenia(id!).subscribe(
      (result:PacientOchorenie[]) => {
        (this.ochorenia = result);
        this.filterNeukoncene();
      }
    );

    this.doktorService.getAllOchorenia().subscribe(
      (result:Ochorenie[]) => {
        this.allOchorenia = result;
      }
    )
  }

  filterNeukoncene() {
    this.filteredOchoreniaTwo = [];
    this.ochorenia.forEach(a => {
      if (!a.datumdo)
      {
        this.filteredOchoreniaTwo.push(a);
      }
    });
  }

  pridajOchorenie() {
    this.addedOchorenie.rodnecislo = this.rodneCislo;
    this.addedOchorenie.datumod = this.datum.toISOString().substring(0, 10);

    this.doktorService.addOchorenie(this.addedOchorenie).subscribe({
      next:(() => {
        this.pacientService.getPacientOchorenia(this.rodneCislo).subscribe(
          (result:PacientOchorenie[]) => {
            (this.ochorenia = result);
            this.filterNeukoncene();
          }
        );
      }),
      error:( err => {
        alert(err.error.message);
      })
    });
  }

  initUpdate(ochorenie:PacientOchorenie) {
    this.addedOchorenie.datumod = ochorenie.datumod.toString();
    this.updatedOchorenie.datumod = ochorenie.datumod.toString();

    this.addedOchorenie.rodnecislo = this.rodneCislo;
    this.updatedOchorenie.rodnecislo = this.rodneCislo;

    this.nazovOchorenia = ochorenie.kodochoreniaNavigation.nazov;

    this.addedOchorenie.kodochorenia = ochorenie.kodochorenia;
    this.updatedOchorenie.kodochorenia = ochorenie.kodochorenia;

    this.addedOchorenie.dalsiaspecifikacia = ochorenie.dalsiaspecifikacia;
    this.updatedOchorenie.dalsiaspecifikacia = ochorenie.dalsiaspecifikacia;
  }

  updateInformacie() {
    this.updatedOchorenie.datumdo = undefined;

    this.updatedOchorenie.dalsiaspecifikacia = this.addedOchorenie.dalsiaspecifikacia;

    this.doktorService.updateOchorenie(this.updatedOchorenie).subscribe(
      {
        next:(() => {
          this.pacientService.getPacientOchorenia(this.rodneCislo).subscribe(
            (result:PacientOchorenie[]) => {
              (this.ochorenia = result);
              this.filterNeukoncene();
            }
          );
        }),
        error:( err => {
          alert(err.error.message);
        })
      });

  }

  ukonciOchorenie(ochorenie: PacientOchorenie) {
    var datum: Date = new Date();

    this.updatedOchorenie.rodnecislo = this.rodneCislo;
    this.updatedOchorenie.kodochorenia = ochorenie.kodochoreniaNavigation.kodochorenia;
    this.updatedOchorenie.datumod = ochorenie.datumod.toString().substring(0,10);
    this.updatedOchorenie.dalsiaspecifikacia = ochorenie.dalsiaspecifikacia;
    this.updatedOchorenie.datumdo = datum.toISOString().substring(0,10);

    this.doktorService.updateOchorenie(this.updatedOchorenie).subscribe(
      {
        next:(() => {
          this.pacientService.getPacientOchorenia(this.rodneCislo).subscribe(
            (result:PacientOchorenie[]) => {
              (this.ochorenia = result);
              this.filterNeukoncene();
            }
          );
        }),
        error:( err => {
          alert(err.error.message);
        })
      });
  }

  setKodOchorenia(kod: string) {
    this.addedOchorenie.kodochorenia = kod;
  }
}

import { Component } from '@angular/core';
import {PacientAlergie} from "../../models/PacientAlergie";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";
import {Alergie} from "../../models/Alergie";
import {DoktorService} from "../../services/doktor.service";
import {AlergiaUpdate} from "../../UpdateModels/AlergiaUpdate";

@Component({
  selector: 'app-doktor-pacient-alergie-change',
  templateUrl: './doktor-pacient-alergie-change.component.html',
  styleUrls: ['./doktor-pacient-alergie-change.component.css']
})
export class DoktorPacientAlergieChangeComponent {

  alergie: PacientAlergie[] = [];
  allAlergie: Alergie[] = [];
  alergiaUpdate: AlergiaUpdate = new AlergiaUpdate();

  typAlergie: string = "";

  constructor(private pacientService:PacientService, private route:ActivatedRoute, private doctorService: DoktorService) {}

  ngOnInit() : void {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientAlergie(id!).subscribe(
      (result:PacientAlergie[]) => {
        (this.alergie = result);
      }
    );

    this.doctorService.getAllAlergies().subscribe(
      (result:Alergie[]) =>
      {
      this.allAlergie = result;
    }
    );
  }

  addAlergia() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.alergiaUpdate.rodnecislo = id!;

    this.doctorService.addAlergia(this.alergiaUpdate).subscribe({
    next:(() => {
      this.pacientService.getPacientAlergie(id!).subscribe(
        (result: PacientAlergie[]) => {
          (this.alergie = result);
        }
      );
    }),
    error:(
      err => {
      alert(err.error.message);
    })
  })
  }

  initUpdate(kod:string, doplnok:string, typAlergie:string) {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.alergiaUpdate.rodnecislo = id!;

    this.alergiaUpdate.kodalergie = kod;
    this.alergiaUpdate.informacie = doplnok;

    this.typAlergie = typAlergie;
  }

  updateAlergia() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.doctorService.updateAlergia(this.alergiaUpdate).subscribe(
      () => {
        this.pacientService.getPacientAlergie(id!).subscribe(
          (result: PacientAlergie[]) => {
            (this.alergie = result);
          }
        );
      },
      err => {
        alert(err.error.message);
      }
    )
  }

  deleteAlergia(rodneCislo:string, kodAlergie:string) {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.doctorService.deleteAlergia(rodneCislo, kodAlergie).subscribe({
      next:(() => {
        this.pacientService.getPacientAlergie(id!).subscribe(
          (result: PacientAlergie[]) => {
            (this.alergie = result);
          }
        );
      }),
      error: (err => {
        alert(err.error.message);
      })
    })
  }

  setKodAlergie(kod:string) {
    this.alergiaUpdate.kodalergie = kod;
  }
}

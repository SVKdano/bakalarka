import { Component } from '@angular/core';
import {PacientAlergie} from "../../models/PacientAlergie";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";
import {Alergie} from "../../models/Alergie";
import {DoktorService} from "../../services/doktor.service";

@Component({
  selector: 'app-doktor-pacient-alergie-change',
  templateUrl: './doktor-pacient-alergie-change.component.html',
  styleUrls: ['./doktor-pacient-alergie-change.component.css']
})
export class DoktorPacientAlergieChangeComponent {

  alergie: PacientAlergie[] = [];
  allAlergie: Alergie[] = [];

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
      console.log(this.allAlergie);
    }
    );
  }
}

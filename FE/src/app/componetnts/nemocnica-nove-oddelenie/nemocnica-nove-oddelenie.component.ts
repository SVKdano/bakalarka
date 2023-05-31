import { Component } from '@angular/core';
import {OddelenieUpdate} from "../../UpdateModels/OddelenieUpdate";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NemocnicaService} from "../../services/nemocnica.service";
import {Pacient} from "../../models/Pacient";
import {Oddelenie} from "../../models/Oddelenie";

@Component({
  selector: 'app-nemocnica-nove-oddelenie',
  templateUrl: './nemocnica-nove-oddelenie.component.html',
  styleUrls: ['./nemocnica-nove-oddelenie.component.css']
})
export class NemocnicaNoveOddelenieComponent {
  noveOddelenie:OddelenieUpdate = new OddelenieUpdate();

  formularCheck:FormGroup = new FormGroup ({
    kodOddeleniaCheck: new FormControl(null, [Validators.required]),
    nazovOddeleniaCheck: new FormControl(null, [Validators.required]),
    kapacitaCheck: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)])
  })

  constructor(private route:ActivatedRoute, private nemocnicaService:NemocnicaService, private router: Router) {}


  pridajOddelenie() {
    const id = this.route.snapshot.paramMap.get('idnemocnice');
    this.noveOddelenie.idnemocnice = id!;
    this.nemocnicaService.addOddelenie(this.noveOddelenie).subscribe(
      {
        next: ((result: Oddelenie[]) => {
          window.location.reload();
        }),
        error: (err => {
            alert(err.error.message);
          }
        )
      })
  }
}

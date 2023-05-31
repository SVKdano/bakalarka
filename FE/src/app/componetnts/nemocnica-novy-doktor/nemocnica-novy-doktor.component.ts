import {Component, OnInit} from '@angular/core';
import {Oddelenie} from "../../models/Oddelenie";
import {ActivatedRoute} from "@angular/router";
import {NemocnicaService} from "../../services/nemocnica.service";
import {DoktorService} from "../../services/doktor.service";
import {Doktor} from "../../models/Doktor";
import {DoktorUpdate} from "../../UpdateModels/DoktorUpdate";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-nemocnica-novy-doktor',
  templateUrl: './nemocnica-novy-doktor.component.html',
  styleUrls: ['./nemocnica-novy-doktor.component.css']
})
export class NemocnicaNovyDoktorComponent implements OnInit {

  oddelenia:Oddelenie[] = [];
  kodOddelenia:string = "";
  idNemocnice:string = "";

  novyDoktor:DoktorUpdate = new DoktorUpdate();

  constructor(private route:ActivatedRoute, private nemocnicaService:NemocnicaService, private doktorService:DoktorService) {}

  novyDoktorCheck: FormGroup = new FormGroup({
    osobneCislo: new FormControl(null, [Validators.required ,/*Validators.pattern("[0-9]+"),*/
      Validators.minLength(9), Validators.maxLength(10)]),
    meno: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-zÀ-ȕ ]+")]),
    priezvisko: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-zÀ-ȕ ]+")]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  ngOnInit() {
    this.doktorService.getOddelenia().subscribe(
      ((result:Oddelenie[]) => {
        this.oddelenia = result;
      })
    );
  }

  setUdaje(kod:string, id:string) {
    this.kodOddelenia = kod;
    this.idNemocnice = id;

  }
}

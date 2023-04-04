import { Component } from '@angular/core';
import {Oddelenie} from "../../models/Oddelenie";
import {Doktor} from "../../models/Doktor";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShareService} from "../../services/share.service";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-pacient-zaznamy-share',
  templateUrl: './doktor-pacient-zaznamy-share.component.html',
  styleUrls: ['./doktor-pacient-zaznamy-share.component.css']
})
export class DoktorPacientZaznamyShareComponent {
  oddelenia:Oddelenie[] = [];
  selectedOddelenie:Oddelenie = new Oddelenie();

  doktori:Doktor[] = [];
  filteredDoktori:Doktor[] = [];

  kodOddelenie:string = "";
  osobneCisloSelected:string = "";
  datum?:Date

  requiredForm: FormGroup = new FormGroup({
    doktor: new FormControl(null, [Validators.required]),
    datum: new FormControl(null, [Validators.required]),
  });

  constructor(private shareService:ShareService, private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.shareService.getOddeleniaForShare().subscribe(
      (result:Oddelenie[]) => {
        this.oddelenia = result;
      }
    );

    this.shareService.getDoktoriForShare().subscribe(
      (result:Doktor[]) => {
        this.doktori = result;
        this.filteredDoktori = result;
      }
    );
  }

  share() {
    var datumReady:string = this.datum!.toISOString().substring(0,10);
    var zdielajuci:string = this.route.snapshot.paramMap.get('osobnecislo')!;
    var idzaznamu:number = Number(this.route.snapshot.paramMap.get('idzaznam')!);

    this.shareService.shareZaznam(zdielajuci,this.osobneCisloSelected,idzaznamu,datumReady).subscribe(
      () => {
        alert("Úspešne zazdielané!");
      }
    );
  }

  setKodOddelenia(oddelenie:Oddelenie) {
    this.kodOddelenie = oddelenie.kododdelenia;
  }

  setOsobneCislo(doktor:Doktor) {
    this.osobneCisloSelected = doktor.osobnecislo;
  }

  filter() {
    this.filteredDoktori = [];

    this.doktori.forEach(a =>
    {
      if (a.kododdelenia.includes(this.kodOddelenie))
      {
        this.filteredDoktori.push(a);
      }
    })
  }

  reset() {
    this.kodOddelenie = "";
    this.filteredDoktori = this.doktori;

    console.log(this.selectedOddelenie);
  }
}

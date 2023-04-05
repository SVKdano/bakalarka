import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";
import {ShareService} from "../../services/share.service";
import {Oddelenie} from "../../models/Oddelenie";
import {Doktor} from "../../models/Doktor";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-doktor-pacient-alegrgia-share',
  templateUrl: './doktor-pacient-alegrgia-share.component.html',
  styleUrls: ['./doktor-pacient-alegrgia-share.component.css']
})
export class DoktorPacientAlegrgiaShareComponent implements OnInit {

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
    var rodnecislo:string = this.route.snapshot.paramMap.get('rodnecislo')!;

    this.shareService.shareAlergie(zdielajuci,this.osobneCisloSelected,rodnecislo,datumReady).subscribe(
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

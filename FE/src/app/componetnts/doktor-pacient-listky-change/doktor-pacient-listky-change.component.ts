import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";
import {DoktorService} from "../../services/doktor.service";
import {Oddelenie} from "../../models/Oddelenie";
import {OdporucaciListok} from "../../models/OdporucaciListok";
import {ListokUpdate} from "../../UpdateModels/ListokUpdate";

@Component({
  selector: 'app-doktor-pacient-listky-change',
  templateUrl: './doktor-pacient-listky-change.component.html',
  styleUrls: ['./doktor-pacient-listky-change.component.css']
})
export class DoktorPacientListkyChangeComponent implements OnInit {

  oddelenia:Oddelenie[] = [];
  listky: OdporucaciListok[] = [];
  addedListok:ListokUpdate = new ListokUpdate();

  kodOddelenia: string = "";
  idNemocnice: string = "";


  constructor(private pacientService:PacientService, private route:ActivatedRoute, private doctorService: DoktorService) {}

  ngOnInit() {
    const rodne = this.route.snapshot.paramMap.get('rodnecislo');
    const osobne = this.route.snapshot.paramMap.get('osobnecislo');
    this.doctorService.getOddelenia().subscribe(
      ((result:Oddelenie[]) => {
        this.oddelenia = result;
      })
    );

    this.doctorService.getDoktoroveListky(rodne!,osobne!).subscribe(
      ((result:OdporucaciListok[]) => {
        this.listky = result;
        console.log(this.listky);
      })
    );
  }

  pridajListok() {
    const rodne = this.route.snapshot.paramMap.get('rodnecislo');
    const osobne = this.route.snapshot.paramMap.get('osobnecislo');

    this.addedListok.datumodporucenia = new Date().toISOString().substring(0,10);
    this.addedListok.idnemocnice = this.idNemocnice;
    this.addedListok.kododdelenia = this.kodOddelenia;
    this.addedListok.rodnecislo = rodne!;
    this.addedListok.osobnecislo = osobne!;

    this.doctorService.addListok(this.addedListok).subscribe(
      (result:OdporucaciListok[]) => {
        this.doctorService.getDoktoroveListky(rodne!,osobne!).subscribe(
          ((result:OdporucaciListok[]) => {
            this.listky = result;
            console.log(this.listky);
          })
        );
      }
    );
  }

  vymazListok(listok:OdporucaciListok) {
    const rodne = this.route.snapshot.paramMap.get('rodnecislo');
    const osobne = this.route.snapshot.paramMap.get('osobnecislo');

    this.doctorService.deleteListok(listok.datumodporucenia.toString(),listok.kododdelenia,
      listok.idnemocnice, listok.osobnecislo, listok.rodnecislo).subscribe(
      () => {
        this.doctorService.getDoktoroveListky(rodne!,osobne!).subscribe(
          ((result:OdporucaciListok[]) => {
            this.listky = result;
            console.log(this.listky);
          })
        );
      }
    );
  }

  setUdaje(kod:string, id:string) {
    this.kodOddelenia = kod;
    this.idNemocnice = id;

    console.log(this.idNemocnice, this.kodOddelenia);
  }
}

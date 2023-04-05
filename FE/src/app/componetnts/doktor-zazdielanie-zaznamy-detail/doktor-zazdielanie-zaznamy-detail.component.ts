import { Component } from '@angular/core';
import {Zaznam} from "../../models/Zaznam";
import {VysetrenieZaznam} from "../../models/VysetrenieZaznam";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-zazdielanie-zaznamy-detail',
  templateUrl: './doktor-zazdielanie-zaznamy-detail.component.html',
  styleUrls: ['./doktor-zazdielanie-zaznamy-detail.component.css']
})
export class DoktorZazdielanieZaznamyDetailComponent {
  zaznam:Zaznam[] = [];
  vysetrenie:VysetrenieZaznam[] = [];

  rodneCislo:string = "";
  osobneCislo:string = "";
  idzaznam:number = 0;

  constructor(private pacientService:PacientService,private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('idzaznam'));
    this.pacientService.getVysetreniaVZazname(id).subscribe(
      (result:VysetrenieZaznam[]) =>
      {
        this.vysetrenie = result;
      }
    );

    this.pacientService.getZaznam(id).subscribe(
      (result:Zaznam[]) =>
      {
        this.zaznam = result;
        this.osobneCislo = result.at(0)!.osobnecislo;
        this.rodneCislo = result.at(0)!.rodnecislo;
        this.idzaznam = result.at(0)!.idzaznam;
      }
    )
  }
}

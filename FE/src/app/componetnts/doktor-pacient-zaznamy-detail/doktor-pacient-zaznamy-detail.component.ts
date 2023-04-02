import { Component } from '@angular/core';
import {Zaznam} from "../../models/Zaznam";
import {VysetrenieZaznam} from "../../models/VysetrenieZaznam";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-pacient-zaznamy-detail',
  templateUrl: './doktor-pacient-zaznamy-detail.component.html',
  styleUrls: ['./doktor-pacient-zaznamy-detail.component.css']
})
export class DoktorPacientZaznamyDetailComponent {
  zaznam:Zaznam[] = [];
  vysetrenie:VysetrenieZaznam[] = [];

  constructor(private pacientService:PacientService,private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('idzaznam'));
    this.pacientService.getVysetreniaVZazname(id).subscribe(
      (result:VysetrenieZaznam[]) =>
      {
        this.vysetrenie = result;
        console.log(this.vysetrenie);
      }
    );

    this.pacientService.getZaznam(id).subscribe(
      (result:Zaznam[]) =>
      {
        this.zaznam = result;
        console.log(this.zaznam);
      }
    )
  }
}

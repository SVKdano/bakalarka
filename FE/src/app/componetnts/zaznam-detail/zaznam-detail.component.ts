import { Component } from '@angular/core';
import {Zaznam} from "../../models/Zaznam";
import {PacientService} from "../../services/pacient.service";
import {VysetrenieZaznam} from "../../models/VysetrenieZaznam";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-zaznam-detail',
  templateUrl: './zaznam-detail.component.html',
  styleUrls: ['./zaznam-detail.component.css']
})
export class ZaznamDetailComponent {

  zaznam:Zaznam[] = [];
  vysetrenie:VysetrenieZaznam[] = [];

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
      }
    )
  }

  printPage() {
    window.print();
  }
}

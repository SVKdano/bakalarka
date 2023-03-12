import {Component, OnInit} from '@angular/core';
import {PacientDoktori} from "../../models/PacientDoktori";
import {PacientService} from "../../services/pacient.service";

@Component({
  selector: 'app-doktori-page',
  templateUrl: './doktori-page.component.html',
  styleUrls: ['./doktori-page.component.css']
})
export class DoktoriPageComponent implements OnInit {

  doktori: PacientDoktori[] = []

  constructor(private pacientService:PacientService) {}

  ngOnInit() {
    this.pacientService.getPacientDoktori("0003015078").subscribe(
      (result:PacientDoktori[]) =>
      {
        this.doktori = result;
        console.log(this.doktori);
      }
    )
  }
}

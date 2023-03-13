import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {OdporucaciListok} from "../../models/OdporucaciListok";

@Component({
  selector: 'app-listky-page',
  templateUrl: './listky-page.component.html',
  styleUrls: ['./listky-page.component.css']
})
export class ListkyPageComponent implements OnInit {
  listky:OdporucaciListok[] = [];

  constructor(private pacientService:PacientService) {}

  ngOnInit() {
    this.pacientService.getPacientListky("0003015078").subscribe(
      (result:OdporucaciListok[]) => {
        this.listky = result;
        console.log(this.listky);
      }
    )
  }
}

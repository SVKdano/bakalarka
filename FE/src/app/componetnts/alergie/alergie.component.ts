import { Component } from '@angular/core';
import {PacientAlergie} from "../../models/PacientAlergie";
import {PacientService} from "../../services/pacient.service";

@Component({
  selector: 'app-alergie',
  templateUrl: './alergie.component.html',
  styleUrls: ['./alergie.component.css']
})
export class AlergieComponent {

  alergie: PacientAlergie[] = [];

  constructor(private pacientService:PacientService) {}

  ngOnInit() : void {
    this.pacientService.getPacientAlergie("7057150353").subscribe(
      (result:PacientAlergie[]) => {
        (this.alergie = result);
        console.log(this.alergie);
      }
    )
  }
}

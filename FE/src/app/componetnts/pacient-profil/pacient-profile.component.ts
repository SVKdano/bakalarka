import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {Pacient} from "../../models/Pacient";
import {PacientAlergie} from "../../models/PacientAlergie";

@Component({
  selector: 'app-pacient-profile',
  templateUrl: './pacient-profile.component.html',
  styleUrls: ['./pacient-profile.component.css']
})
export class PacientProfileComponent implements OnInit {

  pacient: Pacient[] = [];
  alergie: PacientAlergie[] = [];

  constructor(private pacientService:PacientService) {}

  ngOnInit() : void {
    this.pacientService.getPacient("7057150353").subscribe(
      (result:Pacient[]) => {
        (this.pacient = result);
      }
    );

    this.pacientService.getPacientAlergie("7057150353").subscribe(
      (result:PacientAlergie[]) => {
        (this.alergie = result);
        console.log(this.alergie);
      }
    )
  }

  upravRC(string:String) : string {
    var vysledny:string = string.substring(0,6);
    vysledny = vysledny.concat("/");
    vysledny = vysledny.concat(string.substring(6));

    return vysledny;
  }
}

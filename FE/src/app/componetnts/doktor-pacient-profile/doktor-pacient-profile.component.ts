import { Component } from '@angular/core';
import {Pacient} from "../../models/Pacient";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-pacient-profile',
  templateUrl: './doktor-pacient-profile.component.html',
  styleUrls: ['./doktor-pacient-profile.component.css']
})
export class DoktorPacientProfileComponent {
  pacient: Pacient[] = [];

  constructor(private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() : void {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacient(id!).subscribe(
      (result:Pacient[]) => {
        (this.pacient = result);
      }
    );
  }

  upravRC(string:String) : string {
    var vysledny:string = string.substring(0,6);
    vysledny = vysledny.concat("/");
    vysledny = vysledny.concat(string.substring(6));

    return vysledny;
  }
}

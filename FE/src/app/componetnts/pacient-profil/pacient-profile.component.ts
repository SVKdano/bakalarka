import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {Pacient} from "../../models/Pacient";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pacient-profile',
  templateUrl: './pacient-profile.component.html',
  styleUrls: ['./pacient-profile.component.css']
})
export class PacientProfileComponent implements OnInit {

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

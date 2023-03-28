import {Component, OnInit} from '@angular/core';
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";
import {Pacient} from "../../models/Pacient";
import {PacientService} from "../../services/pacient.service";

@Component({
  selector: 'app-innerpanel-doktorpacient',
  templateUrl: './innerpanel-doktorpacient.component.html',
  styleUrls: ['./innerpanel-doktorpacient.component.css']
})
export class InnerpanelDoktorpacientComponent implements OnInit {

  osobneCislo:string = "";
  rodneCislo:string = "";

  pacient: Pacient[] = [];

  constructor(private doctorService:DoktorService, private route:ActivatedRoute, private pacientService:PacientService) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;
    this.rodneCislo = this.route.snapshot.paramMap.get('rodnecislo')!;

    this.pacientService.getPacient(this.rodneCislo).subscribe(
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

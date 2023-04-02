import {Component, OnInit} from '@angular/core';
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pacient} from "../../models/Pacient";
import {PacientService} from "../../services/pacient.service";
import {ZaznamUpdate} from "../../UpdateModels/ZaznamUpdate";

@Component({
  selector: 'app-innerpanel-doktorpacient',
  templateUrl: './innerpanel-doktorpacient.component.html',
  styleUrls: ['./innerpanel-doktorpacient.component.css']
})
export class InnerpanelDoktorpacientComponent implements OnInit {

  osobneCislo:string = "";
  rodneCislo:string = "";

  pacient: Pacient[] = [];
  zaznamToBeAdded: ZaznamUpdate = new ZaznamUpdate();

  constructor(private doctorService:DoktorService, private route:ActivatedRoute,
              private pacientService:PacientService, private  router:Router) {}

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

  pridajZaznam() {
    let datum:Date = new Date();
    this.zaznamToBeAdded.datum = new Date(datum.getTime() - datum.getTimezoneOffset()*60000).toISOString().substring(0,10);
    this.zaznamToBeAdded.cas = new Date(datum.getTime() - datum.getTimezoneOffset()*60000).toISOString().substring(11,19);
    this.zaznamToBeAdded.rodnecislo = this.rodneCislo;
    this.zaznamToBeAdded.osobnecislo = this.osobneCislo;

    this.doctorService.addZaznam(this.zaznamToBeAdded).subscribe(
      (result:number) => {
        console.log(result);
        this.router.navigate(["/doktor", this.osobneCislo, this.rodneCislo, "zaznamPridaj", result]);
      }
    );
  }
}

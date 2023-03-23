import {Component, OnInit} from '@angular/core';
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-innerpanel-doktorpacient',
  templateUrl: './innerpanel-doktorpacient.component.html',
  styleUrls: ['./innerpanel-doktorpacient.component.css']
})
export class InnerpanelDoktorpacientComponent implements OnInit {

  osobneCislo:string = "";
  rodneCislo:string = "";

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;
    this.rodneCislo = this.route.snapshot.paramMap.get('rodnecislo')!;

    console.log(this.osobneCislo, " ", this.rodneCislo);
  }
}

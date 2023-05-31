import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NemocnicaService} from "../../services/nemocnica.service";
import {DoktorService} from "../../services/doktor.service";
import {Doktor} from "../../models/Doktor";
import {Oddelenie} from "../../models/Oddelenie";

@Component({
  selector: 'app-nemocnica-doktor-oddelenie-zmena',
  templateUrl: './nemocnica-doktor-oddelenie-zmena.component.html',
  styleUrls: ['./nemocnica-doktor-oddelenie-zmena.component.css']
})
export class NemocnicaDoktorOddelenieZmenaComponent implements OnInit {

  doktor:Doktor[] = [];
  oddelenia:Oddelenie[] = [];

  kodOddelenia: string = "";
  idNemocnice:string = "";

  constructor(private route:ActivatedRoute, private nemocnicaService:NemocnicaService, private doktorService:DoktorService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('osobnecislo');

    this.doktorService.getDoktori(id!).subscribe(
      (result:Doktor[]) => {
        this.doktor = result;
      }
    );

    this.doktorService.getOddelenia().subscribe(
      ((result:Oddelenie[]) => {
        this.oddelenia = result;
      })
    );
  }

  setUdaje(kod:string, id:string) {
    this.kodOddelenia = kod;
    this.idNemocnice = id;

  }
}

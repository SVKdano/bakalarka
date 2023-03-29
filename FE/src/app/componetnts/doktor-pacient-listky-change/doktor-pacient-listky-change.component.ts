import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";
import {DoktorService} from "../../services/doktor.service";
import {Oddelenie} from "../../models/Oddelenie";
import {OdporucaciListok} from "../../models/OdporucaciListok";

@Component({
  selector: 'app-doktor-pacient-listky-change',
  templateUrl: './doktor-pacient-listky-change.component.html',
  styleUrls: ['./doktor-pacient-listky-change.component.css']
})
export class DoktorPacientListkyChangeComponent implements OnInit {

  oddelenia:Oddelenie[] = [];
  listky: OdporucaciListok[] = [];

  constructor(private pacientService:PacientService, private route:ActivatedRoute, private doctorService: DoktorService) {}

  ngOnInit() {
    const rodne = this.route.snapshot.paramMap.get('rodnecislo');
    const osobne = this.route.snapshot.paramMap.get('osobnecislo');
    this.doctorService.getOddelenia().subscribe(
      ((result:Oddelenie[]) => {
        this.oddelenia = result;
      })
    );

    this.doctorService.getDoktoroveListky(rodne!,osobne!).subscribe(
      ((result:OdporucaciListok[]) => {
        this.listky = result;
        console.log(this.listky);
      })
    )
  }
}

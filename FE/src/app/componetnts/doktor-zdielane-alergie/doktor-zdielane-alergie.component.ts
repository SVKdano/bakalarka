import {Component, OnInit} from '@angular/core';
import {AlergieZdielanie} from "../../models/AlergieZdielanie";
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-zdielane-alergie',
  templateUrl: './doktor-zdielane-alergie.component.html',
  styleUrls: ['./doktor-zdielane-alergie.component.css']
})
export class DoktorZdielaneAlergieComponent implements OnInit {

  osobneCislo:string = "";
  zazdielane:AlergieZdielanie[] = [];

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;

    this.doctorService.getMneZazdielane(this.osobneCislo).subscribe(
      (result:AlergieZdielanie[]) =>
      {
        this.zazdielane = result;
        console.log(this.zazdielane);
      }
    )
  }
}

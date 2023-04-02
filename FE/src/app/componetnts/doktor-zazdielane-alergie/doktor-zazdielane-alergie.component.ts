import {Component, OnInit} from '@angular/core';
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";
import {AlergieZdielanie} from "../../models/AlergieZdielanie";

@Component({
  selector: 'app-doktor-zazdielane-alergie',
  templateUrl: './doktor-zazdielane-alergie.component.html',
  styleUrls: ['./doktor-zazdielane-alergie.component.css']
})
export class DoktorZazdielaneAlergieComponent implements OnInit {
  osobneCislo:string = "";
  zazdielane:AlergieZdielanie[] = [];

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;

    this.doctorService.getMnouZazdielane(this.osobneCislo).subscribe(
      (result:AlergieZdielanie[]) =>
      {
        this.zazdielane = result;
        console.log(this.zazdielane);
      }
    )
  }
}

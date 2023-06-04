import { Component } from '@angular/core';
import {Zaznam} from "../../models/Zaznam";
import {PacientService} from "../../services/pacient.service";
import {VysetrenieZaznam} from "../../models/VysetrenieZaznam";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-zaznam-detail',
  templateUrl: './zaznam-detail.component.html',
  styleUrls: ['./zaznam-detail.component.css']
})
export class ZaznamDetailComponent {

  zaznam:Zaznam[] = [];
  vysetrenie:VysetrenieZaznam[] = [];

  constructor(private pacientService:PacientService,private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('idzaznam'));
    this.pacientService.getVysetreniaVZazname(id).subscribe(
      (result:VysetrenieZaznam[]) =>
      {
        this.vysetrenie = result;
      }
    );

    this.pacientService.getZaznam(id).subscribe(
      (result:Zaznam[]) =>
      {
        this.zaznam = result;
      }
    )
  }

  printPage() {
    window.print();
  }

  downloadFile() {
    const id = this.route.snapshot.paramMap.get('idzaznam')!;

    this.pacientService.zaznamCsvDownload(id)
      .subscribe(response => {
        let fileName = "zaznam.csv"
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      })
  }

  downloadJson() {
    const id = this.route.snapshot.paramMap.get('idzaznam')!;

    this.pacientService.zaznamJsonDownload(id)
      .subscribe( response => {
        let fileName = "zaznam.json";
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      })
  }
}

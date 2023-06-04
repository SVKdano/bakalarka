import {Component, OnInit} from '@angular/core';
import {PacientDoktori} from "../../models/PacientDoktori";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktori-page',
  templateUrl: './doktori-page.component.html',
  styleUrls: ['./doktori-page.component.css']
})
export class DoktoriPageComponent implements OnInit {

  doktori: PacientDoktori[] = []

  constructor(private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientDoktori(id!).subscribe(
      (result:PacientDoktori[]) =>
      {
        this.doktori = result;
      }
    )
  }

  printPage() {
    window.print();
  }


  downloadFile() {
    const rc = this.route.snapshot.paramMap.get('rodnecislo')!;

    this.pacientService.doktoriCsvDownload(rc)
      .subscribe(response => {
        let fileName = "doktori.csv"
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      })
  }

  downloadJson() {
    const rc = this.route.snapshot.paramMap.get('rodnecislo')!;

    this.pacientService.doktoriJsonDownload(rc)
      .subscribe( response => {
        let fileName = "doktori.json";
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      })
  }
}

import { Component } from '@angular/core';
import {PacientAlergie} from "../../models/PacientAlergie";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-pacient-alergie',
  templateUrl: './doktor-pacient-alergie.component.html',
  styleUrls: ['./doktor-pacient-alergie.component.css']
})
export class DoktorPacientAlergieComponent {
  alergie: PacientAlergie[] = [];

  constructor(private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() : void {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientAlergie(id!).subscribe(
      (result:PacientAlergie[]) => {
        (this.alergie = result);
      }
    )
  }

  printPage() {
    window.print();
  }

  downloadFile() {
    const rc = this.route.snapshot.paramMap.get('rodnecislo')!;
    this.pacientService.csvDownload(rc)
      .subscribe(response => {
        let fileName = "alergie.csv"
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      })
  }

  downloadJson() {
    const rc = this.route.snapshot.paramMap.get('rodnecislo')!;
    this.pacientService.jsonDownload(rc)
      .subscribe( response => {
        let fileName = "alergie.json";
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      })
  }
}

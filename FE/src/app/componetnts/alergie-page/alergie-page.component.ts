import {Component} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-alergie-page',
  templateUrl: './alergie-page.component.html',
  styleUrls: ['./alergie-page.component.css']
})
export class AlergiePageComponent {

  constructor( private pacientService: PacientService, private route:ActivatedRoute) {
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
    this.pacientService.jsonDownload("rc")
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

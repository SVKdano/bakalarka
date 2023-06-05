import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DoktorService} from "../../services/doktor.service";
import {DoktorPacient} from "../../models/DoktorPacient";
import {FilterDTO} from "../../models/FilterDTO"

@Component({
  selector: 'app-doktor-pacienti',
  templateUrl: './doktor-pacienti.component.html',
  styleUrls: ['./doktor-pacienti.component.css']
})
export class DoktorPacientiComponent implements OnInit {

  pacienti:DoktorPacient[] = [];
  pacientiFiltered:DoktorPacient[] = [];

  menoFilter: string = "";
  priezviskoFilter: string = "";
  rodnecisloFilter: string = "";

  filterDTO:FilterDTO = new FilterDTO();

  constructor(private doktorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('osobnecislo');
    this.doktorService.getPacientiDoktora(id!).subscribe(
      (result:DoktorPacient[]) => {
        this.pacienti = result;
        this.pacientiFiltered = result;
      }
    )
  }

  filter() {
    this.pacientiFiltered = [];
    this.filterDTO.menoFilter = this.menoFilter;
    this.filterDTO.priezviskoFilter = this.priezviskoFilter;
    this.filterDTO.rodnecisloFilter = this.rodnecisloFilter;

    this.pacienti.forEach(a => {
      if (a.rodnecisloNavigation && a.rodnecisloNavigation.meno.toLowerCase().includes(this.menoFilter.toLowerCase()))
      {
        if (a.rodnecisloNavigation && a.rodnecisloNavigation.priezvisko.toLowerCase().includes(this.priezviskoFilter.toLowerCase()))
        {
          if (a.rodnecislo.toLowerCase().includes(this.rodnecisloFilter.toLowerCase())) {
            this.pacientiFiltered.push(a);
          }
        }
      }
    });
  }

  reset() {
    this.menoFilter = "";
    this.priezviskoFilter = "";
    this.rodnecisloFilter = "";

    this.filterDTO.menoFilter = this.menoFilter;
    this.filterDTO.priezviskoFilter = this.priezviskoFilter;
    this.filterDTO.rodnecisloFilter = this.rodnecisloFilter;

    this.pacientiFiltered = this.pacienti;
  }

  printPage() {
    window.print();
  }


  downloadFile() {
    const oc = this.route.snapshot.paramMap.get('osobnecislo')!;

    this.doktorService.pacientiCsv(oc,this.filterDTO)
      .subscribe(response => {
        let fileName = "mojiPacienti.csv"
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      })
  }

  downloadJson() {
    const oc = this.route.snapshot.paramMap.get('osobnecislo')!;

    this.doktorService.pacientiJson(oc,this.filterDTO)
      .subscribe( response => {
        let fileName = "mojiPacienti.json";
        let blob:Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      })
  }
}

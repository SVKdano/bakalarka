import {Component, OnInit} from '@angular/core';
import {DoktorService} from "../../services/doktor.service";
import {Doktor} from "../../models/Doktor";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-panel',
  templateUrl: './doktor-panel.component.html',
  styleUrls: ['./doktor-panel.component.css']
})
export class DoktorPanelComponent implements OnInit {

  doktor:Doktor[] = [];
  osobneCislo:string = "";

  constructor(private doctorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('osobnecislo');
    this.doctorService.getDoktori(id!).subscribe(
      (result:Doktor[]) =>
      {
        this.doktor = result;
        this.osobneCislo = result.at(0)!.osobnecislo;
      }
    );
  }
}

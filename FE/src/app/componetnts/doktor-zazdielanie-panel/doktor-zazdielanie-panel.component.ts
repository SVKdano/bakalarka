import { Component } from '@angular/core';
import {ShareService} from "../../services/share.service";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-zazdielanie-panel',
  templateUrl: './doktor-zazdielanie-panel.component.html',
  styleUrls: ['./doktor-zazdielanie-panel.component.css']
})
export class DoktorZazdielaniePanelComponent {
  osobneCislo:string = "";

  constructor(private shareService:ShareService, private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;
  }
}

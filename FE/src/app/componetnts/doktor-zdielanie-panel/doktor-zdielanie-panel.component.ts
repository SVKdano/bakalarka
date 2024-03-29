import {Component, OnInit} from '@angular/core';
import {ShareService} from "../../services/share.service";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doktor-zdielanie-panel',
  templateUrl: './doktor-zdielanie-panel.component.html',
  styleUrls: ['./doktor-zdielanie-panel.component.css']
})
export class DoktorZdielaniePanelComponent implements OnInit {

  osobneCislo:string = "";

  constructor(private shareService:ShareService, private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;
  }

}

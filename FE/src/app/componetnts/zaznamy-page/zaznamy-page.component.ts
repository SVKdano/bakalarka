import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {Zaznam} from "../../models/Zaznam";

@Component({
  selector: 'app-zaznamy-page',
  templateUrl: './zaznamy-page.component.html',
  styleUrls: ['./zaznamy-page.component.css']
})
export class ZaznamyPageComponent implements OnInit {

  zaznamy:Zaznam[] = [];

  constructor(private pacientService:PacientService) {}

  ngOnInit() {
    this.pacientService.getPacientZaznamy("0003015078").subscribe(
      (result:Zaznam[]) => {
        this.zaznamy = result;
        console.log(this.zaznamy);
      }
    );
  }
}

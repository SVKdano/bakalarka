import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {Zaznam} from "../../models/Zaznam";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-zaznamy-page',
  templateUrl: './zaznamy-page.component.html',
  styleUrls: ['./zaznamy-page.component.css']
})
export class ZaznamyPageComponent implements OnInit {

  zaznamy:Zaznam[] = [];
  filteredZaznamy: Zaznam[] = [];

  start:Date = new Date();
  end:Date = new Date();

  constructor(private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientZaznamy(id!).subscribe(
      (result:Zaznam[]) => {
        this.zaznamy = result;
        this.filteredZaznamy = result;
      }
    );
  }

  filter() {
    this.filteredZaznamy = [];

    this.zaznamy.forEach(a => {
      if ((new Date(a.datum) >= this.start) && (new Date(a.datum) <= this.end))
      {
        this.filteredZaznamy.push(a);
      }
    });

    console.log(this.filteredZaznamy);
  }

  reset() {
    this.filteredZaznamy = this.zaznamy;
  }
}

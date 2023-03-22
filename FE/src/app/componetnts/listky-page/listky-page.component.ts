import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {OdporucaciListok} from "../../models/OdporucaciListok";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-listky-page',
  templateUrl: './listky-page.component.html',
  styleUrls: ['./listky-page.component.css']
})
export class ListkyPageComponent implements OnInit {
  listky:OdporucaciListok[] = [];
  filteredListky: OdporucaciListok[] = [];

  start:Date = new Date();
  end:Date = new Date();

  constructor(private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientListky(id!).subscribe(
      (result:OdporucaciListok[]) => {
        this.listky = result;
        this.filteredListky = result;
      }
    )
  }

  filter() {
    this.filteredListky = [];

    this.listky.forEach(a => {
      if ((new Date(a.datumodporucenia) >= this.start) && (new Date(a.datumodporucenia) <= this.end))
      {
        this.filteredListky.push(a);
      }
    });

    console.log(this.filteredListky);
  }

  reset() {
    this.filteredListky = this.listky;
  }
}

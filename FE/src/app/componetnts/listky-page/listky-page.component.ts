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

  constructor(private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientListky(id!).subscribe(
      (result:OdporucaciListok[]) => {
        this.listky = result;
        console.log(this.listky);
      }
    )
  }
}

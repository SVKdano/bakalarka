import { Component } from '@angular/core';
import {PacientAlergie} from "../../models/PacientAlergie";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-alergie',
  templateUrl: './alergie.component.html',
  styleUrls: ['./alergie.component.css']
})
export class AlergieComponent {

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
}

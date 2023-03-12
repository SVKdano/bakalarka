import {Component, OnInit} from '@angular/core';
import {PacientLieky} from "../../models/PacientLieky";
import {PacientService} from "../../services/pacient.service";

@Component({
  selector: 'app-lieky-page',
  templateUrl: './lieky-page.component.html',
  styleUrls: ['./lieky-page.component.css']
})
export class LiekyPageComponent implements OnInit {

  lieky:PacientLieky[] = [];

  constructor(private pacientService:PacientService ) {}

  ngOnInit() {
    this.pacientService.getPacientLieky("0003015078").subscribe(
      (result:PacientLieky[]) => {
        (this.lieky = result);
        console.log(this.lieky);
      }
    );
  }

}

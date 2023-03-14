import {Component, OnInit} from '@angular/core';
import {PacientLieky} from "../../models/PacientLieky";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lieky-page',
  templateUrl: './lieky-page.component.html',
  styleUrls: ['./lieky-page.component.css']
})
export class LiekyPageComponent implements OnInit {

  lieky:PacientLieky[] = [];

  constructor(private pacientService:PacientService, private route:ActivatedRoute ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientLieky(id!).subscribe(
      (result:PacientLieky[]) => {
        (this.lieky = result);
        console.log(this.lieky);
      }
    );
  }

}

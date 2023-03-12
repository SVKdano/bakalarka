import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {PacientOchorenie} from "../../models/PacientOchorenie";

@Component({
  selector: 'app-ochorenia-page',
  templateUrl: './ochorenia-page.component.html',
  styleUrls: ['./ochorenia-page.component.css']
})
export class OchoreniaPageComponent implements OnInit {

  ochorenia:PacientOchorenie[] = [];

  constructor(private pacientService:PacientService) {}

  ngOnInit() {
    this.pacientService.getPacientOchorenia("0003015078").subscribe(
      (result:PacientOchorenie[]) => {
        (this.ochorenia = result);
        console.log(this.ochorenia);
      }
    );
  }

}

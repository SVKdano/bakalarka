import {Component, OnInit} from '@angular/core';
import {PacientService} from "../../services/pacient.service";
import {PacientOchorenie} from "../../models/PacientOchorenie";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ochorenia-page',
  templateUrl: './ochorenia-page.component.html',
  styleUrls: ['./ochorenia-page.component.css']
})
export class OchoreniaPageComponent implements OnInit {

  ochorenia:PacientOchorenie[] = [];

  constructor(private pacientService:PacientService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacientOchorenia(id!).subscribe(
      (result:PacientOchorenie[]) => {
        (this.ochorenia = result);
        console.log(this.ochorenia);
      }
    );
  }

}

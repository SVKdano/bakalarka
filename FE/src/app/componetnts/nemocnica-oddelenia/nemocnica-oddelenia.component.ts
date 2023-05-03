import {Component, OnInit} from '@angular/core';
import {Oddelenie} from "../../models/Oddelenie";
import {ActivatedRoute, Router} from "@angular/router";
import {NemocnicaService} from "../../services/nemocnica.service";

@Component({
  selector: 'app-nemocnica-oddelenia',
  templateUrl: './nemocnica-oddelenia.component.html',
  styleUrls: ['./nemocnica-oddelenia.component.css']
})
export class NemocnicaOddeleniaComponent implements OnInit {

  oddelenia: Oddelenie[] = [];

  constructor(private route:ActivatedRoute, private nemocnicaService:NemocnicaService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idnemocnice');
    this.nemocnicaService.getOddeleniaNemocnice(id!).subscribe(
      (result:Oddelenie[]) =>
      {
        this.oddelenia = result;
      }
    )
  }

}

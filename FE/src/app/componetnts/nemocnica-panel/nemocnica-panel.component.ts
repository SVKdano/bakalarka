import {Component, OnInit} from '@angular/core';
import {Nemocnica} from "../../models/Nemocnica";
import {ActivatedRoute, Router} from "@angular/router";
import {NemocnicaService} from "../../services/nemocnica.service";

@Component({
  selector: 'app-nemocnica-panel',
  templateUrl: './nemocnica-panel.component.html',
  styleUrls: ['./nemocnica-panel.component.css']
})
export class NemocnicaPanelComponent implements OnInit {

  nemocnica:Nemocnica = new Nemocnica();

  constructor(private route:ActivatedRoute, private nemocnicaService:NemocnicaService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idnemocnice');
    this.nemocnicaService.getUdajeNemocnice(id!).subscribe(
      (result:Nemocnica[]) =>
      {
        this.nemocnica = result[0];
        console.log(result)
      }
    )
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NemocnicaService} from "../../services/nemocnica.service";
import {Nemocnica} from "../../models/Nemocnica";

@Component({
  selector: 'app-nemocnica-profile',
  templateUrl: './nemocnica-profile.component.html',
  styleUrls: ['./nemocnica-profile.component.css']
})
export class NemocnicaProfileComponent implements OnInit {

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

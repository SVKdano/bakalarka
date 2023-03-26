import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PacientService} from "../../services/pacient.service";
import {Pacient} from "../../models/Pacient";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  menoPriezvisko:string = "";
  rodneCislo:string = "";

  constructor(private router: Router,private pacientService:PacientService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacient(id!).subscribe(
      (result:Pacient[]) => {
        this.menoPriezvisko = result.at(0)!.meno + " " +  result.at(0)!.priezvisko;
        this.rodneCislo = result.at(0)!.rodnecislo;
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DoktorService} from "../../services/doktor.service";
import {Doktor} from "../../models/Doktor";

@Component({
  selector: 'app-panel-doktor',
  templateUrl: './panel-doktor.component.html',
  styleUrls: ['./panel-doktor.component.css']
})
export class PanelDoktorComponent implements OnInit{

  menoPriezvisko:string = "";
  osobneCislo:string = "";

  constructor(private router: Router,private doktorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('osobnecislo');
    this.doktorService.getDoktori(id!).subscribe(
      (result:Doktor[]) => {
        this.menoPriezvisko = result.at(0)!.meno + " " +  result.at(0)!.priezvisko;
        this.osobneCislo = result.at(0)!.osobnecislo;
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}

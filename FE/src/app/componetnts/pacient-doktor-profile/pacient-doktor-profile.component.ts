import { Component } from '@angular/core';
import {Doktor} from "../../models/Doktor";
import {ActivatedRoute} from "@angular/router";
import {DoktorService} from "../../services/doktor.service";

@Component({
  selector: 'app-pacient-doktor-profile',
  templateUrl: './pacient-doktor-profile.component.html',
  styleUrls: ['./pacient-doktor-profile.component.css']
})
export class PacientDoktorProfileComponent {
  doktor:Doktor[] = [];

  constructor(private route:ActivatedRoute, private doktorService:DoktorService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("osobnecislo");
    this.doktorService.getDoktori(id!).subscribe(
      (result:Doktor[]) => {
        this.doktor = result;
        console.log(this.doktor);
      }
    )
  }
}

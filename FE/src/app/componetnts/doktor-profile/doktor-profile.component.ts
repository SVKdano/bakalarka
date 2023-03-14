import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DoktorService} from "../../services/doktor.service";
import {Doktor} from "../../models/Doktor";

@Component({
  selector: 'app-doktor-profile',
  templateUrl: './doktor-profile.component.html',
  styleUrls: ['./doktor-profile.component.css']
})
export class DoktorProfileComponent implements OnInit {

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

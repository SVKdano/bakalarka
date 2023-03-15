import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DoktorService} from "../../services/doktor.service";
import {DoktorPacient} from "../../models/DoktorPacient";

@Component({
  selector: 'app-doktor-pacienti',
  templateUrl: './doktor-pacienti.component.html',
  styleUrls: ['./doktor-pacienti.component.css']
})
export class DoktorPacientiComponent implements OnInit {

  pacienti:DoktorPacient[] = [];

  constructor(private doktorService:DoktorService, private route:ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('osobnecislo');
    this.doktorService.getPacientiDoktora(id!).subscribe(
      (result:DoktorPacient[]) => {
        this.pacienti = result;
        console.log(this.pacienti);
      }
    )
  }
}

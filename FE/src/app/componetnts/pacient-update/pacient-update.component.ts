import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Pacient} from "../../models/Pacient";
import {PacientService} from "../../services/pacient.service";
import {ActivatedRoute} from "@angular/router";
import {Mesto} from "../../models/Mesto";
import {LoginService} from "../../services/login.service";
import {PacientUpdate} from "../../UpdateModels/PacientUpdate";

@Component({
  selector: 'app-pacient-update',
  templateUrl: './pacient-update.component.html',
  styleUrls: ['./pacient-update.component.css']
})
export class PacientUpdateComponent implements OnInit {

  pacient: Pacient[] = [];
  pacientUpdate: PacientUpdate = new PacientUpdate();
  mesta: Mesto[] = [];

  @Output() update = new EventEmitter<Pacient[]>();

  constructor(private pacientService:PacientService, private httpLogin:LoginService,private route:ActivatedRoute) {}

  ngOnInit() : void {
    const id = this.route.snapshot.paramMap.get('rodnecislo');
    this.pacientService.getPacient(id!).subscribe(
      (result:Pacient[]) => {
        (this.pacient = result);
        this.pacient.forEach(a => this.pacientUpdate.rodnecislo = a.rodnecislo);
        this.pacient.forEach(a => this.pacientUpdate.meno = a.meno);
        this.pacient.forEach(a => this.pacientUpdate.priezvisko = a.priezvisko);
        this.pacient.forEach(a => this.pacientUpdate.ulica = a.ulica);
        this.pacient.forEach(a => this.pacientUpdate.idmesta = a.idmesta);
        this.pacient.forEach(a => this.pacientUpdate.email = a.email);
        this.pacient.forEach(a => this.pacientUpdate.heslo = a.heslo);
      }
    );

    this.httpLogin.mesta().subscribe(
      (result:Mesto[]) =>
      {
        this.mesta = result;
        console.log(this.mesta);
      }
    )
  }

  updatePacient() {
    this.pacientService.updatePacient(this.pacientUpdate).subscribe( {
      next:((result:Pacient[]) =>
      {
          this.update.emit(result);
          window.location.reload();
      }),
    })
  }

  setMesto(id:number) {
    this.pacientUpdate.idmesta = id;
  }

  log() : void {
    console.log(this.pacientUpdate);
  }
}

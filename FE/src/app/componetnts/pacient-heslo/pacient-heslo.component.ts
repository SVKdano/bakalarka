import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PacientUpdate} from "../../UpdateModels/PacientUpdate";
import {Pacient} from "../../models/Pacient";
import {PacientService} from "../../services/pacient.service";
import {LoginService} from "../../services/login.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pacient-heslo',
  templateUrl: './pacient-heslo.component.html',
  styleUrls: ['./pacient-heslo.component.css']
})
export class PacientHesloComponent implements OnInit {
  pacientUpdate: PacientUpdate = new PacientUpdate();
  pacient: Pacient[] = [];

  @Output() update = new EventEmitter<Pacient[]>();

  constructor(private pacientService: PacientService, private httpLogin: LoginService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('rodnecislo');

    this.pacientService.getPacient(id!).subscribe(
      (result: Pacient[]) => {
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
}

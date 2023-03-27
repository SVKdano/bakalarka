import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PacientUpdate} from "../../UpdateModels/PacientUpdate";
import {Pacient} from "../../models/Pacient";
import {PacientService} from "../../services/pacient.service";
import {LoginService} from "../../services/login.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HesloUpdate} from "../../UpdateModels/HesloUpdate";

@Component({
  selector: 'app-pacient-heslo',
  templateUrl: './pacient-heslo.component.html',
  styleUrls: ['./pacient-heslo.component.css']
})
export class PacientHesloComponent implements OnInit {
  pacientUpdate: PacientUpdate = new PacientUpdate();
  pacient: Pacient[] = [];

  hesloUpdate:HesloUpdate = new HesloUpdate();

  stareHeslo:string = "";
  noveHeslo:string = "";
  noveHesloZnova:string = "";

  @Output() update = new EventEmitter<Pacient[]>();

  constructor(private pacientService: PacientService, private httpLogin: LoginService, private route: ActivatedRoute) {
  }

  loginForm: FormGroup = new FormGroup({
    hesloStare: new FormControl(null, [Validators.required]),
    hesloNove: new FormControl(null, [Validators.required]),
    hesloNoveZnova: new FormControl(null, [Validators.required]),
  });

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

  matchingPasswords() : boolean {
    return this.noveHesloZnova == this.noveHeslo;
  }

  log() {
    console.log(this.stareHeslo + " " + this.noveHeslo + " " + this.noveHesloZnova);
  }

  updateHeslo() {

    if (!this.matchingPasswords()) {
      alert("Nové heslá sa nezhodujú!");
      return;
    }

    const id = this.route.snapshot.paramMap.get('rodnecislo');

    this.hesloUpdate.rodnecislo = id!;
    this.hesloUpdate.stareheslo = this.stareHeslo;
    this.hesloUpdate.noveheslo = this.noveHeslo;

    this.pacientService.updateHeslo(this.hesloUpdate).subscribe( {
      next:((result:Pacient[]) =>
      {
        this.update.emit(result);
        window.location.reload();
      }),
      error:(err =>
      {
        alert(err.error.message);
      })
    });
  }
}

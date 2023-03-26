import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Pacient} from "../../models/Pacient";
import {Poistovna} from "../../models/Poistovna";
import {Mesto} from "../../models/Mesto";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private httpLogin:LoginService) {}

  user:Pacient = new Pacient();
  poistovne:Poistovna[] = [];
  mesta:Mesto[] = [];

  @Output() createUser = new EventEmitter<Pacient[]>();

  loginForm: FormGroup = new FormGroup({
    rodneCislo: new FormControl(null, [Validators.required ,/*Validators.pattern("[0-9]+"),*/
      Validators.minLength(9), Validators.maxLength(10)]),
    meno: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-zÀ-ȕ ]+")]),
    priezvisko: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-zÀ-ȕ ]+")]),
    poistovna: new FormControl(null, [Validators.required]),
    ulica: new FormControl(null, [Validators.pattern("[A-Za-zÀ-ȕ 1-9]+")]),
    bydlisko: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
    this.httpLogin.poistovne().subscribe(
      (result:Poistovna[]) =>
      {
        this.poistovne = result;
      }
    )

    this.httpLogin.mesta().subscribe(
      (result:Mesto[]) =>
      {
        this.mesta = result;
      }
    )
  }

  log() {
    console.log(this.user);
  }

  register() {
    this.httpLogin.registraciaPacient(this.user).subscribe(
      {
        next:((result:Pacient[]) =>
        {
          this.createUser.emit(result);
          this.router.navigate(["/"]);
        }),
        error:(err => {
          alert(err.error.message);
        })
      }
    );
  }

  setPoistovnaId(id:number) {
    this.user.idpoistovne = id;
  }

  setMestoId(id:number) {
    this.user.idmesta = id;
  }
}

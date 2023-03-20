import {Component, OnInit} from '@angular/core';
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

  loginForm: FormGroup = new FormGroup({
    rodneCislo: new FormControl(null, [Validators.required ,Validators.pattern("[0-9]+"),
      Validators.minLength(10), Validators.maxLength(10)]),
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
        console.log(this.mesta);
      }
    )
  }

  setPoistovnaId(id:number) {
    this.user.idpoistovne = id;
    console.log(this.user);
  }

  setMestoId(id:number) {
    this.user.idmesta = id;
    console.log(this.user);
  }
}

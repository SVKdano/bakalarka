import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {Doktor} from "../../models/Doktor";

@Component({
  selector: 'app-doktor-welcome',
  templateUrl: './doktor-welcome.component.html',
  styleUrls: ['./doktor-welcome.component.css']
})
export class DoktorWelcomeComponent {
  user = new User();

  constructor(private router: Router, private httpLogin:LoginService) {}

  loginForm: FormGroup = new FormGroup({
    rodneCislo: new FormControl(null, [Validators.required,]),
    password: new FormControl(null, [Validators.required]),
  });

  login(user: User) {

    if(!this.loginForm.valid) {
      return;
    }

    this.httpLogin.loginDoktor(user).subscribe(
      {
        next:((dok:Doktor) => {
          localStorage.setItem("loggedUser", String(dok));
          this.router.navigate(['/doktor', this.httpLogin.loggedUserOsobneCislo()]);
        }),
        error:(_ => {
        alert("Zlé prihlasovacie údaje");
        })
      }
    )
  }
}

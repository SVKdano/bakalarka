import { Component } from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Nemocnica} from "../../models/Nemocnica";

@Component({
  selector: 'app-nemocnica-welcome',
  templateUrl: './nemocnica-welcome.component.html',
  styleUrls: ['./nemocnica-welcome.component.css']
})
export class NemocnicaWelcomeComponent {
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

    this.httpLogin.loginNemocnica(user).subscribe(
      {
        next:((nemocnica:Nemocnica) => {
          localStorage.setItem("loggedUser", String(nemocnica));
          if (this.httpLogin.loggedUserRole() == "admin")
          {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/nemocnica', this.httpLogin.loggedUserNemocnicaId()]);
          }
        }),
        error:(_ => {
          alert("Zlé prihlasovacie údaje");
        })
      }
    )
  }
}

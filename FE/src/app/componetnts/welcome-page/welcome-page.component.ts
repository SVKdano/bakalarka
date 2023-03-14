import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {User} from "../../models/User";
import {Pacient} from "../../models/Pacient";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  user = new User();
  pacient:Pacient = new Pacient();

  constructor(private router: Router, private httpLogin:LoginService) {}

  loginForm: FormGroup = new FormGroup({
    rodneCislo: new FormControl(null, [Validators.required, Validators.pattern("[0-9]+")]),
    password: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
  }

  login(user: User) {

    if(!this.loginForm.valid) {
      return;
    }

    this.httpLogin.login(user).subscribe({
      next:((pac:Pacient) => {
        localStorage.setItem("loggedUser", String(pac));
        this.router.navigate(['/pacient', this.httpLogin.loggedUserRodneCislo()]);
      }),
      error:(a => {
        alert("Zlé prihlasovacie údaje");
      })
      }
    )

  }
}

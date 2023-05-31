import { Component } from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-nemocnica-reset-hesla',
  templateUrl: './nemocnica-reset-hesla.component.html',
  styleUrls: ['./nemocnica-reset-hesla.component.css']
})
export class NemocnicaResetHeslaComponent {
  user: User = new User();

  constructor(private router: Router, private httpLogin:LoginService) {}

  loginForm: FormGroup = new FormGroup({
    rodneCislo: new FormControl(null, [Validators.required, Validators.pattern("[0-9]+")]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  ngOnInit() {
  }

  resetHesla() {
    this.httpLogin.resetHeslaPacient(this.user).subscribe(
      {
        next:((result:any) => {
          alert("Skontrolujte si emailovu schránku");
          this.router.navigate(["/"]);
        }),
        error:(a => {
          alert("Nesprávny email alebo rodé číslo!");
        })
      }
    )

  }
}

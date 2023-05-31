import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {Pacient} from "../../models/Pacient";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pacient-reset-hesla',
  templateUrl: './pacient-reset-hesla.component.html',
  styleUrls: ['./pacient-reset-hesla.component.css']
})
export class PacientResetHeslaComponent implements OnInit {
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

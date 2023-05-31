import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../services/admin.service";
import {Pacient} from "../../models/Pacient";
import {Poistovna} from "../../models/Poistovna";
import {Mesto} from "../../models/Mesto";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-nova-nemocnica',
  templateUrl: './admin-nova-nemocnica.component.html',
  styleUrls: ['./admin-nova-nemocnica.component.css']
})
export class AdminNovaNemocnicaComponent {
  user:Pacient = new Pacient();
  mesta:Mesto[] = [];

  loginForm: FormGroup = new FormGroup({
    idNemocnice: new FormControl(null, [Validators.required]),
    meno: new FormControl(null, [Validators.required]),
    ulica: new FormControl(null, [Validators.pattern("[A-Za-zÀ-ȕ 0-9]+")]),
    mesto: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  constructor(private route:ActivatedRoute, private adminService:AdminService, private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  setMestoId(id:number) {
    this.user.idmesta = id;
  }
}

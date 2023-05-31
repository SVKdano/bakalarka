import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-zmena-hesla-doktor',
  templateUrl: './zmena-hesla-doktor.component.html',
  styleUrls: ['./zmena-hesla-doktor.component.css']
})
export class ZmenaHeslaDoktorComponent {

  stareHeslo:string = "";
  noveHeslo:string = "";
  noveHesloZnova:string = "";

  loginForm: FormGroup = new FormGroup({
    hesloStare: new FormControl(null, [Validators.required]),
    hesloNove: new FormControl(null, [Validators.required]),
    hesloNoveZnova: new FormControl(null, [Validators.required]),
  });
}

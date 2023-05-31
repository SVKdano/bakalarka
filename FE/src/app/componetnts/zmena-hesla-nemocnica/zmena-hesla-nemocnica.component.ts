import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-zmena-hesla-nemocnica',
  templateUrl: './zmena-hesla-nemocnica.component.html',
  styleUrls: ['./zmena-hesla-nemocnica.component.css']
})
export class ZmenaHeslaNemocnicaComponent {

  stareHeslo:string = "";
  noveHeslo:string = "";
  noveHesloZnova:string = "";

  loginForm: FormGroup = new FormGroup({
    hesloStare: new FormControl(null, [Validators.required]),
    hesloNove: new FormControl(null, [Validators.required]),
    hesloNoveZnova: new FormControl(null, [Validators.required]),
  });
}

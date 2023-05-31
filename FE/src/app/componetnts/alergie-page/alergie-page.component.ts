import { Component } from '@angular/core';

@Component({
  selector: 'app-alergie-page',
  templateUrl: './alergie-page.component.html',
  styleUrls: ['./alergie-page.component.css']
})
export class AlergiePageComponent {


  printPage() {
    window.print();
  }
}

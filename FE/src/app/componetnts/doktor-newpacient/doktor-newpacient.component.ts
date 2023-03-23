import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DoktorPacient} from "../../models/DoktorPacient";
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Pacient} from "../../models/Pacient";
import {DoktorPacientUpdate} from "../../UpdateModels/DoktorPacientUpdate";

@Component({
  selector: 'app-doktor-newpacient',
  templateUrl: './doktor-newpacient.component.html',
  styleUrls: ['./doktor-newpacient.component.css']
})
export class DoktorNewpacientComponent implements OnInit {
  possiblePacients: Pacient[] = [];
  doctorPacients: DoktorPacient[] = [];
  docPacients: Pacient[] = [];
  filteredPacients: Pacient[] = [];

  menoFilter: string = "";
  priezviskoFilter: string = "";

  pacientiFiltered:Pacient[] = [];

  @Output() update = new EventEmitter<DoktorPacient[]>();

  pacToBeAdded:DoktorPacientUpdate = { rodnecislo:"", osobnecislo:"",datumod:"2000-01-01" };

  constructor(private doktorService:DoktorService, private route:ActivatedRoute,private router:Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('osobnecislo');

    this.pacToBeAdded.osobnecislo = id!;

    this.doktorService.getAllPacients().subscribe(
      (result:Pacient[]) =>
      {
        this.possiblePacients = result;
        this.doktorService.getPacientiDoktora(id!).subscribe(
          (result:DoktorPacient[]) =>
          {
            this.doctorPacients= result;
            this.doctorPacients.forEach(a =>
            {
              if (a.rodnecisloNavigation != null)
              {
                this.docPacients.push(a.rodnecisloNavigation);
              }
            });
            this.filteredPacients = this.possiblePacients
              .filter(item => !this.docPacients.some(removed => removed.rodnecislo === item.rodnecislo));
            this.pacientiFiltered = this.filteredPacients;
          }
        )
      });
  }

  addPacient(rodneCislo:string) {
    this.pacToBeAdded.rodnecislo = rodneCislo;

    const id = this.route.snapshot.paramMap.get('osobnecislo');

    this.doktorService.addPacient(this.pacToBeAdded).subscribe(
      (result:DoktorPacient[]) =>
      {
        this.update.emit(result);
        this.router.navigate(["/doktor",id,"pacienti"])
      }
    );
  }

  setRC(rodneCislo:string) {
    this.pacToBeAdded.rodnecislo = rodneCislo;
  }

  filter() {
    this.pacientiFiltered = [];

    this.filteredPacients.forEach(a => {
      if (a.meno.toLowerCase().includes(this.menoFilter.toLowerCase()))
      {
        if (a.priezvisko.toLowerCase().includes(this.priezviskoFilter.toLowerCase()))
        {
          this.pacientiFiltered.push(a);
        }
      }
    });
  }

  reset() {
    this.pacientiFiltered = this.filteredPacients;
  }
}

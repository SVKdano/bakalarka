import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Pacient} from "../../models/Pacient";
import {DoktorService} from "../../services/doktor.service";
import {ActivatedRoute} from "@angular/router";
import {PacientService} from "../../services/pacient.service";
import {Zaznam} from "../../models/Zaznam";
import {VysetrenieZaznam} from "../../models/VysetrenieZaznam";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";
import {ZaznamUpdate} from "../../UpdateModels/ZaznamUpdate";
import {Vysetrenie} from "../../models/Vysetrenie";
import {VysetrenieZaznamUpdate} from "../../UpdateModels/VysetrenieZaznamUpdate";

@Component({
  selector: 'app-doktor-pacient-zaznamy-pridaj',
  templateUrl: './doktor-pacient-zaznamy-pridaj.component.html',
  styleUrls: ['./doktor-pacient-zaznamy-pridaj.component.css']
})
export class DoktorPacientZaznamyPridajComponent implements OnInit {

  osobneCislo:string = "";
  rodneCislo:string = "";

  pacient: Pacient = new Pacient();

  zaznam:Zaznam[] = [];
  vysetrenie:VysetrenieZaznam[] = [];

  vysetrenia:Vysetrenie[] = [];

  nazovVystrenia:string = "";

  zaznamUpdated:ZaznamUpdate = new ZaznamUpdate();
  vysetrenieAdded:VysetrenieZaznamUpdate = new VysetrenieZaznamUpdate();

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(private doctorService:DoktorService, private route:ActivatedRoute,
              private pacientService:PacientService, private _ngZone: NgZone) {}

  ngOnInit() {
    this.osobneCislo = this.route.snapshot.paramMap.get('osobnecislo')!;
    this.rodneCislo = this.route.snapshot.paramMap.get('rodnecislo')!;

    this.pacientService.getPacient(this.rodneCislo).subscribe(
      (result:Pacient[]) => {
        (this.pacient = result.at(0)!);
      }
    );

    const id = Number(this.route.snapshot.paramMap.get('idzaznam'));
    this.pacientService.getVysetreniaVZazname(id).subscribe(
      (result:VysetrenieZaznam[]) =>
      {
        this.vysetrenie = result;
      }
    );

    this.pacientService.getZaznam(id).subscribe(
      (result:Zaznam[]) =>
      {
        this.zaznam = result;
        this.zaznamUpdated.datum = result.at(0)!.datum.toString();
        this.vysetrenieAdded.datum = result.at(0)!.datum.toString();
        this.zaznamUpdated.cas = String(result.at(0)!.cas);
        this.zaznamUpdated.dovodnavstevy = result.at(0)!.dovodnavstevy;
        this.zaznamUpdated.doplnujuceinformacie = result.at(0)!.doplnujuceinformacie;
        this.zaznamUpdated.zaver = result.at(0)!.zaver;
      }
    );

    this.doctorService.getAllVysetrenia().subscribe(
      (result:Vysetrenie[]) => {
        this.vysetrenia = result;
      }
    );

  }

  update() {
    this.zaznamUpdated.rodnecislo = this.rodneCislo;
    this.zaznamUpdated.osobnecislo = this.osobneCislo;
    this.zaznamUpdated.idzaznam = Number(this.route.snapshot.paramMap.get('idzaznam')!);

    const id = Number(this.route.snapshot.paramMap.get('idzaznam'));

    this.doctorService.updateZaznam(this.zaznamUpdated).subscribe( () => {
        this.pacientService.getZaznam(id).subscribe(
          (result: Zaznam[]) => {
            this.zaznam = result;
            this.zaznamUpdated.datum = result.at(0)!.datum.toString();
            this.zaznamUpdated.cas = String(result.at(0)!.cas);
          }
        );
      }
    )
  }

  add() {
    this.vysetrenieAdded.idzaznam = Number(this.route.snapshot.paramMap.get('idzaznam')!);
    const id = Number(this.route.snapshot.paramMap.get('idzaznam'));

    this.doctorService.pridajVysetrenieKZaznamu(this.vysetrenieAdded).subscribe(
      (result:VysetrenieZaznam[]) => {
        this.pacientService.getVysetreniaVZazname(id).subscribe(
          (result:VysetrenieZaznam[]) =>
          {
            this.vysetrenie = result;
          }
        );
      })
  }

  upravRC(string:String) : string {
    var vysledny:string = string.substring(0,6);
    vysledny = vysledny.concat("/");
    vysledny = vysledny.concat(string.substring(6));

    return vysledny;
  }

  setKod(vysetrenie:Vysetrenie) {
    this.vysetrenieAdded.kod = vysetrenie.kod;
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
}

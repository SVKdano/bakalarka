import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pacient} from "../models/Pacient";
import {environment} from "../../environments/environmenst";
import {Observable} from "rxjs";
import {PacientAlergie} from "../models/PacientAlergie";
import {PacientOchorenie} from "../models/PacientOchorenie";
import {PacientLieky} from "../models/PacientLieky";
import {PacientDoktori} from "../models/PacientDoktori";
import {Zaznam} from "../models/Zaznam";
import {VysetrenieZaznam} from "../models/VysetrenieZaznam";
import {OdporucaciListok} from "../models/OdporucaciListok";
import {PacientUpdate} from "../UpdateModels/PacientUpdate";
import {HesloUpdate} from "../UpdateModels/HesloUpdate";

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  constructor(private http:HttpClient) { }

  public getPacient(rodneCislo: string) : Observable<Pacient[]>{
    return this.http.get<Pacient[]>(`${environment.apiUrl}/pacient/${rodneCislo}`);
  }

  public getPacientAlergie(rodneCislo:string) : Observable<PacientAlergie[]> {
    return this.http.get<PacientAlergie[]>(`${environment.apiUrl}/alergie/${rodneCislo}`);
  }

  public getPacientOchorenia(rodneCislo:string) : Observable<PacientOchorenie[]> {
    return this.http.get<PacientOchorenie[]>(`${environment.apiUrl}/ochorenia/${rodneCislo}`);
  }

  public getPacientLieky(rodneCislo: string) : Observable<PacientLieky[]> {
    return this.http.get<PacientLieky[]>(`${environment.apiUrl}/lieky/${rodneCislo}`);
  }

  public getPacientDoktori(rodneCislo: string) : Observable<PacientDoktori[]> {
    return this.http.get<PacientDoktori[]>(`${environment.apiUrl}/doktori/${rodneCislo}`);
  }

  public getPacientZaznamy(rodneCislo:string) : Observable<Zaznam[]> {
    return this.http.get<Zaznam[]>(`${environment.apiUrl}/zaznamy/${rodneCislo}`);
  }

  public getVysetreniaVZazname(idZaznam: number) : Observable<VysetrenieZaznam[]> {
    return this.http.get<VysetrenieZaznam[]>(`${environment.apiUrl}/vysetreniaVZazname/${idZaznam}`);
  }

  public getZaznam(idZaznam: number) : Observable<Zaznam[]> {
    return this.http.get<Zaznam[]>(`${environment.apiUrl}/zaznam/${idZaznam}`);
  }

  public getPacientListky(rodneCislo: string) : Observable<OdporucaciListok[]> {
    return this.http.get<OdporucaciListok[]>(`${environment.apiUrl}/listkyv2/${rodneCislo}`);
  }

  public updatePacient(pacient: PacientUpdate) : Observable<Pacient[]> {
    return this.http.put<Pacient[]>(`${environment.apiUrl}/zmenaUdajov`, pacient);
  }

  public updateHeslo(hesloUpdate: HesloUpdate) : Observable<Pacient[]> {
    return this.http.put<Pacient[]>(`${environment.apiUrl}/zmenaHesla`,hesloUpdate);
  }

  public csvDownload(rodneCislo:string) {
    return this.http.get(`${environment.apiUrl}/csvDownloadAlergie/${rodneCislo}`, {observe:'response', responseType:'blob'});
  }

  public jsonDownload(rodneCislo:string) {
    return this.http.get(`${environment.apiUrl}/alergie/${rodneCislo}`, {observe:'response', responseType: 'blob'});
  }

  public ochoreniaCsvDownload(rodneCislo:string, datumod:string, datumdo:string, datumodneukoncene:string) {
    return this.http.get(`${environment.apiUrl}/ochoreniaCSV/${rodneCislo}/${datumod}/${datumdo}/${datumodneukoncene}`
      , {observe:'response', responseType: 'blob'});
  }

  public ochoreniaJsonDownload(rodneCislo:string, datumod:string, datumdo:string, datumodneukoncene:string) {
    return this.http.get(`${environment.apiUrl}/ochoreniaJson/${rodneCislo}/${datumod}/${datumdo}/${datumodneukoncene}`
      , {observe:'response', responseType: 'blob'});
  }

  public liekyCsvDownload(rodneCislo:string, datumod:string, datumdo:string, datumodneukoncene:string) {
    return this.http.get(`${environment.apiUrl}/liekyCSV/${rodneCislo}/${datumod}/${datumdo}/${datumodneukoncene}`
      , {observe:'response', responseType: 'blob'});
  }

  public liekyJsonDownload(rodneCislo:string, datumod:string, datumdo:string, datumodneukoncene:string) {
    return this.http.get(`${environment.apiUrl}/liekyJson/${rodneCislo}/${datumod}/${datumdo}/${datumodneukoncene}`
      , {observe:'response', responseType: 'blob'});
  }

  public listkyCsvDownload(rodneCislo:string, datumod:string, datumdo:string) {
    return this.http.get(`${environment.apiUrl}/listkyCsv/${rodneCislo}/${datumod}/${datumdo}`
      , {observe:'response', responseType: 'blob'});
  }

  public listkyJsonDownload(rodneCislo:string, datumod:string, datumdo:string) {
    return this.http.get(`${environment.apiUrl}/listkyJson/${rodneCislo}/${datumod}/${datumdo}`
      , {observe:'response', responseType: 'blob'});
  }

  public doktoriCsvDownload(rodneCislo:string) {
    return this.http.get(`${environment.apiUrl}/doktoriCsv/${rodneCislo}`
      , {observe:'response', responseType: 'blob'});
  }

  public doktoriJsonDownload(rodneCislo:string) {
    return this.http.get(`${environment.apiUrl}/doktori/${rodneCislo}`
      , {observe:'response', responseType: 'blob'});
  }

  public zaznamCsvDownload(idZaznam:string) {
    return this.http.get(`${environment.apiUrl}/zaznamCsv/${idZaznam}`
      , {observe:'response', responseType: 'blob'});
  }

  public zaznamJsonDownload(idZaznam:string) {
    return this.http.get(`${environment.apiUrl}/zaznamJson/${idZaznam}`
      , {observe:'response', responseType: 'blob'});
  }
}

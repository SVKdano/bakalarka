import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environmenst";
import {Nemocnica} from "../models/Nemocnica";
import {Doktor} from "../models/Doktor";
import {Oddelenie} from "../models/Oddelenie";
import {DoktorPacient} from "../models/DoktorPacient";
import {OddelenieUpdate} from "../UpdateModels/OddelenieUpdate";

@Injectable({
  providedIn: 'root'
})
export class NemocnicaService {

  constructor(private http:HttpClient) {}

  public getUdajeNemocnice(idNemocnice:string) : Observable<Nemocnica[]> {
    return this.http.get<Nemocnica[]>(`${environment.apiUrl}/udajeNemocnice/${idNemocnice}`);
  }

  public getDoktoriVNemocnici(idNemocnice:string) : Observable<Doktor[]> {
    return this.http.get<Doktor[]>(`${environment.apiUrl}/doktoriVNemocnici/${idNemocnice}`);
  }

  public getOddeleniaNemocnice(idNemocnice:string) : Observable<Oddelenie[]> {
    return this.http.get<Oddelenie[]>(`${environment.apiUrl}/oddeleniaNemocnice/${idNemocnice}`);
  }

  public addOddelenie(oddelenie: OddelenieUpdate) : Observable<Oddelenie[]> {
    return this.http.post<Oddelenie[]>(`${environment.apiUrl}/pridajOddelenie`, oddelenie);
  }
}

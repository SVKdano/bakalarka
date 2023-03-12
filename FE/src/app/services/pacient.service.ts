import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pacient} from "../models/Pacient";
import {environment} from "../../environments/environmenst";
import {Observable} from "rxjs";
import {PacientAlergie} from "../models/PacientAlergie";

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
}

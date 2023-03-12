import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pacient} from "../models/Pacient";
import {environment} from "../../environments/environmenst";
import {Observable} from "rxjs";
import {PacientAlergie} from "../models/PacientAlergie";
import {PacientOchorenie} from "../models/PacientOchorenie";
import {PacientLieky} from "../models/PacientLieky";
import {PacientDoktori} from "../models/PacientDoktori";

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
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Oddelenie} from "../models/Oddelenie";
import {environment} from "../../environments/environmenst";
import {Doktor} from "../models/Doktor";
import {Alergie} from "../models/Alergie";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http:HttpClient) { }

  //---------------GET METHODS--------------------
  public getOddeleniaForShare() : Observable<Oddelenie[]> {
    return this.http.get<Oddelenie[]>(`${environment.apiUrl}/allOddeleniaForShare`);
  }

  public getDoktoriForShare() : Observable<Doktor[]> {
    return this.http.get<Doktor[]>(`${environment.apiUrl}/allDoktoriForShare`);
  }

  //------------SHARE METHODS--------------------
  public shareAlergie(zdielajuci:string, cielovy:string, rodnecislo:string, datumdo:string) : Observable<Alergie[]> {
    return this.http.get<Alergie[]>
    (`${environment.apiUrl}/alergieZdielanie/${zdielajuci}/${cielovy}/${rodnecislo}/${datumdo}`);
  }
}

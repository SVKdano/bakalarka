import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Oddelenie} from "../models/Oddelenie";
import {environment} from "../../environments/environmenst";
import {Doktor} from "../models/Doktor";
import {Alergie} from "../models/Alergie";
import {Lieky} from "../models/Lieky";
import {LiekyZdielanie} from "../models/LiekyZdielanie";
import {Ochorenie} from "../models/Ochorenie";
import {PacientOchorenie} from "../models/PacientOchorenie";
import {Zaznam} from "../models/Zaznam";

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

  public shareLieky(zdielajuci:string, cielovy:string, rodnecislo:string, datumdo:string) : Observable<Lieky[]> {
    return this.http.get<Lieky[]>
    (`${environment.apiUrl}/liekyZdielanie/${zdielajuci}/${cielovy}/${rodnecislo}/${datumdo}`);
  }

  public shareOchorenia(zdielajuci:string, cielovy:string, rodnecislo:string, datumdo:string) : Observable<PacientOchorenie[]> {
    return this.http.get<PacientOchorenie[]>
    (`${environment.apiUrl}/ochoreniaZdielanie/${zdielajuci}/${cielovy}/${rodnecislo}/${datumdo}`);
  }

  public shareZaznam(zdielajuci:string, cielovy:string, idzaznamu:number, datumdo:string) : Observable<Zaznam[]> {
    return this.http.get<Zaznam[]>
    (`${environment.apiUrl}/zaznamZdielanie/${zdielajuci}/${cielovy}/${idzaznamu}/${datumdo}`);
  }
}

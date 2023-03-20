import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environmenst";
import {Doktor} from "../models/Doktor";
import {DoktorPacient} from "../models/DoktorPacient";

@Injectable({
  providedIn: 'root'
})
export class DoktorService {

  constructor(private http:HttpClient) { }

  public getDoktori(osobneCislo: string) : Observable<Doktor[]>{
    return this.http.get<Doktor[]>(`${environment.apiUrl}/doktor/${osobneCislo}`);
  }

  public getPacientiDoktora(osobneCislo: string) : Observable<DoktorPacient[]> {
    return this.http.get<DoktorPacient[]>(`${environment.apiUrl}/doktorPacienti/${osobneCislo}`);
  }
}
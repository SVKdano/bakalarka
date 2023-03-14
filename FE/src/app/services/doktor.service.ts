import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environmenst";
import {Doktor} from "../models/Doktor";

@Injectable({
  providedIn: 'root'
})
export class DoktorService {

  constructor(private http:HttpClient) { }

  public getDoktori(osobneCislo: string) : Observable<Doktor[]>{
    return this.http.get<Doktor[]>(`${environment.apiUrl}/doktor/${osobneCislo}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Oddelenie} from "../models/Oddelenie";
import {environment} from "../../environments/environmenst";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http:HttpClient) { }

  //---------------GET METHODS--------------------
  public getOddeleniaForShare() : Observable<Oddelenie[]> {
    return this.http.get<Oddelenie[]>(`${environment.apiUrl}/allOddeleniaForShare`);
  }
}

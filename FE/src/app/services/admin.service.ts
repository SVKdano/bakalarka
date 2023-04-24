import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Nemocnica} from "../models/Nemocnica";
import {environment} from "../../environments/environmenst";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) {}

  public getNemocnice() : Observable<Nemocnica[]> {
    return this.http.get<Nemocnica[]>(`${environment.apiUrl}/nemocniceSUdajmi/`);
  }
}

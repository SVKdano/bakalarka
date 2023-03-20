import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";
import {environment} from "../../environments/environmenst";
import {Poistovna} from "../models/Poistovna";
import {Mesto} from "../models/Mesto";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}

  public login(user:User) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, user, {responseType: "text"});
  }

  public loginDoktor(user:User) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/loginDoktor`, user, {responseType: "text"});
  }

  public poistovne() : Observable<Poistovna[]> {
    return this.http.get<Poistovna[]>(`${environment.apiUrl}/allPoistovne`);
  }

  public mesta() : Observable<Mesto[]> {
    return this.http.get<Mesto[]>(`${environment.apiUrl}/allMesta`);
  }

  public loggedUserOsobneCislo() : any {
    const user = JSON.parse(localStorage.getItem("loggedUser")!);
    return user.osobnecislo;
  }

  public loggedUserRole() : any {
    const user = JSON.parse(localStorage.getItem("loggedUser")!);
    return user.rola;
  }

  public loggedUserRodneCislo() : any {
    const user = JSON.parse(localStorage.getItem("loggedUser")!);
    return user.rodnecislo;
  }
}
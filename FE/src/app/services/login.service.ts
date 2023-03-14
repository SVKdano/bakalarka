import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";
import {environment} from "../../environments/environmenst";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}

  public login(user:User) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, user, {responseType: "text"});
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

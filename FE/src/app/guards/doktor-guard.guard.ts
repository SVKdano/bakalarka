import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class DoktorGuardGuard implements CanActivate {
  constructor(private loginService:LoginService, private routeRC:ActivatedRoute, private router:Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.params['osobnecislo'];

    if (id != this.loginService.loggedUserDoktorOC()) {
      localStorage.clear();
      this.router.navigate(["/"]);
      return false;
    } else {
      return true;
    }

  }

}

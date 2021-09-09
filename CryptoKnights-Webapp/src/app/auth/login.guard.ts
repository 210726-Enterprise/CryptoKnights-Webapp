import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginGuardService } from './login-guard.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate 
{
  constructor(private loginService: LoginGuardService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      const url: string = state.url;
      return this.checkLogin(url);
    }
  
    checkLogin(url: string): true|UrlTree {
      if (this.loginService.isLoggedIn) { return true; }
      this.loginService.redirectUrl = url;
      return this.router.parseUrl('');
    }
}

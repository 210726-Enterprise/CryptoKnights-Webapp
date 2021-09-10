import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService 
{
  private usersURL = "http://cryptoknight2-env.eba-3uzzfaem.us-east-2.elasticbeanstalk.com/users"

  httpOptions = 
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  isLoggedIn = false;
  currUser: User | undefined;
  redirectUrl: string | null = "/test";

  constructor(private http: HttpClient, public router: Router) { };

  login(username: string, password: string)
  {
    const usernameURL:string = this.usersURL + username;
    console.log(usernameURL);

    this.http.get<User>(usernameURL,this.httpOptions)
      .subscribe(foundUser => 
        {
          console.log(foundUser);

          if(foundUser && foundUser.password === password)
          {
            console.log("hi");
            this.currUser = foundUser;

            this.isLoggedIn = true;
            const navigationExtras: NavigationExtras = 
            {
              queryParamsHandling: 'preserve',
              preserveFragment: true
            };
            this.router.navigate([this.redirectUrl], navigationExtras);
          }
        });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currUser = undefined;
    this.router.navigate(['']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginGuardService } from '../auth/login-guard.service';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;
  private observeUser: Subscription;

  constructor(private loginService: LoginGuardService) { }

  ngOnInit(): void {
    this.loginService.isLoggedIn ? this.loggedIn = true : this.loggedIn = false;
    //   this.currUser = this.loginService.getCurrentUser();
    //   this.currUser = this.loginService.getUpdate().subscribe(message => this.currUser = message)
  }

  logout() {
      this.loginService.logout()
  }

}
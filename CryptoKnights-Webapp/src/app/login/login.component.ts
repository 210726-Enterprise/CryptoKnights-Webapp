import { Component, OnInit } from '@angular/core';

import { LoginGuardService } from '../auth/login-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginGuardService: LoginGuardService) { }

  ngOnInit(): void {
  }

  login(username: string, password: string)
  {
    this.loginGuardService.login(username, password);
  }
}

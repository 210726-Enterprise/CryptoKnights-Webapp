import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoginGuardService } from '../auth/login-guard.service';

import { CreatePortfolioService } from '../create-portfolio.service';
import { Portfolio } from '../portfolio';

@Component({
  selector: 'app-new-portfolio',
  templateUrl: './new-portfolio.component.html',
  styleUrls: ['./new-portfolio.component.css']
})
export class NewPortfolioComponent implements OnInit {

  constructor(private createPortfolioService : CreatePortfolioService, private loginGuard: LoginGuardService, public router: Router) { }

  ngOnInit(): void {
  }

  redirectUrl: string | null = "/user";

  add(porfolio_name: string): void 
  {
    porfolio_name = porfolio_name.trim();
    if (!porfolio_name) 
    { 
      return; 
    }
    const users = [];
    users.push(this.loginGuard.currUser?.userId);
    this.createPortfolioService.addPortfolio({ porfolio_name, users } as unknown as Portfolio)
      .subscribe(portfolio => 
        {
          console.log(portfolio);

          const navigationExtras: NavigationExtras = 
            {
              queryParamsHandling: 'preserve',
              preserveFragment: true
            };
          this.router.navigate([this.redirectUrl], navigationExtras);
        });
  }
}

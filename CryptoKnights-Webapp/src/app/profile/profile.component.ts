import { Component, OnInit } from '@angular/core';
import { LoginGuardService } from '../auth/login-guard.service';
import { Portfolio } from '../portfolio';
import { PortfolioService } from '../portfolio.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private pService: PortfolioService, private loginService: LoginGuardService) { }

  ngOnInit(): void {

    this.user = this.loginService.getCurrentUser();
    const userPortfolioIds: number[] = [];

    for(let port of this.user.portfolios) {
      userPortfolioIds.push(port.portfolioId)
      // this.pService.getPortfolio(port).subscribe(data => this.portfolios.push(data))
    }

    console.log(userPortfolioIds)

    this.pService.getAllPortfolio().subscribe(data => {
      this.portfolios = data.filter(p => {
        console.log(p.portfolioId)
        return this.user.portfolios.includes(p.portfolioId);
      })
    })
  }

  portfolios: Portfolio[] = [];
  user: any;

  

}

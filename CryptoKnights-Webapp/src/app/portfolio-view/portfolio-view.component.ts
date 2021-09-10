import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginGuardService } from '../auth/login-guard.service';
import { Portfolio } from '../portfolio';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.component.html',
  styleUrls: ['./portfolio-view.component.css']
})
export class PortfolioViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: PortfolioService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.portfolioId = params.id; 
    })
    this.service.getPortfolio(this.portfolioId).subscribe(data => this.portfolio = data);
  }

  portfolio: Portfolio;
  portfolioId: number;


}

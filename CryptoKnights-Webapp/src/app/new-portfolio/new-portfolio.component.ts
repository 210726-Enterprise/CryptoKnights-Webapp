import { Component, OnInit } from '@angular/core';

import { CreatePortfolioService } from '../create-portfolio.service';
import { Portfolio } from '../portfolio';

@Component({
  selector: 'app-new-portfolio',
  templateUrl: './new-portfolio.component.html',
  styleUrls: ['./new-portfolio.component.css']
})
export class NewPortfolioComponent implements OnInit {

  constructor(private createPortfolioService : CreatePortfolioService) { }

  ngOnInit(): void {
  }

  add(porfolio_name: string): void 
  {
    porfolio_name = porfolio_name.trim();
    if (!porfolio_name) 
    { 
      return; 
    }
    this.createPortfolioService.addPortfolio({ porfolio_name } as unknown as Portfolio)
      .subscribe(portfolio => {console.log(portfolio)});
  }
}

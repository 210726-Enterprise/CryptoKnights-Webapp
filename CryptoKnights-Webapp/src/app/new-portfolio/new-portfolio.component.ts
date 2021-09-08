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

  add(name: string): void 
  {
    name = name.trim();
    if (!name) 
    { 
      return; 
    }
    this.createPortfolioService.addPortfolio({ name } as Portfolio)
  }
}

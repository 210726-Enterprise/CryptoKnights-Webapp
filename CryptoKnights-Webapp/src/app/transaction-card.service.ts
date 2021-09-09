import { Injectable } from '@angular/core';
import { PortfolioDetailsService } from './portfolio-details.service';
import { Observable } from 'rxjs';
import { Portfolio } from './portfolio';

@Injectable({
  providedIn: 'root'
})
export class TransactionCardService {

  constructor(private pService: PortfolioDetailsService) { }

  getPortfolio(): Observable<Portfolio> {
    return this.pService.getPortfolios()
  }

  makeDeposit(portfolio: Portfolio, depositAmount: number) {
    
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Portfolio } from '../portfolio';
import { PortfolioDetailsService } from '../portfolio-details.service';
import { PortfolioService } from '../portfolio.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {

  portfolio: Portfolio;
  cryptoValues: any;
  totalValue: number;
  private observePortfolio: Subscription;

  constructor(private service: PortfolioService) { 
    this.observePortfolio = this.service.getUpdate().subscribe(message => this.portfolio = message)
   }

  ngOnInit(): void {
    this.service.getPortfolio().subscribe(data => this.portfolio = data);
    this.service.getCryptoValues().subscribe(data => this.cryptoValues = data)
    this.getTotalValue()
    console.log(this.cryptoValues)
  }

  getTotalValue() {
    this.totalValue = this.cryptoValues.bitcoin.usd + this.cryptoValues.ethereum.usd + this.cryptoValues.usd + this.portfolio.usd;
    console.log(this.totalValue)
  }

}

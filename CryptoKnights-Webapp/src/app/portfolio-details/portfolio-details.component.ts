import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Portfolio } from '../portfolio';
import { PortfolioService } from '../portfolio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {

  @Input() portfolio: Portfolio;
  cryptoValues: any;
  totalValue: number;
  private observePortfolio: Subscription;
  portfolioId: number;

  constructor(private service: PortfolioService, private route: ActivatedRoute) { 
    this.observePortfolio = this.service.getUpdate().subscribe(message => this.portfolio = message)
   }

  ngOnInit(): void {
    this.service.getCryptoValues().subscribe(data => this.cryptoValues = data)
    this.getTotalValue()
  }

  getTotalValue() {
    this.totalValue = 
        this.cryptoValues.bitcoin.usd * this.portfolio.bitcoin 
      + this.cryptoValues.ethereum.usd * this.portfolio.ethereum
      + this.cryptoValues.dogecoin * this.portfolio.dogecoin
      + this.portfolio.usd;
    console.log(this.totalValue)
  }

}

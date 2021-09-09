import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../portfolio';
import { PortfolioService } from '../portfolio.service';
import { TransactionCardService } from '../transaction-card.service';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.css']
})
export class TransactionCardComponent implements OnInit {

  constructor(private service: PortfolioService) { }

  ngOnInit(): void {
    this.service.getPortfolio().subscribe(data => this.portfolio = data);
  }

  portfolio: Portfolio;
  depositAmount: number = 0;
  inCurrency: string;
  outCurrency: string;
  inCurrencyAmount: number;
  outCurrencyAmount: number;

  makeDeposit(depositAmount: number) {
    this.portfolio.usd += depositAmount;
    this.service.updatePotfolio(this.portfolio).subscribe(data => this.portfolio = data);
    this.depositAmount = 0;

  }

  async setInCurrencyAmount() {
    const amount = await this.service.setInCurrencyAmount(this.inCurrency, this.outCurrency, this.outCurrencyAmount)
    this.inCurrencyAmount = amount;  
  }


  makeTrade() {
    console.log(this.inCurrency, this.inCurrencyAmount, this.outCurrency, this.outCurrencyAmount)
    this.portfolio[this.inCurrency] = this.portfolio[this.inCurrency] + this.inCurrencyAmount;
    this.portfolio[this.outCurrency] = this.portfolio[this.outCurrency] - this.outCurrencyAmount;
    console.log(this.portfolio);
    this.service.updatePotfolio(this.portfolio).subscribe(data => this.portfolio = data);
  }

}

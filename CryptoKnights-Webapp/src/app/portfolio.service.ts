import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Portfolio } from './portfolio';
import { Transaction } from './transaction';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {


  private portfolioState = new Subject<any>();
  private cryptoValues: any;

  constructor(private http: HttpClient) { }

  sendUpdate(portfolio: Portfolio) {
    this.portfolioState.next(portfolio);
  }

  getUserById(id: number) {
    // return this.http.get<User>(`http://cryptoknight2-env.eba-3uzzfaem.us-east-2.elasticbeanstalk.com/users/${id}`)
    return this.http.get<User>(`http://localhost:8080/api/users/${id}`)
  }

  getUpdate(): Observable<any> {
    return this.portfolioState.asObservable();
  }

  getPortfolio(id: Number): Observable<Portfolio> {
    // const url = `http://cryptoknight2-env.eba-3uzzfaem.us-east-2.elasticbeanstalk.com/portfolios/${id}`
    const url = `http://localhost:8080/api/portfolios/${id}`
    return this.http.get<Portfolio>(url);
  }

  getAllPortfolio(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>("http://localhost:8080/api/portfolios");
  }

  caclulatePortfolioValue() {
    this.getCryptoValues().subscribe(data => this.cryptoValues = data);
  }

  getCryptoValues() {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd";
    return this.http.get<any>(url);
  }

  async fetchCryptoValues() {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd";
    const res = await fetch(url).then((data) => data.json())
    return res;
  }

  async setInCurrencyAmount(inCurrency: string, outCurrency: string, outCurrencyAmount: number): Promise<number> {
    console.log(inCurrency, outCurrency)
    if (inCurrency === "usd") {
      const outUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${outCurrency}&vs_currencies=usd`
      const data = await fetch(outUrl).then((res) => res.json());
      return data[outCurrency].usd * outCurrencyAmount; 
  } else if (outCurrency === "usd") {
      const inUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${inCurrency}&vs_currencies=usd`
      const data = await fetch(inUrl).then((res) => res.json());
      return outCurrencyAmount / data[inCurrency].usd;
  } else {
      const outUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${outCurrency}&vs_currencies=usd`
      const inUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${inCurrency}&vs_currencies=usd`
      const selling = await fetch(outUrl).then((res) => res.json());
      const buying = await fetch(inUrl).then((res) => res.json());
      const inCurrencyValue = buying[inCurrency].usd;
      const buyingPower = selling[outCurrency].usd * outCurrencyAmount;
      return buyingPower / inCurrencyValue
  }
  }

  updatePotfolio(portfolio: Portfolio) {
    this.sendUpdate(portfolio)
    console.log(portfolio)
    return this.http.put<Portfolio>("http://localhost:8080/api/portfolios", portfolio)
  }


  logTransaction(inCurrency: string, inCurrencyAmount: number, outCurrency: string, outCurrencyAmount: number, portfolio: Portfolio) {
    const transaction = {
      transactionInCurrency: inCurrency,
      transactionInAmount: inCurrencyAmount,
      transactionOutCurrency: outCurrency,
      transactionOutAmount: outCurrencyAmount,
      portfolio: portfolio
    }
    return this.http.post<Transaction>("http://localhost:8080/api/transactions", transaction)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionStorageService 
{
  constructor(private http: HttpClient) { }

  private transactionsURL = "http://cryptoknight2-env.eba-3uzzfaem.us-east-2.elasticbeanstalk.com/transactions/";

  httpOptions = 
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  transactionList: Array<Transaction> = [];

  getTransactionList(portfolioId:number): Observable<Transaction[]>
  {
    const targetedTransactionURL = this.transactionsURL + portfolioId;
    console.log(targetedTransactionURL);

    return this.http.get<Transaction[]>(targetedTransactionURL,this.httpOptions)
  }
}

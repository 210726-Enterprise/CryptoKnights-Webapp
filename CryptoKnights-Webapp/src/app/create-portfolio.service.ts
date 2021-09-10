import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Portfolio } from './portfolio';

@Injectable({
  providedIn: 'root'
})
export class CreatePortfolioService 
{
  // private portfolioURL = "http://cryptoknight2-env.eba-3uzzfaem.us-east-2.elasticbeanstalk.com/portfolios"
  private portfolioURL = "http://localhost:8080/api/portfolios"

  httpOptions = 
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addPortfolio(portfolio: Portfolio): Observable<Portfolio> 
  {
    console.log("doing things");
    return this.http.post<Portfolio>(this.portfolioURL, portfolio, this.httpOptions)
    .pipe(
      catchError(this.handleError<Portfolio>('addPortfolio'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) 
  {
    return (error: any): Observable<T> => 
    {
      console.error(error);
      return of(result as T);
    };
  }
}

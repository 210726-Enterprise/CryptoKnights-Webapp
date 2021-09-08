import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';
import { Portfolio } from './portfolio';

@Injectable({
  providedIn: 'root'
})
export class CreatePortfolioService 
{
  private portfolioURL = "api/portfolios"

  httpOptions = 
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  addPortfolio(portfolio: Portfolio): Observable<Portfolio> 
  {
    return this.http.post<Portfolio>(this.portfolioURL, portfolio, this.httpOptions)
    .pipe(
      tap((newPortfolio: Portfolio) => this.log(`added portfolio w/ id=${newPortfolio.id}`)),
      catchError(this.handleError<Portfolio>('addPortfolio'))
    );
  }

  private log(message: string) 
  {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) 
  {
    return (error: any): Observable<T> => 
    {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

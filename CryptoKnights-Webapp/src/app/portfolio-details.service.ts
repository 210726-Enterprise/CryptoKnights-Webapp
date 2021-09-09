import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Portfolio } from './portfolio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDetailsService {

  private url: string = `http://localhost:8080/api/portfolios/4`

  constructor(private http: HttpClient) { }

  getPortfolios(): Observable<Portfolio> {
    return this.http.get<Portfolio>(this.url);
  }

}

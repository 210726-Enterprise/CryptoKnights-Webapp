import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';
import { PortfolioDetailsService } from './portfolio-details.service';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { TransactionCardService } from './transaction-card.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PortfolioDetailsComponent,
    TransactionCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PortfolioDetailsService, TransactionCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

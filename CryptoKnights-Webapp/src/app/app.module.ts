import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from './portfolio.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterUserService } from './register-user.service';
import { PortfolioViewComponent } from './portfolio-view/portfolio-view.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PortfolioDetailsComponent,
    TransactionCardComponent,
    RegisterUserComponent,
    PortfolioViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PortfolioService, RegisterUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

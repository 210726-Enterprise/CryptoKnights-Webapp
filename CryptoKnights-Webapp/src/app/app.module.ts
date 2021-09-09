import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { NavbarComponent } from './navbar/navbar.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from './portfolio.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterUserService } from './register-user.service';
import { PortfolioViewComponent } from './portfolio-view/portfolio-view.component';

=======
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TestComponent } from './test/test.component';
import { TestHomeComponent } from './test-home/test-home.component';
import { NewPortfolioComponent } from './new-portfolio/new-portfolio.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
>>>>>>> f814b9c42baa9d8dcc732750d2db945a2cdf8971

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    NavbarComponent,
    PortfolioDetailsComponent,
    TransactionCardComponent,
    RegisterUserComponent,
    PortfolioViewComponent
=======
    PagenotfoundComponent,
    TestComponent,
    TestHomeComponent,
    NewPortfolioComponent,
    LoginComponent,
>>>>>>> f814b9c42baa9d8dcc732750d2db945a2cdf8971
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    HttpClientModule,
    FormsModule
=======
    HttpClientModule
>>>>>>> f814b9c42baa9d8dcc732750d2db945a2cdf8971
  ],
  providers: [PortfolioService, RegisterUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TestComponent } from './test/test.component';
import { TestHomeComponent } from './test-home/test-home.component';
import { NewPortfolioComponent } from './new-portfolio/new-portfolio.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { TransactionViewComponent } from './transaction-view/transaction-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    TestComponent,
    TestHomeComponent,
    NewPortfolioComponent,
    LoginComponent,
    TransactionViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

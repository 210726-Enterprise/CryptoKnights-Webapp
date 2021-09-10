import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TestComponent } from './test/test.component';
import { TestHomeComponent } from './test-home/test-home.component';

import { LoginGuard } from './auth/login.guard';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { NewPortfolioComponent } from './new-portfolio/new-portfolio.component';
import { PortfolioViewComponent } from './portfolio-view/portfolio-view.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'test', 
    component: TestComponent,
    canActivate: [LoginGuard]
  },
  { path: 'register-user', component: RegisterUserComponent},
  { path: 'create-portfolio', component: NewPortfolioComponent, canActivate: [LoginGuard]},
  {
    path: 'portfolio/:id',
    component: PortfolioViewComponent,
    canActivate: [LoginGuard]
  },
  { path: 'user', component: ProfileComponent, canActivate: [LoginGuard]},
  { path: '**', component: PagenotfoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

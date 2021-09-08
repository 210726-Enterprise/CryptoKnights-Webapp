import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TestComponent } from './test/test.component';
import { TestHomeComponent } from './test-home/test-home.component';

import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', component: TestHomeComponent },
  { 
    path: 'test', 
    component: TestComponent,
    canActivate: [LoginGuard]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

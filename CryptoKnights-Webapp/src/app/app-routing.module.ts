import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: TestComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

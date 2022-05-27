import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { PaymentComponent } from './pages/payment/payment.component';
import * as R from './constants/routes-path';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: R.Home, component: HomeComponent },
  { path: R.category, component: CategoryComponent },
  { path: R.payment, component: PaymentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

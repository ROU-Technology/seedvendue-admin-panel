import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import * as R from './constants/routes-path';
import {
  LoginComponent,
  HomeComponent,
  PaymentComponent,
  CategoryComponent,
} from './pages';

const routes: Routes = [
  { path: R.Login, component: LoginComponent },
  { path: R.Home, component: HomeComponent, canActivate: [AuthGuard] },
  { path: R.category, component: CategoryComponent },
  { path: R.payment, component: PaymentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

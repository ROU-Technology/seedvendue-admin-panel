import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import * as R from './constants/routes-path';
import {
  LoginComponent,
  HomeComponent,
  PaymentComponent,
  CategoryComponent,
  UsersComponent,
  SubCategoryComponent,
  WithdrawComponent,
  PaymentHistoryComponent,
} from './pages';

const routes: Routes = [
  { path: R.Login, component: LoginComponent },
  { path: R.users, component: UsersComponent, canActivate: [AuthGuard] },
  { path: R.category, component: CategoryComponent, canActivate: [AuthGuard] },
  { path: R.payment, component: PaymentComponent, canActivate: [AuthGuard] },
  { path: R.users, component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: R.subCategory,
    component: SubCategoryComponent,
    canActivate: [AuthGuard],
  },
  { path: R.withdraw, component: WithdrawComponent, canActivate: [AuthGuard] },
  // {
  //   path: R.paymentHistory,
  //   component: PaymentHistoryComponent,
  //   canActivate: [AuthGuard],
  // },
  { path: '', redirectTo: R.users, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

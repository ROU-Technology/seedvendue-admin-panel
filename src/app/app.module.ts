import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { AppService } from './app.service';
import {
  CategoryComponent,
  HomeComponent,
  LoginComponent,
  PaymentComponent,
  SubCategoryComponent,
  UsersComponent,
} from './pages';
import { AuthService } from './service';
import { NavbarComponent, SideNavigationComponent } from './components';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { PaymentHistoryComponent } from './pages/payment-history/payment-history.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryComponent,
    PaymentComponent,
    HomeComponent,
    SubCategoryComponent,
    UsersComponent,
    LoginComponent,
    SideNavigationComponent,
    WithdrawComponent,
    PaymentHistoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
      // toastClass: 'toast',
    }),
  ],
  providers: [AppService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

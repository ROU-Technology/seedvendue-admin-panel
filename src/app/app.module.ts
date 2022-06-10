import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { AppService } from './app.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoryComponent } from './pages/category/category.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { HomeComponent } from './pages/home/home.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages';
import { AuthService } from './service';

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

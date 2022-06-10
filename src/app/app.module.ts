import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { AppService } from './app.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoryComponent } from './pages/category/category.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, CategoryComponent, PaymentComponent, HomeComponent, LoginComponent, SubCategoryComponent, UsersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatGridListModule,
    MatCardModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}

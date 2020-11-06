import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { CustomerDatabaseComponent } from './customer-database/customer-database.component';
import { CustomersWithRainComponent } from './customers-with-rain/customers-with-rain.component';
import { TopCustomersComponent } from './top-customers/top-customers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HomeComponent, CustomerDatabaseComponent, CustomersWithRainComponent, TopCustomersComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

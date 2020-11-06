import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDatabaseComponent } from '../customer-database/customer-database.component';
import { CustomersWithRainComponent } from '../customers-with-rain/customers-with-rain.component';
import { TopCustomersComponent } from '../top-customers/top-customers.component';

const routes: Routes = [
  { path: 'customer-database', component: CustomerDatabaseComponent },
  { path: 'customers-with-rain', component: CustomersWithRainComponent },
  { path: 'top-customers', component: TopCustomersComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

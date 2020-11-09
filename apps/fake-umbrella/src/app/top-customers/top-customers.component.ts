import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomerDatabaseService } from '../customer-database.service';
import { ICustomer } from '@thomas-assessment/api-interfaces';

@Component({
  selector: 'thomas-assessment-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.css'],
})
export class TopCustomersComponent implements OnInit, AfterViewInit {
  public company = [
    { rain: false, height: 1 },
    { rain: false, height: 1 },
    { rain: false, height: 1 },
    { rain: false, height: 1 },
  ];

  public maxEmployees: number = 1000;

  public customers: ICustomer[] = [];

  constructor(private customerDbService: CustomerDatabaseService) {}

  async ngOnInit() {
    this.customers = await this.customerDbService.findAll().toPromise();
  }

  ngAfterViewInit() {}
}

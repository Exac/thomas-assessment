import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// Inspiration from https://stackblitz.com/angular/qodyagorxkp?file=src%2Fapp%2Ftable-overview-example.ts

@Component({
  selector: 'thomas-assessment-customer-database',
  templateUrl: './customer-database.component.html',
  styleUrls: ['./customer-database.component.css'],
})
export class CustomerDatabaseComponent implements AfterViewInit {
  /** Data for customer search table */
  customers: MatTableDataSource<CustomerData>;
  displayedColumns: string[] = [
    'company',
    'contact',
    'phone',
    'location',
    'employees',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // TODO: Create a service to get this from the API
    this.customers = new MatTableDataSource<CustomerData>(customerSeed);
  }

  ngAfterViewInit() {
    this.customers.paginator = this.paginator;
    this.customers.sort = this.sort;
  }

  /** Search the customer database */
  search(event: KeyboardEvent) {
    const filter = (event.target as HTMLInputElement).value;
    this.customers.filter = filter.trim().toLowerCase();

    if (this.customers.paginator) {
      this.customers.paginator.firstPage();
    }
  }
}

// TODO: move shared module (this is a DTO).
/** OpenWeather uses city/state/country for their api, so mirror that */
interface Location {
  city: string;
  state: string;
  country?: string;
}

export interface CustomerData {
  id: number;
  company: string;
  contact: string;
  phone: string;
  location: Location;
  employees: number;
}

const customerSeed: CustomerData[] = [
  {
    company: 'Fake Umbrella',
    contact: 'Thomas McLennan',
    employees: 10,
    id: 0,
    location: { city: 'Vancouver', state: 'BC' },
    phone: '778-868-7447',
  },
  {
    company: 'Mind Beacon',
    contact: 'Meg Blair',
    employees: 100,
    id: 1,
    location: { city: 'Toronto', state: 'ON' },
    phone: '416-868-7447',
  },
];

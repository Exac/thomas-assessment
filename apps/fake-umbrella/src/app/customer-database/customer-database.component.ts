import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CustomersEditDialogComponent } from './customers-edit-dialog.component';

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

  constructor(public editDialog: MatDialog) {
    // TODO: Create a service to get this from the API
    this.customers = new MatTableDataSource<CustomerData>(customerSeed);
  }

  ngAfterViewInit() {
    this.customers.paginator = this.paginator;
    this.customers.sort = this.sort;
  }

  /** When a user clicks a customer, open a dialog for them to edit the customer */
  openEditCustomerDialog(customer: CustomerData = new CustomerDataInstance()) {
    // Open dialog with customer to edit/create/delete
    const dialogRef = this.editDialog.open<
      CustomersEditDialogComponent,
      CustomerData,
      CustomerData
    >(CustomersEditDialogComponent, {
      data: customer,
    });

    // When the dialog closes, we can act on the returned customer.
    dialogRef
      .afterClosed()
      .subscribe((c: CustomerData | number | undefined) => {
        if (typeof c === 'undefined') {
          // User didn't want to save their changes
          return;
        } else if (typeof c === 'number') {
          // delete customer by id
          this.deleteCustomer(c);
        } else {
          // Update the customer in the GUI and API
          this.updateCustomer(c);
        }
      });
  }

  /** Update the customer in the GUI table, and in the database */
  updateCustomer(customer: CustomerData): void {
    if (customer.id === -1) {
      // We need to add this new customer
      this.customers.data.push(customer);
    } else {
      const index = this.customers.data.findIndex((c) => c.id === customer.id);
      this.customers.data[index] = customer;
    }

    // Trigger MatDialog's change detection
    this.customers.data = this.customers.data;

    // TODO: Call a customer API service and update the new customer
  }

  /** Deleted the customer in the GUI table, and in the database */
  deleteCustomer(id: number) {
    // Remove customer from GUI table
    const index = this.customers.data.findIndex((c) => c.id === id);
    this.customers.data.splice(index, 1);

    // Trigger MatDialog's change detection, otherwise GUI table doesn't change
    this.customers.data = this.customers.data;

    // TODO: Call a customer API service and delete the customer by ID
  }

  /** Search the customer database, filter everything else out */
  search(event: KeyboardEvent) {
    const filter = (event.target as HTMLInputElement).value;
    this.customers.filter = filter.trim().toLowerCase();

    // The results will start on page 1, so reset the paginator
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
  id: number; // treat -1 as not-yet-saved to the database
  company: string;
  contact: string;
  phone: string;
  location: Location;
  employees: number;
}

class LocationInstance implements Partial<Location> {
  constructor(public city: string = '', public state: string = '') {}
}

export class CustomerDataInstance implements Partial<CustomerData> {
  constructor(
    public company: string = '',
    public contact: string = '',
    public employees: number = 0,
    public id: number = -1,
    public location: LocationInstance = new LocationInstance(),
    public phone: string = ''
  ) {}
}

/** Type Guard */
export function isCustomerData(
  obj: CustomerData | unknown
): obj is CustomerData {
  return (
    (obj as CustomerData).id !== undefined &&
    (obj as CustomerData).company !== undefined &&
    (obj as CustomerData).contact !== undefined &&
    (obj as CustomerData).phone !== undefined &&
    (obj as CustomerData).location !== undefined &&
    (obj as CustomerData).employees !== undefined
  );
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

import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CustomersEditDialogComponent } from './customers-edit-dialog.component';
import { ICustomer, ILocation } from '@thomas-assessment/api-interfaces';
import { CustomerDatabaseService } from '../customer-database.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

// Inspiration from https://stackblitz.com/angular/qodyagorxkp?file=src%2Fapp%2Ftable-overview-example.ts

@Component({
  selector: 'thomas-assessment-customer-database',
  templateUrl: './customer-database.component.html',
  styleUrls: ['./customer-database.component.css'],
})
export class CustomerDatabaseComponent
  implements OnInit, AfterViewInit, OnDestroy {
  /** Data for GUI customer search table */
  customers: MatTableDataSource<Customer> = new MatTableDataSource<Customer>(
    []
  );

  /** Declare the columns we want to show in the GUI table of users */
  displayedColumns: string[] = [
    'company',
    'contact',
    'phone',
    'location',
    'employees',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Pool of subscriptions that we can unsub from to prevent memory leaks */
  private $: Subscription = new Subscription();

  constructor(
    public editDialog: MatDialog,
    public customerDbService: CustomerDatabaseService
  ) {}

  ngOnInit() {
    // Initialize the customers from the API. Needs paging to scale.
    this.$.add(
      this.customerDbService
        .findAll()
        .pipe(
          tap((customers) => {
            this.customers = new MatTableDataSource<Customer>(customers);
            return customers;
          }),
          tap((customers: ICustomer[]) => {
            // The default filter won't search nested objects, but we have customer.location
            this.customers.filterPredicate = (
              customer: ICustomer,
              filter: string
            ) =>
              [...Object.values(customer), ...Object.values(customer.location)]
                .join()
                .trim()
                .toLowerCase()
                .indexOf(filter) > -1;
          })
        )
        .subscribe()
    );
  }

  ngAfterViewInit() {
    this.customers.paginator = this.paginator;
    this.customers.sort = this.sort;
  }

  /** When a user clicks a customer, open a dialog for them to edit the customer */
  openEditCustomerDialog(customer: Customer = new CustomerEntity()) {
    // Open dialog to edit/delete a customer
    const dialogRef = this.editDialog.open<
      CustomersEditDialogComponent,
      Customer,
      Customer
    >(CustomersEditDialogComponent, {
      data: customer,
    });

    // When the dialog closes, we can exit/delete the customer
    this.$.add(
      dialogRef
        .afterClosed()
        .subscribe((customer) => this.handleCustomerDialogResponse(customer))
    );
  }

  /** Update the customer in the GUI table, and in the database */
  updateCustomer(customer: Customer): void {
    if (customer === undefined) {
      return;
    }

    // ID of -1 means this is a new customer to add
    if (customer.id === -1) {
      this.customers.data.push(customer);
      this.$.add(this.customerDbService.create(customer).subscribe());
      return;
    }

    // Update the existing customer in the GUI table and the API
    const index = this.customers.data.findIndex((c) => c.id === customer.id);
    this.customers.data[index] = customer;
    this.$.add(this.customerDbService.update(customer).subscribe());

    // Force change detection to update the GUI table
    this.forceDialogChangeDetection();
  }

  /** Deleted the customer in the GUI table, and in the database */
  deleteCustomer(id: number) {
    // Remove customer from GUI table
    const index = this.customers.data.findIndex((c) => c.id === id);
    this.customers.data.splice(index, 1);

    // Trigger MatDialog's change detection, otherwise GUI table doesn't change
    this.customers.data = this.customers.data;

    // Call a customer API service and delete the customer by ID
    this.$.add(this.customerDbService.delete(id).subscribe());
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

  /** Leaving the page, so unsubscribe to prevent memory leaks. */
  ngOnDestroy() {
    this.$.unsubscribe();
  }

  /** After the user closes the customer-edit dialog, determine what to do with the Customer  */
  private handleCustomerDialogResponse(c: Customer | number | undefined) {
    if (typeof c === 'number') {
      // delete customer by id
      this.deleteCustomer(c);
    } else {
      // Update the customer in the GUI and API
      this.updateCustomer(c);
    }
    // If undefined, the user closed the edit box, so take no action
  }

  /** MatDialog's method to activate change detection is private, so force it to reload */
  private forceDialogChangeDetection() {
    this.customers.data = this.customers.data;
  }
}

// Just use the DTO
type Customer = ICustomer;

class LocationInstance implements Partial<ILocation> {
  constructor(public city: string = '', public state: string = '') {}
}

export class CustomerEntity implements Partial<Customer> {
  constructor(
    public company: string = '',
    public contact: string = '',
    public employees: number = 0,
    public id: number = -1,
    public location: LocationInstance = new LocationInstance(),
    public phone: string = '',
    public rain: boolean = false
  ) {}
}

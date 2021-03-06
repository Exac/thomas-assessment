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

// Inspiration from
// https://stackblitz.com/angular/qodyagorxkp?file=src%2Fapp%2Ftable-overview-example.ts

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public pageSizeOpts = [5, 10, 25, 50, 100];

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
          }),
          tap(() => this.createCustomerFilterPredicate())
        )
        .subscribe()
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      //  Trigger change detection with setTimeout, then setup MatTable's sort & paginator fns
      this.customers.paginator = this.paginator;
      this.customers.sort = this.sort;
    });
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
  private updateCustomer(customer: Customer): void {
    // Find and update customer in GUI data table
    const index = this.customers.data.findIndex((c) => c.id === customer.id);
    this.customers.data[index] = customer;
    this.forceDialogChangeDetection();

    // Call a customer API service and update the customer
    this.$.add(this.customerDbService.update(customer).subscribe());
  }

  /** Create a new customer in the GUI table, and in the database */
  private createCustomer(customer: Customer) {
    this.$.add(
      this.customerDbService.create(customer).subscribe((c) => {
        this.customers.data.push(c);
        this.forceDialogChangeDetection();
      })
    );
  }

  /** Deleted the customer in the GUI table, and in the database */
  private deleteCustomer(id: string) {
    // Remove customer from GUI table
    const index = this.customers.data.findIndex((c) => c.id === id);
    this.customers.data.splice(index, 1);
    this.forceDialogChangeDetection();
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
  private handleCustomerDialogResponse(c: Customer | string | undefined) {
    if (typeof c === 'undefined') {
      // If undefined, the user closed the edit box, so take no action
      return;
    } else if (typeof c === 'string') {
      // delete customer by id
      this.deleteCustomer(c);
    } else if (c.id === '') {
      // create a new customer
      this.createCustomer(c);
    } else {
      // Update the customer in the GUI and API
      this.updateCustomer(c);
    }
  }

  /** MatDialog's method to activate change detection is private, so force it to reload */
  private forceDialogChangeDetection() {
    this.customers.data = this.customers.data;
  }

  /**
   * When users search for a customer, they want to be able to search every property of the
   * customer, but `MatTableDataSource` by default doesn't search for child-properties like
   * `customer.location`, so replace the `filterPredicate`.
   */
  private createCustomerFilterPredicate() {
    this.customers.filterPredicate = (customer: ICustomer, filter: string) =>
      // instead of importing a flatMap shim, just search flattened customer values
      [...Object.values(customer), ...Object.values(customer.location)]
        .join()
        .trim()
        .toLowerCase()
        .indexOf(filter) > -1;
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
    public id: string = '',
    public location: LocationInstance = new LocationInstance(),
    public phone: string = '',
    public rain: boolean = false
  ) {}
}

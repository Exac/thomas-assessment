import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICustomer as CustomerData } from '@thomas-assessment/api-interfaces';

@Component({
  selector: 'customers-edit',
  templateUrl: './customers-edit-dialog.component.html',
  styleUrls: ['./customers-edit-dialog.component.css'],
})
export class CustomersEditDialogComponent {
  public customer: CustomerData;

  constructor(
    public dialogRef: MatDialogRef<CustomersEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customerRef: CustomerData
  ) {
    this.customer = { ...customerRef };
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(() => this.dialogRef.close());
  }

  closeAndUpdate() {
    this.customerRef = this.customer;
    this.dialogRef.close(this.customer);
  }

  closeAndDelete() {
    this.dialogRef.close(this.customer.id);
  }

  closeAndCancel() {
    this.dialogRef.close();
  }
}

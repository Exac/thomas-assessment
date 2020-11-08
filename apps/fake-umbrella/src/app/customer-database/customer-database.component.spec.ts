import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDatabaseComponent } from './customer-database.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ICustomer } from '@thomas-assessment/api-interfaces';

describe('CustomerDatabaseComponent', () => {
  let component: CustomerDatabaseComponent;
  let fixture: ComponentFixture<CustomerDatabaseComponent>;
  let customerData: ICustomer[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDatabaseComponent],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDatabaseComponent);
    component = fixture.componentInstance;

    customerData = [
      {
        company: 'Acme Ltd',
        contact: 'Alice Adams',
        employees: 10,
        id: '0000',
        location: { city: 'Vancouver', state: 'BC' },
        phone: '778-868-7447',
        rain: true,
      },
      {
        company: 'Mind Beacon',
        contact: 'Bob Bailey',
        employees: 100,
        id: '0001',
        location: { city: 'Toronto', state: 'ON' },
        phone: '416-868-7447',
        rain: false,
      },
    ];
    component.customers.data = customerData;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The page should offer the options to create, update, and delete customers', () => {
    it('should open an edit dialog when clicking a customer to edit', () => {
      // Arrange
      spyOn(component, 'openEditCustomerDialog');

      // Act
      const button = fixture.debugElement.nativeElement.querySelector(
        '.customer-row'
      );
      button.click();

      // Assert
      fixture.whenStable().then(() => {
        expect(component.openEditCustomerDialog).toHaveBeenCalledWith(
          customerData[0]
        );
      });
    });
  });

  it('should open an edit dialog when clicking the + FAB button to create', () => {
    // Arrange
    spyOn(component, 'openEditCustomerDialog');

    // Act
    const button = fixture.debugElement.nativeElement.querySelector('#fab');
    button.click();

    // Assert
    fixture.whenStable().then(() => {
      expect(component.openEditCustomerDialog).toHaveBeenCalledWith();
    });
  });

  describe('Each customer should have name, person-of-contact, phone, location, & # of employees', () => {
    it('should be possible to find users by company name', () => {
      // Arrange
      const headerEls: NodeList = fixture.nativeElement.querySelectorAll(
        '.mat-sort-header-content'
      );

      // Act
      const companyEls = Array.from(headerEls).filter((element: Node) => {
        return element.textContent === 'Company';
      });

      // Assert
      expect(companyEls.length).toBeGreaterThanOrEqual(1);
    });
  });
});

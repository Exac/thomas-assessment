import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  CustomerData,
  CustomerDatabaseComponent,
} from './customer-database.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('CustomerDatabaseComponent', () => {
  let component: CustomerDatabaseComponent;
  let fixture: ComponentFixture<CustomerDatabaseComponent>;
  let customerData: CustomerData[];

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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    customerData = [
      {
        company: 'Acme Ltd',
        contact: 'Alice Adams',
        employees: 10,
        id: 0,
        location: { city: 'Vancouver', state: 'BC' },
        phone: '778-868-7447',
      },
      {
        company: 'Mind Beacon',
        contact: 'Bob Bailey',
        employees: 100,
        id: 1,
        location: { city: 'Toronto', state: 'ON' },
        phone: '416-868-7447',
      },
    ];
    component.customers.data = customerData;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The page should offer the options to create, update, and delete customers', () => {
    it('should open an edit dialog when clicking/tapping a customer', () => {
      // TODO
      // Arrange
      // Act
      // Assert
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

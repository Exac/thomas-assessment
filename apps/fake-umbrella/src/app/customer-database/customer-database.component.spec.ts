import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDatabaseComponent } from './customer-database.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CustomerDatabaseComponent', () => {
  let component: CustomerDatabaseComponent;
  let fixture: ComponentFixture<CustomerDatabaseComponent>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('The page should offer the options to create, update, and delete customers', () => {
    xit('should open an edit dialog when clicking/tapping a customer', () => {
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

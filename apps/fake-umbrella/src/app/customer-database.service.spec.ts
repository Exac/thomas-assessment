import { TestBed } from '@angular/core/testing';

import { CustomerDatabaseService } from './customer-database.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomerDatabaseService', () => {
  let service: CustomerDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CustomerDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateCustomerDto,
  ICustomer,
  UpdateCustomerDto,
} from '@thomas-assessment/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CustomerDatabaseService {
  constructor(private http: HttpClient) {}

  create(customer: CreateCustomerDto): Observable<string> {
    return this.http.post<string>('/api/customer', customer);
  }

  findAll(): Observable<CreateCustomerDto[]> {
    return this.http.get<ICustomer[]>('/api/customer');
  }

  fineOne(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`/api/customer/${id}`);
  }

  update(customer: UpdateCustomerDto): Observable<string> {
    return this.http.put<string>(`/api/customer/${customer.id}`, customer);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`/api/customer/${id}`);
  }
}

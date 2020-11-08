import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
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

  create(customer: CreateCustomerDto): Observable<ICustomer> {
    return this.http.post<ICustomer>('/api/customer', customer);
  }

  findAll(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>('/api/customer');
  }

  findOne(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`/api/customer/${id}`);
  }

  update(customer: UpdateCustomerDto): Observable<ICustomer> {
    return this.http.put<ICustomer>(`/api/customer/${customer.id}`, customer);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`/api/customer/${id}`);
  }
}

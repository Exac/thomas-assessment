import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MessageAllCustomerProfiles,
  MessageCustomerDeleteResponse,
  MessageCustomerProfile,
} from '@thomas-assessment/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerDatabaseService {
  constructor(private http: HttpClient) {}

  // getAllCustomers(): Observable<MessageAllCustomerProfiles> {
  //   return this.http.get<MessageAllCustomerProfiles>('/api/customers');
  // }
  //
  // getCustomer(id: number) {
  //   return this.http.get<MessageCustomerProfile>(`/api/customers/${id}`);
  // }
  //
  // updateCustomer(
  //   profile: MessageCustomerProfile
  // ): Observable<MessageCustomerProfile> {
  //   return this.http.patch<MessageCustomerProfile>(
  //     `/api/customers/${profile.id}`,
  //     profile
  //   );
  // }
  //
  // deleteCustomer(id: number): Observable<MessageCustomerDeleteResponse> {
  //   return this.http.delete<MessageCustomerDeleteResponse>(
  //     `/api/customers/${id}`
  //   );
  // }
}

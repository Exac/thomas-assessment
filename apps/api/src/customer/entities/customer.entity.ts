import { ICustomer, ILocation } from '@thomas-assessment/api-interfaces';

class Customer implements ICustomer {
  id: number = -1; // treat -1 as not-yet-saved to the database
  company: string = '';
  contact: string = '';
  phone: string = '';
  location: ILocation = { city: '', state: '' };
  employees: number = 1;
  rain: boolean = false;
}

class Location implements ILocation {
  city: string = '';
  state: string = '';
  country?: string = '';
}

export { Customer, Location };

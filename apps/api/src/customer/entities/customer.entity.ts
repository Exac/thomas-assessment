import { ICustomer, ILocation } from '@thomas-assessment/api-interfaces';

class Customer implements ICustomer {
  id: string = ''; // treat empty string as not-yet-saved to the database
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

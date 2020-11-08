export interface Message {
  message: string;
}

/** Message sent by frontend to create or update a customer in the backend. */
export interface ICustomer {
  id: string; // treat -1 as not-yet-saved to the database
  company: string;
  contact: string;
  phone: string;
  location: ILocation;
  employees: number;
  rain: boolean;
}

export type ICustomers = ICustomer[];

/** OpenWeather uses city/state/country for their api, so mirror that */
export interface ILocation {
  city: string;
  state: string;
  country?: string;
}

export class CustomerLocation implements ILocation {
  city: string;
  state: string;
  country?: string;
}

/** Customer without the index or rain property */
export class CreateCustomerDto implements Omit<ICustomer, 'id' | 'rain'> {
  company: string;
  contact: string;
  phone: string;
  location: CustomerLocation;
  employees: number;
}

export class UpdateCustomerDto implements Partial<ICustomer> {
  id?: string;
  company?: string;
  contact?: string;
  phone?: string;
  location?: ILocation;
  employees?: number;
  rain?: boolean;
}

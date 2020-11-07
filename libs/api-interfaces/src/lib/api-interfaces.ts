export interface Message {
  message: string;
}

/** Message sent by frontend to create or update a customer in the backend. */
export interface MessageCustomerProfile {
  id: number; // treat -1 as not-yet-saved to the database
  company: string;
  contact: string;
  phone: string;
  location: Location;
  employees: number;
}

export type MessageAllCustomerProfiles = MessageCustomerProfile[];

/** OpenWeather uses city/state/country for their api, so mirror that */
export interface Location {
  city: string;
  state: string;
  country?: string;
}

/** Message sent by frontend to delete a customer in the backend. */
export interface MessageCustomerDelete {
  id: number;
}

export interface MessageCustomerDeleteResponse {
  isDeleted: boolean;
}

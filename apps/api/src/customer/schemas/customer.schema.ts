import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICustomer, ILocation } from '@thomas-assessment/api-interfaces';

export type CustomerDocument = Customer & Document;

export class Location implements ILocation {
  @Prop() city: string;
  @Prop() state: string;
  @Prop() country?: string;
}

@Schema({ toJSON: { virtuals: true } })
export class Customer implements Omit<ICustomer, 'id'> {
  @Prop() company: string;
  @Prop() contact: string;
  @Prop() phone: string;
  @Prop() location: Location;
  @Prop() employees: number;
  @Prop() rain: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.virtual('id', {
  get: (thisRef) => {
    return thisRef._id;
  },
  set: () => {},
});

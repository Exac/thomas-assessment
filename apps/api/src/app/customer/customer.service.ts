import { Injectable } from '@nestjs/common';
import {
  CreateCustomerDto,
  ICustomer,
  UpdateCustomerDto,
} from '@thomas-assessment/api-interfaces';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto
  ): Promise<ICustomer | CustomerDocument> {
    const customer: Customer = { ...createCustomerDto, rain: false };
    const createdCustomer = new this.customerModel(customer);
    return createdCustomer.save();
  }

  async findAll(): Promise<CustomerDocument[]> {
    return this.customerModel.find().exec();
  }

  async findOne(_id: string): Promise<ICustomer | CustomerDocument> {
    return this.customerModel.findOne({ _id });
  }

  async update(
    _id: string,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<CustomerDocument> {
    return this.customerModel.findOneAndUpdate(
      { _id },
      { $set: updateCustomerDto },
      { new: true }
    );
  }

  /** Delete customer, return true if successful */
  async remove(_id: string): Promise<boolean> {
    return this.customerModel
      .findOneAndDelete({ _id })
      .then(() => true)
      .catch(() => false);
  }
}

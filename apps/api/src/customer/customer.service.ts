import { Injectable } from '@nestjs/common';
import {
  CreateCustomerDto,
  ICustomer,
  ICustomers,
  Message,
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
    const docs = this.customerModel.find().exec();
    return docs;
  }

  async findOne(_id: string): Promise<ICustomer | CustomerDocument> {
    return this.customerModel.findOne({ _id });
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<ICustomer> {
    return;
  }

  async remove(_id: string): Promise<unknown> {
    const delete_result = this.customerModel.deleteMany({ _id });
    console.log({ delete_result });
    return delete_result;
  }
}

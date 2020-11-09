import { Dependencies, Inject, Injectable } from '@nestjs/common';
import {
  CreateCustomerDto,
  ICustomer,
  UpdateCustomerDto,
} from '@thomas-assessment/api-interfaces';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherService } from '../weather/weather.service';

@Dependencies(WeatherService)
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    @Inject(WeatherService) public weather: WeatherService
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto
  ): Promise<ICustomer | CustomerDocument> {
    const customer: Customer = { ...createCustomerDto, rain: false };
    const createdCustomer: CustomerDocument = await new this.customerModel(
      customer
    ).save();
    return await this.checkForRain([createdCustomer])[0];
  }

  async findAll(): Promise<CustomerDocument[]> {
    const customers: CustomerDocument[] = await this.customerModel
      .find()
      .exec();

    return this.checkForRain(customers);
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

  private async checkForRain(
    customers: CustomerDocument[]
  ): Promise<CustomerDocument[]> {
    const promises = [
      ...customers.map(async (c) => {
        c.rain = await this.weather.isRainForecast(c?.location?.city);
        return c;
      }),
    ];

    return await Promise.all(promises);
  }
}

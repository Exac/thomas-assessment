import { Injectable } from '@nestjs/common';
import {
  CreateCustomerDto,
  ICustomer,
  ICustomers,
  Message,
  UpdateCustomerDto,
} from '@thomas-assessment/api-interfaces';

@Injectable()
export class CustomerService {
  async create(createCustomerDto: CreateCustomerDto): Promise<ICustomer> {
    return;
  }

  async findAll(): Promise<ICustomer[]> {
    return customerSeed;
  }

  async findOne(id: number): Promise<ICustomer> {
    return;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<ICustomer> {
    return;
  }

  async remove(id: number): Promise<Message> {
    return { message: `This action removes a #${id} customer` };
  }
}

const customerSeed: ICustomers = [
  {
    company: 'Fake Umbrella',
    contact: 'Thomas McLennan',
    employees: 10,
    id: '0000',
    location: { city: 'Vancouver', state: 'BC' },
    phone: '778-868-7447',
    rain: true,
  },
  {
    company: 'Mind Beacon',
    contact: 'Meg Blair',
    employees: 100,
    id: '0001',
    location: { city: 'Toronto', state: 'ON' },
    phone: '416-868-7447',
    rain: false,
  },
];

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
  create(createCustomerDto: CreateCustomerDto): ICustomer {
    return;
  }

  findAll(): ICustomers {
    return [];
  }

  findOne(id: number): ICustomer {
    return;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto): ICustomer {
    return;
  }

  remove(id: number): Message {
    return { message: `This action removes a #${id} customer` };
  }
}

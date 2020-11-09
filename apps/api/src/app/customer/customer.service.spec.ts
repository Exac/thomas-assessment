import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getModelToken } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { WeatherService } from '../weather/weather.service';

const customerModel = {};

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: getModelToken('Customer'), useValue: customerModel },
        { provide: WeatherService, useValue: {} },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

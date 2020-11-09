import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { WeatherModule } from '../weather/weather.module';
import { WeatherService } from '../weather/weather.service';

@Module({
  imports: [
    WeatherModule,
    MongooseModule.forFeature(
      [{ name: Customer.name, schema: CustomerSchema }],
      'nest'
    ),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}

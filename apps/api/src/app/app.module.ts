import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    CustomerModule,
    MongooseModule.forRoot('mongodb://mongodb/customers', {
      connectionName: 'customers',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

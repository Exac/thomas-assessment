import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwmCache, OwmCacheSchema } from './schemas/owmcache.schema';
import { WeatherService } from './weather.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: OwmCache.name, schema: OwmCacheSchema }],
      'nest'
    ),
    HttpModule,
  ],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}

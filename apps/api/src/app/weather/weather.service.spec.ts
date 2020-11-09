import { WeatherService } from './weather.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { OwmCache } from './schemas/owm-cache.schema';
import { getModelToken } from '@nestjs/mongoose';

const owmCacheModel = {};

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        { provide: getModelToken('OwmCache'), useValue: owmCacheModel },
        OwmCache,
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

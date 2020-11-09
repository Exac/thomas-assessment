import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService, UseInterceptors } from '@nestjs/common';
import { CachingInterceptor } from './caching.interceptor';
import { InjectModel } from '@nestjs/mongoose';
import { OwmCache, OwnCacheDocument } from './schemas/owm-cache.schema';
import { Model } from 'mongoose';
import { openweathermap } from './entities/weather.entities';

/**
 * This service provides weather for locations. We can only make a limited number of API calls to
 * OpenWeathermap, so we will rely on caching and rate-limiting.
 *
 * Limit of 60 calls per minute
 */
@Injectable({
  providedIn: 'root',
})
@UseInterceptors(CachingInterceptor)
export class WeatherService {
  private static apiKey: string = environment.openweathermapApiKey;

  constructor(
    private http: HttpService,
    @InjectModel(OwmCache.name) private ownCacheModel: Model<OwnCacheDocument>
  ) {}

  async test(n: number) {
    const response = await this.http
      .get<string>(`http://thomasmclennan.ca/?n=${n}`)
      .toPromise();
  }

  async isRainForecast(city: string): Promise<boolean> {
    const uri = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WeatherService.apiKey}`;
    // 1. check cache

    // 2. lookup forecast
    const response = await this.http
      .get<openweathermap.ApiResponse>(uri)
      .toPromise();

    // 3. cache result

    return this.doesApiResponseContainRain(response.data);
  }

  private doesApiResponseContainRain(dat: openweathermap.ApiResponse): boolean {
    return JSON.stringify(dat).toLowerCase().indexOf('rain') > -1;
  }

  private cache(response: openweathermap.ApiResponse): void {}
}

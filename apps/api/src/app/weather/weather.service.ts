import { Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { HttpService, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OwmCache, OwnCacheDocument } from './schemas/owmcache.schema';
import { Model } from 'mongoose';
import { ApiResponse } from './entities/weather.entities';

/**
 * This service provides weather for locations. We can only make a limited number of API calls to
 * OpenWeathermap, so we will rely on caching and rate-limiting.
 *
 * Limit of 60 calls per minute
 */
@Injectable()
export class WeatherService {
  private static apiKey: string = environment.openweathermapApiKey;

  constructor(
    private http: HttpService,
    @InjectModel(OwmCache.name) private ownCacheModel: Model<OwnCacheDocument>
  ) {}

  /**
   * Returns `true` if rain is found in the 5-day forecast
   * @param city Name of city eg: "Seattle"
   */
  async isRainForecast(city: string): Promise<boolean> {
    if (city.length < 2) {
      return false;
    }

    const uri = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WeatherService.apiKey}`;
    // 1. check cache
    const cached = await this.ownCacheModel.findOne({ uri });
    if (cached !== null) {
      return WeatherService.doesApiResponseContainRain(cached.response);
    }

    // 2. lookup forecast
    const response = await this.http.get<ApiResponse>(uri).toPromise();

    // 3. cache result
    await new this.ownCacheModel(<OwmCache>{
      uri,
      response: response.data,
    }).save();

    return WeatherService.doesApiResponseContainRain(response.data);
  }

  private static doesApiResponseContainRain(dat: ApiResponse): boolean {
    return JSON.stringify(dat).toLowerCase().indexOf('rain') > -1;
  }
}

// OpenWeatherMap interfaces

export interface Weather {
  id: number;
  main: string; // 'Rain' 'Clouds' 'Clear'
  description: string; // 'light rain' 'overcast clouds' 'scattered clouds' 'clear sky'
  icon: string;
}

export interface Main {
  temp: number;
}

export interface List {
  dt: number; // UTC unix time
  main: Main;
  weather: Weather[];
}

export interface ApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
}

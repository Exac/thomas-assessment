// OpenWeatherMap interface
export namespace openweathermap {
  export interface ApiResponse {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
  }

  interface List {
    dt: number; // UTC unix time
    main: Main;
    weather: Weather[];
  }

  interface Main {
    temp: number;
  }

  interface Weather {
    id: number;
    main: string; // 'Rain' 'Clouds' 'Clear'
    description: string; // 'light rain' 'overcast clouds' 'scattered clouds' 'clear sky'
    icon: string;
  }
}

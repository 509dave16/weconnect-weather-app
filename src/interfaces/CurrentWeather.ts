import { Condition } from './Enums'

interface Wind {
  speed: number;
  deg: number;
}

export interface CurrentWeather {
  location: string;
  temperature: number;
  feelsLike: number;
  wind: Wind;
  condition: Condition;
}
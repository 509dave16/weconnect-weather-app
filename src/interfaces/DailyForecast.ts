import { Period } from './Enums'
import { CurrentWeather } from './CurrentWeather';

export interface PeriodForecast extends CurrentWeather {
  period: Period;
}

export interface DailyForecast {
  date: Date;
  periods: Array<PeriodForecast>;
}
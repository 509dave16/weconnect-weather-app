
import _ from 'lodash'

import { ApiResponse } from '../interfaces/ApiResponse'
import { ApiResponseState, Period } from '../interfaces/Enums'
import { CurrentWeather } from '../interfaces/CurrentWeather'
import { DailyForecast } from '../interfaces/DailyForecast'

import { OPEN_WEATHER_API_URL, OPEN_WEATHER_APP_ID } from '../config/env'

function getDateString(forecast: any): string {
  return forecast?.dt_txt?.split('T')?.[0]
}

function getCurrentWeatherFromJson(json: any): CurrentWeather {
  return {
    location: json?.name,
    temperature: json?.main?.temp,
    feelsLike: json?.main?.feels_like,
    wind: json?.wind,
    condition: json?.weather?.[0]?.main,
  }
}

function getDailyForecast(name: String, dailyForecastGroup: Array<any>): DailyForecast {
  // console.log(name, dailyForecastGroup)
  const amForecast: any = _.minBy(dailyForecastGroup, (forecast) => forecast.main.temp)
  const pmForecast: any = _.maxBy(dailyForecastGroup, (forecast) => forecast.main.temp) 
  // console.log('<<<AM FORECAST', amForecast)
  // console.log('<<<PM FORECAST', pmForecast)
  const amCurrentWeather: CurrentWeather = getCurrentWeatherFromJson({ ...amForecast, name })
  const pmCurrentWeather: CurrentWeather = getCurrentWeatherFromJson({ ...pmForecast, name })
  return {
    date: new Date(getDateString(amForecast)),
    periods: [
      { period: Period.AM, ...amCurrentWeather },
      { period: Period.PM, ...pmCurrentWeather },
    ]
  }
}

function getDailyForecastsFromJson(json: any): Array<DailyForecast> {
  // console.log('<<<getDailyForecastsFromJson -', json)
  const { city: { name, timezone }, sunrise, sunset, list } = json
  const sunRisingAt = new Date(sunrise * 1000)
  const sunSettingAt = new Date(sunset * 1000)
  // console.log('<<<sunRisingAt/sunSettingAt', sunRisingAt, sunSettingAt)
  list.forEach((forecast: any) => { forecast.dt_txt = (new Date((forecast.dt + timezone) * 1000)).toISOString() })
  const dailyForecastGroups = _.groupBy(list, getDateString)
  return _.values(dailyForecastGroups)
    .filter((forecastGroup: Array<any>) => forecastGroup.length > 1)
    .map((forecastGroup: Array<any>) => getDailyForecast(name, forecastGroup))
}

function getRequest(resource: String, options: RequestInit): Request {
  let url = `${OPEN_WEATHER_API_URL}/${resource}`
  if (!options.method || ['HEAD', 'GET'].includes(options.method) && options.body instanceof URLSearchParams) {
    url += `?${options.body?.toString()}`
    delete options.body
  }
  return new Request(url, options)
}

async function openWeatherRequest(resource: String, options: RequestInit = {}, transformData: Function): Promise<ApiResponse> {
  let state: ApiResponseState = ApiResponseState.SUCCESS
  let result: any = null

  // console.log('<<<openWeatherRequest - options.body', options?.body)
  if (options?.body instanceof URLSearchParams) {
    options.body.append('appid', OPEN_WEATHER_APP_ID)
  }

  try {
    const response: Response = await fetch(getRequest(resource, options));
    const json: JSON = await response.json();

    if (response.status >= 400) {
      state = ApiResponseState.ERROR
      result = json
    } else if (_.isEmpty(json)) {
      state = ApiResponseState.EMPTY
      result = null
    } else {
      result = transformData(json)
    }
  } catch (error) {
    state = ApiResponseState.ERROR
    result = error
  }

  return { result, state }
}

export async function currentWeather(options: RequestInit): Promise<ApiResponse> {
 return openWeatherRequest('weather', options, getCurrentWeatherFromJson)
}

export function dailyForecasts(options: RequestInit): Promise<ApiResponse> {
  return openWeatherRequest('forecast', options, getDailyForecastsFromJson)
}
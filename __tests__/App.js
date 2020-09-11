import 'react-native'
import React from 'react'
import App from '../src/App.tsx'

// Note: test renderer must be required after react-native.
import { render, waitForElementToBeRemoved } from '@testing-library/react-native'

import * as WeatherService from '../src/services/weather'
jest.mock('../src/services/weather')

beforeEach(() => {
  const currentWeatherResponse = {
    "result": {
      "condition": "Clear",
      "feelsLike": 55.85,
      "location": "Spokane",
      "temperature": 60.01,
      "wind": {
        "deg": 50,
        "speed": 3.36,
      },
    },
    "state": "success",
  }

  const dailyForecastsResponse = {
    result: [
      {
        "date": new Date("2020-09-11T00:00:00.000Z"),
        "periods": [
          {
            "condition": "Clear",
            "feelsLike": 53.55,
            "location": "Spokane",
            "period": "AM",
            "temperature": 58.33,
            "wind": {
              "deg": 111,
              "speed": 2.55,
            },
          },
          {
            "condition": "Clear",
            "feelsLike": 78.3,
            "location": "Spokane",
            "period": "PM",
            "temperature": 85.32,
            "wind": {
              "deg": 240,
              "speed": 6.24,
            },
          },
        ],
      },
      {
        "date": new Date("2020-09-12T00:00:00.000Z"),
        "periods": [
          {
            "condition": "Clear",
            "feelsLike": 53.82,
            "location": "Spokane",
            "period": "AM",
            "temperature": 59.61,
            "wind": {
              "deg": 116,
              "speed": 3.74,
            },
          },
          {
            "condition": "Clear",
            "feelsLike": 77.88,
            "location": "Spokane",
            "period": "PM",
            "temperature": 85.1,
            "wind": {
              "deg": 214,
              "speed": 6.98,
            },
          },
        ],
      },
      {
        "date": new Date("2020-09-13T00:00:00.000Z"),
        "periods": [
          {
            "condition": "Clouds",
            "feelsLike": 51.96,
            "location": "Spokane",
            "period": "AM",
            "temperature": 58.15,
            "wind": {
              "deg": 92,
              "speed": 4.32,
            },
          },
          {
            "condition": "Clouds",
            "feelsLike": 80.82,
            "location": "Spokane",
            "period": "PM",
            "temperature": 88.18,
            "wind": {
              "deg": 246,
              "speed": 6.02,
            },
          },
        ],
      },
      {
        "date": new Date("2020-09-14T00:00:00.000Z"),
        "periods": [
          {
            "condition": "Clouds",
            "feelsLike": 53.71,
            "location": "Spokane",
            "period": "AM",
            "temperature": 62.1,
            "wind": {
              "deg": 195,
              "speed": 11.12,
            },
          },
          {
            "condition": "Clouds",
            "feelsLike": 65.77,
            "location": "Spokane",
            "period": "PM",
            "temperature": 75.31,
            "wind": {
              "deg": 225,
              "speed": 12.01,
            },
          },
        ],
      },
      {
        "date": new Date("2020-09-15T00:00:00.000Z"),
        "periods": [
          {
            "condition": "Clouds",
            "feelsLike": 57.13,
            "location": "Spokane",
            "period": "AM",
            "temperature": 62.46,
            "wind": {
              "deg": 139,
              "speed": 4.18,
            },
          },
          {
            "condition": "Clouds",
            "feelsLike": 70.56,
            "location": "Spokane",
            "period": "PM",
            "temperature": 73.17,
            "wind": {
              "deg": 244,
              "speed": 2.39,
            },
          },
        ],
      },
    ],
    "state": "success",
  }
  WeatherService.currentWeather.mockResolvedValue(currentWeatherResponse)
  WeatherService.dailyForecasts.mockResolvedValue(dailyForecastsResponse)
})

it('renders loading state correctly', () => {
  let root = render(<App />)
  expect(root.toJSON()).toMatchSnapshot()
})

it('renders data correctly', async () => {
  const { getByTestId, toJSON } = render(<App />)
  await waitForElementToBeRemoved(() => getByTestId('App-ActivityIndicator'))
  expect(toJSON()).toMatchSnapshot()
})
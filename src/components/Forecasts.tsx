import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import DayForecast from './DayForecast'

import { DailyForecast } from '../interfaces/DailyForecast'

interface Props {
  dailyForecasts?: Array<DailyForecast>
}

export default function Forecasts({ dailyForecasts }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forecast:</Text>
      { dailyForecasts?.map((forecast: DailyForecast) => <DayForecast key={forecast.date.toString()} forecast={forecast}/>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  header: {
    fontSize: 18,
    marginVertical: Dimensions.get('screen').height / 32
  },
})
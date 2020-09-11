import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { PeriodForecast, DailyForecast } from '../interfaces/DailyForecast'

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

function getDay(date: Date) {
  return daysOfWeek[date.getDay()]
}

interface PeriodProps {
  period: PeriodForecast;
  day: string;
}

function Period({period, day}: PeriodProps) {
  return (
    <View style={styles.periodRow}>
      <View style={styles.widePeriodColumn}>
        <Text style={styles.periodText}>{day}</Text>
      </View>
      <View style={styles.periodColumn}>
        <Text style={styles.periodText}>{period.period}</Text>
      </View>
      <View style={styles.periodColumn}>
        <Text style={styles.periodText}>{period.condition}</Text>
      </View>
      <View style={styles.periodColumn}>
        <Text style={styles.periodText}>{Math.round(period.temperature)}°</Text>
      </View>
    </View>
  )
}

interface DayForecastProps {
  forecast: DailyForecast
}

export default function DayForecast({ forecast }: DayForecastProps) {
  const day = getDay(forecast.date)
  return (
    <View>
      { forecast.periods.map((period: any) => <Period key={period.period} period={period} day={day}/>) }
    </View> 
  )
}

const styles = StyleSheet.create({
  periodRow: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 5,
  },
  widePeriodColumn: {
    flex: 0,
    width: '40%'
  },
  periodColumn: {
    flex: 0,
    width: '20%',
  },
  periodText: {
    textAlign: 'left',
    fontSize: 18,
  },
})
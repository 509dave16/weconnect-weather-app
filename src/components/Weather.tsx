import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { CurrentWeather } from '../interfaces/CurrentWeather';

interface Props {
  currentWeather?: CurrentWeather
}

export default function Weather({ currentWeather }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.location}>{currentWeather?.location}</Text>
      <Text style={styles.condition}>{currentWeather?.condition}</Text>
      <Text style={styles.temperature}>{Math.round(currentWeather?.temperature || 0)}°</Text>
      <View style={styles.otherDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <Text style={styles.detailText}>Feels Like</Text>
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.detailText}>{Math.round(currentWeather?.feelsLike || 0)}°</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailColumn}>
            <Text style={styles.detailText}>Wind</Text>
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.detailText}>{currentWeather?.wind.deg}° / {currentWeather?.wind.speed} mph</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  location: {
    fontSize: 40,
  },
  condition: {
    fontSize: 18,
  },
  temperature: {
    fontSize: 60,
  },
  otherDetails: {
    marginTop: Dimensions.get('screen').height / 16,
  },
  detailRow: {
    width: '100%',
    flexDirection: 'row',
  },
  detailColumn: {
    flex: 0,
    width: '50%',
  },
  detailText: {
    textAlign: 'left',
    fontSize: 18,
  },
})
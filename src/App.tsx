import React from 'react';
import { StyleSheet, Text, ScrollView, View, ActivityIndicator, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import Weather from './components/Weather';
import Forecasts from './components/Forecasts';

import * as OpenWeather from './services/openWeather';
import { ApiResponse } from './interfaces/ApiResponse';
import { ApiResponseState } from './interfaces/Enums';
import { CurrentWeather } from './interfaces/CurrentWeather';
import { DailyForecast } from './interfaces/DailyForecast';

const location = 'Spokane'
const backgroundColor = '#b9e1f8'

interface State {
  currentWeatherDone: boolean;
  dailyForecastsDone: boolean;
  currentWeather?: CurrentWeather;
  dailyForecasts?: Array<DailyForecast>;
}

export default class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = { currentWeatherDone: false, dailyForecastsDone: false }
  }

  componentDidMount() {
    this.fetchCurrentWeather();
    this.fetchDailyForecasts();
  }

  async fetchCurrentWeather() {
    const response: ApiResponse = await OpenWeather.currentWeather({
      body: new URLSearchParams({
        q: location,
        units: 'imperial'
      })
    })

    const nextState: any = { currentWeatherDone: true }
    if (response.state === ApiResponseState.SUCCESS) {
      nextState.currentWeather = response.result
    }
    this.setState(nextState)
    console.log('<<<fetchCurrentWeather - response', response)
  }

  async fetchDailyForecasts() {
    const response: ApiResponse = await OpenWeather.dailyForecasts({
      body: new URLSearchParams({
        q: location,
        units: 'imperial'
      })
    })
    const nextState: any = { dailyForecastsDone: true }
    if (response.state === ApiResponseState.SUCCESS) {
      nextState.dailyForecasts = response.result
    }
    this.setState(nextState)
    // console.log('<<<fetchDailyForecasts - response', response)
  }

  shouldRenderContent() {
    return this.state.currentWeatherDone && this.state.dailyForecastsDone
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        { this.shouldRenderContent() ? this.renderContent() : this.renderStatus() }
        <StatusBar backgroundColor={backgroundColor} style='dark' />
      </SafeAreaView>
    )
  }

  renderContent() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.contentSpacing}></View>
        <Weather currentWeather={this.state.currentWeather} />
        <Forecasts dailyForecasts={this.state.dailyForecasts} />
      </ScrollView>
    )
  }

  renderStatus() {
    return (
      <View style={styles.statusContainer}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  contentSpacing: {
    marginTop: Dimensions.get('screen').height / 8,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

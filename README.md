# WeConnect Weather App
Social app assessment for Henri Home, including users directory, feed, and todo list tabs, based on instructions found [here](https://github.com/henri-home/henri-mobile-interview-project)

# Demo App
- You can access the demo app from the Expo Client you have installed on your phone by following this url: https://exp.host/@509dave16/Weather
- Or you can install the [APK](https://drive.google.com/file/d/1hJilsxqOO7fUowKxjkvjP3Mdi0UtAuhH/view?usp=sharing) on your device, following the instructions here: https://docs.expo.io/distribution/building-standalone-apps/#5-test-it-on-your-device-or

# Local Environment Instructions
- Install nvm in order to use Node 12.13.1: https://github.com/nvm-sh/nvm#installing-and-updating
- `nvm install v12.13.1`
- `nvm use v12.13.1`
- `npm i -g expo-cli`
- `git clone https://github.com/509dave16/weconnect-weather-app.git`
- `cd weconnect-weather-app`
- `npm i`
- `expo start`
- Then either press `i` or `a` to open the app in an iOS Simulator or Android Emulator respectively. In addition, you can also access the local app from your iOS or Android device if you have the Expo Client installed. Just view the QR code in the terminal using your iOS device's camera app. Or by pressing `Scan QR Code` on the **Projects** tab of the Expo Client on Android.

# Additional Packages Used
- **"react-native-safe-area-context": "~3.0.7"** - This package was added to better handle notched devices that have not safe areas on the bottom and top of there screen.

# Directory Structure
- `components` - Every React component resides here. If we had a more complex app, there would be subdirectories for `containers`, `widgets`, and `screens`.
- `config` - Anything related to configuration like colors, dimensions, shared styles, env variables, etc... should go here
- `services` - Any integrations with services such as the backend, OpenWeather, etc... should go here
- `interfaces` - Folder contains all interface and enum definitions that are used throughout the code base

# Design
## Summary
In general my approach to implementing the design for a screen/feature, is to work my way from the backend to the frontend. And it is the approach that I took with this project. However there are cases where it's better to go from frontend to backend such as for prototyping and feeling out use cases before settling on an API specification.

## Data Fetching
It is very easy to write data fetching logic in any part of your JS codebase using the `fetch` or `XMLHttpRequest` apis. However, in order to maximize re-usability and reduce maintenance of our OpenWeather data fetching code, I made a `services` folder in which I put the `openWeather.ts` service. I could have included "service" in the file name like what developers tend to do in Angular projects(i.e. `openWeather.service.ts`). But I figured that the parent folder `services` was enought context for understanding the concept that the file correlates to.

In this file that we have a common `openWeatherRequest` function that is used to communicate with the API for the `weather` and `forecast` endpoints. That way the same response handling can be applied no matter which endpoint/resource we are interacting with in the OpenWeather API. The lifecycle of the fetching process consists of the following stages: **fetch**, **check**, **transform**. 
- **fetch** is where we are requesting the data and waiting for a response.
- **check** is for determining what the `state` of the response from the API is, which can be one of the following: `ERROR`, `EMPTY`, or `SUCCESS`. We include what might considered an extra state called `EMPTY` to help differentiate between when the data is being fetched and when it has completed being fetched but it is empty.
- **transform** is for deriving the appropriate data structure from the fetched resource that matches the interface that we work with in our application state. It's bit contrived considering that I didn't change to much about the original resource. But this meant to highlight how it's good to not directly depend on the exact API specification for a returned resource. Reason being that if we switch to use a different weather API other than OpenWeather our application will contain data structures and client code that is focused around using the OpenWeather API. So if we have our own interface that we transform data to then we don't have to worry as much about the API we are using changing because all we would have to do is change the transforms and endpoints used.

### Deriving Daily Forecast Data
- The original key provided and the key that I generated for myself both give access to API usage under the **Free Plan**. At that time that I was implementing the project, the `onecall` OpenWeather endpoing was to the best of my knowledge not available under the **Free Plan**. So in order to get `AM` and `PM` period data for each day, we derived it from the `forecast` endpoint by grouping the 3 hour periods by their date and then picking from each group the max and min weather by temperature which were assigned to the `AM` and `PM` period data respectively. It would be an improvement to transition from using the `forecast` endpoint to instead leveraging the `onecall` endpoint which has `daily` data containing `morn`, `day`, `eve`, and `night` actual temps and feels like temps. However it only contains one `weather` condition for the entire day. And we need the `weather` condition for `AM` and `PM`. So that would be one caveat that might dissuade us from transitioning.



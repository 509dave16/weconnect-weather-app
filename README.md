# WeConnect Weather App
Social app assessment for Henri Home, including users directory, feed, and todo list tabs, based on instructions found [here](https://github.com/henri-home/henri-mobile-interview-project)

# Demo App
- You can access the demo app from the Expo Client you have installed on your phone by following this url: https://exp.host/@509dave16/Weather
- Or you can install the [APK](https://drive.google.com/file/d/1hJilsxqOO7fUowKxjkvjP3Mdi0UtAuhH/view?usp=sharing) on your device, following the instructions here: https://docs.expo.io/distribution/building-standalone-apps/#5-test-it-on-your-device-or

# Local Environment Instructions
- Install nvm in order to use Node 12.13.1: https://github.com/nvm-sh/nvm#installing-and-updating
- `nvm install v12.13.1`
- `nvm use v12.13.1`
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

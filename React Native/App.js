import React, { Component } from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';
import ThirdPage from './components/ThirdPage';
import BeaconPage from './components/BeaconPage';
import HeatMap from './components/HeatMap';

const App = createStackNavigator({
    FirstPage: { screen: FirstPage },
    SecondPage: { screen: SecondPage },
    ThirdPage: { screen: ThirdPage },
    BeaconPage: { screen: BeaconPage },
    HeatMap: { screen: HeatMap }
  },
  {
    initialRouteName: 'FirstPage',
  }
);

export default createAppContainer(App);

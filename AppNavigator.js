import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home';
import SearcWorkersScreen from './src/screens/Search/Workers';
import SetLocationScreen from './src/screens/Location/SetLocation';
import Signin from './src/screens/Signin';
import OTP from './src/screens/OTP';

import { DetailsScreen } from './src/screens/Detail';
import PostAdScreen from './src/screens/PostAd';
import ListAdScreen from './src/screens/Listings/Ads';
const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
      <Navigator headerMode='none'>
      <Screen name='Signin' component={Signin}/>
      <Screen name='Home' component={HomeScreen}/>

      <Screen name='ListAd' component={ListAdScreen}/>
      <Screen name='PostAd' component={PostAdScreen}/>
      <Screen name='SetLocation' component={SetLocationScreen}/>
      <Screen name='OTP' component={OTP}/>
      
      <Screen name='SearchWorkers' component={SearcWorkersScreen}/>
      <Screen name='Details' component={DetailsScreen}/>
      
    </Navigator>
  </NavigationContainer>
);
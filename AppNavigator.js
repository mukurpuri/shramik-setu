import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import _ from 'lodash';
const { Navigator, Screen } = createStackNavigator();
import { connect } from 'react-redux';

import HomeScreen from './src/screens/Home';
import OTPScreen from './src/screens/OTP';
import DashboardScreen from './src/screens/Dashboard';
import RegisterScreen from './src/screens/Register';
import ProfilePictureScreen from './src/screens/ProfilePictureScreen';
import MyProfileScreen from './src/screens/MyProfile';
import WelcomeScreen from './src/screens/Welcome';
import CreateQuestionScreen from './src/screens/Create/Question';


import QAScreen from './src/screens/QA';



const AppNavigator = props => {
  
  let userIsLoggedIn = props.user && props.user.phoneNumber && props.user.phoneNumber.length > 0 ? true : false;
  let userIsRegistered = props.user && props.user.isRegistered;
  let primaryScreen = "Home";
  if(userIsLoggedIn) {
    if(userIsRegistered) {
      primaryScreen = "Dashboard";
    } else {
      primaryScreen = "Register";
    }
  }
  /* Temp screen renderer */
    primaryScreen = "Dashboard"
  /* */
  return <NavigationContainer>
      <Navigator headerMode='none'>
        {fetchScreen(primaryScreen)}
      </Navigator>
  </NavigationContainer>
};
let screens = [
  { name: "OTP", component: OTPScreen},
  { name: "Home", component: HomeScreen},
  { name: "MyProfile", component: MyProfileScreen},
  { name: "Welcome", component: WelcomeScreen},
  { name: "ProfilePicture", component: ProfilePictureScreen},
  { name: "Register", component: RegisterScreen},
  { name: "Dashboard", component: DashboardScreen},
  { name: "QA", component: QAScreen },
  { name: "CreateQuestion", component: CreateQuestionScreen }

];
function getComponent(str) {
  let com = _.find(screens, s => {
    return s.name === str;
  });
  return com.component;
}
function fetchScreen(firstScreen) {
  let screensComp = [];
  screensComp.push(<Screen key={`key-comp-${firstScreen}`} name={firstScreen} component={getComponent(firstScreen)}></Screen>);
  _.each(screens, screen => {
    if(screen.name !== firstScreen) {
      screensComp.push(<Screen key={`key-comp-${screen.name}`} name={screen.name} component={screen.component}></Screen>)
    }
  });
  return screensComp;
}
const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
export default connect(mapStateToProps)(AppNavigator);

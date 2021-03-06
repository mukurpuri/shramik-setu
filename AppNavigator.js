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
import EditProfileScreen from './src/screens/EditProfile';
import WelcomeScreen from './src/screens/Welcome';
import CreateQuestionScreen from './src/screens/Create/Question';

import ConnectScreen from './src/screens/Connect';
import ForumsScreen from './src/screens/Forums';

import MessagesScreen from './src/screens/Messages';
import NotificationsScreen from './src/screens/Notifications';
import ShopScreen from './src/screens/Shop';
import QAScreen from './src/screens/QA';

import MenuScreen from './src/screens/Menu';
import AccountSettingScreen from './src/screens/AccountSetting';

import CreateShopScreen from './src/screens/Create/Shop';

import ConsoleScreen from './src/screens/Console';
import AddScreen from './src/screens/Add';

import ProfileScreen from './src/screens/Profile';
import MyListScreen from './src/screens/List/myLists';

import PhotoModalScreen from './src/screens/PhotoModal';

import MyBannersScreen from './src/screens/Banners';
import AddBannersScreen from './src/screens/Banners/addNew';

const AppNavigator = props => {
  
  let userIsLoggedIn = props.user && props.user.phoneNumber && props.user.phoneNumber.length > 0 ? true : false;
  let userIsRegistered = props.user && props.user.isRegistered;
  let primaryScreen = "Home";
  if(userIsLoggedIn) {
    if(userIsRegistered) {
      primaryScreen = "Connect";
    } else {
      primaryScreen = "Register";
    }
  }
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
  { name: "EditProfile", component: EditProfileScreen},
  { name: "Welcome", component: WelcomeScreen},
  { name: "ProfilePicture", component: ProfilePictureScreen},
  { name: "Register", component: RegisterScreen},
  { name: "Dashboard", component: DashboardScreen},
  { name: "QA", component: QAScreen },
  { name: "CreateQuestion", component: CreateQuestionScreen },

  { name: "Connect", component: ConnectScreen},
  { name: "Forums", component: ForumsScreen},

  { name: "Messages", component: MessagesScreen},
  { name: "Notifications", component: NotificationsScreen},
  { name: "Shop", component: ShopScreen},
  { name :"Menu", component: MenuScreen},

  { name: "AccountSetting", component: AccountSettingScreen },

  { name: "CreateShop", component: CreateShopScreen },

  { name: "Console", component: ConsoleScreen },
  { name: "Add", component: AddScreen },

  {name: "Profile", component: ProfileScreen},
  {name: "MyList", component: MyListScreen},
  {name: "PhotoModal", component: PhotoModalScreen},

  {name: "MyBanners", component: MyBannersScreen},
  {name: "AddBanners", component: AddBannersScreen}
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

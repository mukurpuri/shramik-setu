import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image, Platform } from 'react-native';
import Constants from 'expo-constants';

import * as Permissions from 'expo-permissions';

import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Spinner } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import Language from '../../config/languages/Language';
import { RightIcon } from '../../component/Icons';
import Styles from '../../styles';

import Footer from '../../component/Footer';
import CoronaTracker from './Trackers/Corona';
import TopNews from './TopNews';
import TrendingQuestions from './TrendingQuestions';
import { GetDashboardData } from '../../services/api.service';
import { CardContainer } from '../../../src/component/customComponents';
import FootbarAction from '../../component/FootbarAction';
import { EventRegister } from 'react-native-event-listeners'
import { SetExpoToken } from '../../redux/actions/settings';
import * as Notifications from 'expo-notifications';

class DashboardScreen extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
        this.state = {
          dashboardData: null,
          spinner: true
        }
    }

    componentDidMount = async () => {
      if(!this.props.settings.expoToken) {
        await this.registerForPushNotificationsAsync();
      }
      this.loadDashboardData();
      this.listener = EventRegister.addEventListener('loadDashboard', (data) => {
        this.loadDashboardData();
      })
    }

    componentWillUnmount() {
      EventRegister.removeEventListener(this.listener)
      this._isMounted = false;
    }

    registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        const token = await Notifications.getExpoPushTokenAsync();
        //this.setState({ expoPushToken: token });
        this.props.SetExpoToken(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
      };

    loadDashboardData = async () => {
      this._isMounted = true;
      if(this.props.user.phoneNumber) {
      let data = {
        state: "RJ",
        city: "Jaipur",
        expoPushToken: this.props.settings.expoToken ? this.props.settings.expoToken : null,
        id: this.props.user.id
      }
      await GetDashboardData(data).then( async res => {
        if(res && res.data && res.data.data && res.data.data.status === "pass") {
          let dashboardData = res.data.data;
          if (this._isMounted) {
            this.setState({ dashboardData, spinner: false})
          }
        }
      });
    }
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        let { dashboardData } = this.state;
        let trackerData = dashboardData ? dashboardData.tracker.corona : null;
        let qas = dashboardData ? dashboardData.qas : null;
        return (
          <View style={{flex: 1}}>
            <HeaderUser title="Home" paddBottom={0} navigation={this.props.navigation} />
            <Wrapper bg="#f5f5f5">
                {
                  this.state.spinner ?
                  <View style={Styles.alignments.full, {minHeight: 500, justifyContent: "center", alignItems: "center"}}>
                    <Spinner status="danger" size="giant"/>
                  </View>
                  :
                  <View style={{paddingBottom: 140}}>
                    <CardContainer paddLeft={15} paddRight={15} MarginTop={15} MarginBottom={5}>
                      <CoronaTracker data={trackerData.city} title="Jaipur Corona Tracker" currentLanguage={currentLanguage} />
                    </CardContainer>
                    <CardContainer paddLeft={15} paddRight={15} MarginTop={10}>
                        <TrendingQuestions questionsData={qas} navigation={this.props.navigation} title="Questions from Jaipur Citizens"/>
                    </CardContainer>
                  </View>
                }
            </Wrapper>
            <FootbarAction navigation={this.props.navigation} active="home"/>
          </View>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    gridContainer: {width: "100%"},
    dimHelper: {
      fontSize: 11,
      fontFamily: "nunito",
      color: "#9b9a9a",
      marginTop: 11,
      textAlign: "center"
    }
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      SetExpoToken: token => dispatch(SetExpoToken(token))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);


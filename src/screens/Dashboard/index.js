import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';


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

class DashboardScreen extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
        this.state = {
          dashboardData: null,
          spinner: true
        }
    }

    componentDidMount() {
      this.loadDashboardData();
      this.listener = EventRegister.addEventListener('loadDashboard', (data) => {
        this.loadDashboardData();
      })
    }

    componentWillUnmount() {
      EventRegister.removeEventListener(this.listener)
      this._isMounted = false;
    }

    loadDashboardData = async () => {
      this._isMounted = true;
      if(this.props.user.phoneNumber) {
      let data = {
        state: "RJ",
        city: "Jaipur",
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

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);


import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

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

class DashboardScreen extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          dashboardData: null,
          spinner: true
        }
    }

    componentDidMount() {
      this.loadDashboardData();
    }

    loadDashboardData = async () => {
      if(this.props.user.phoneNumber) {
      let data = {
        state: "RJ",
        city: "Jaipur",
        phoneNumber: this.props.user.phoneNumber
      }
      await GetDashboardData(data).then( async res => {
        if (res.status == 502) {
          await this.loadDashboardData();
        } else if (res.status != 200) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          await this.loadDashboardData();
        } else {
          if(res && res.data && res.data.data && res.data.data.status === "pass") {
            let dashboardData = res.data.data;
            this.setState({ dashboardData, spinner: false})
          }
          await this.loadDashboardData();
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
          <Wrapper bg="#f5f5f5">
              <HeaderUser paddBottom={0} navigation={this.props.navigation} />
              {
                this.state.spinner ?
                <View style={Styles.alignments.full, {minHeight: 500, justifyContent: "center", alignItems: "center"}}>
                  <Spinner status="danger" size="giant"/>
                </View>
                :
                <React.Fragment>
                <CardContainer paddLeft={15} paddRight={15} MarginTop={15} MarginBottom={5}>
                  <CoronaTracker data={trackerData.city} title="Jaipur Corona Tracker" currentLanguage={currentLanguage} />
                  <View style={Styles.alignments.horizontalCenter}>
                    <Text style={LocalStyles.dimHelper}>Predicting 0 Active cases on 12 February 2021</Text>
                  </View>
                </CardContainer>
                <CardContainer paddLeft={15} paddRight={15} MarginTop={10}>
                  <TrendingQuestions questionsData={qas} navigation={this.props.navigation} title="Questions from Jaipur Citizens"/>
                </CardContainer>
                </React.Fragment>
              }
          </Wrapper>
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


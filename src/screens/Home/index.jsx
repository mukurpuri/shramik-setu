import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Divider, Spinner } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, ForwardArrowIcon, UserIcon } from '../../component/Icons';
import Styles from '../../styles';

import Hero from './Hero';
import Footer from '../../component/Footer';

import { SendOTPToLogin } from '../../services/api.service';
import { OTPStatus, SubmitMobileNumberStatus } from '../../redux/actions/user';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
        phoneNumber: "",
        spinner: false,
      }
  }

  setPhoneNumber = number => {
    const { phoneNumber } = this.state;
    this.setState({
      phoneNumber: number
    })
  }

  showOTPPage = () => {
    let currentLanguage = this.props.settings.language;
    if(this.state.phoneNumber.length === 10) {
      this.setState({
        spinner: true
      }, async () => {
        await SendOTPToLogin(this.state.phoneNumber).then( res => {
          if(res && res.data && res.data.status === "pass" && res.status === 200) {
            this.setState({
              spinner: false
            }, () => {
              this.props.SubmitMobileNumberStatus(res.data.phoneNumber)
              this.props.navigation.navigate('OTP');
            });
          } else {
            this.setState({
              spinner: false
            }, () => {
              alert(Language.get("otpPage","error",currentLanguage));
            })
          }
        })
      });
    } else {
      alert(Language.get("otpPage","mobileNumberNotValid",currentLanguage))
    }
  }

    render() {
        let currentLanguage = this.props.settings.language;
        const { user } = this.props;
        return (
          <Wrapper paddRight={15} paddLeft={15}>
            <Hero data={{currentLanguage}} />
            {
              !this.state.spinner ?
              <Grid>
              <Row style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
                  <Input
                      value={this.state.phoneNumber}
                      onChangeText={this.setPhoneNumber}
                      textStyle={[LocalStyles.inputText, Styles.typograhy.nunito, { fontFamily: this.state.phoneNumber.length === 0 ? "nunito" : "nunito-bold"} ,{ letterSpacing: this.state.phoneNumber.length === 0 ? 0 : 5}]}
                      keyboardType='numeric'
                      maxLength={10}
                      size='large'
                      status='danger'
                      placeholder={Language.get("signin","phoneNumber",currentLanguage)}
              />
              </Row>
              <Row style={[Styles.alignments.row, Styles.spacings.mTopXSmall,  Styles.alignments.horizontalCenter]} >
                <Button onPress={() => this.showOTPPage()} style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='danger' accessoryRight={ForwardArrowIcon}>
                  {Language.get("signin","title",currentLanguage)}
                </Button>
              </Row></Grid>
             : <Grid><Row style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]}><Spinner status='danger' size='giant'/></Row></Grid>
            }
            <Footer/>
          </Wrapper>
        );   
    }
}


const LocalStyles = StyleSheet.create({
  inputText: {fontSize: 22, textAlign: "center", width: "94%"},
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      SubmitMobileNumberStatus: (phoneNumber) => dispatch(SubmitMobileNumberStatus(phoneNumber)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


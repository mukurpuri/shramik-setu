import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Icon, Spinner } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon } from '../../component/Icons';
import Styles from '../../styles';

import Footer from '../../component/Footer';
import { Otp } from '../../config/Images';
        

import { OTPStatus, SetUser } from '../../redux/actions/user';
import { SubmitOTPToLogin } from '../../services/api.service';

class OTPScreen extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          showOTPError: false,
          digits: "",
          spinner: false
        }
    }

    setPhoneNumber = (digits, index) => {
      this.setState({digits})
    }

    submitOTP = async () => {
      const { settings, user } = this.props;
      const OTP = this.state.digits;
      this.setState({
        showOTPError: true,
        spinner: true
        }, async () => {
          await SubmitOTPToLogin(OTP, user.phoneNumber).then( (res) => {
            if(res.status === 200) {
              if(res && res.data) {
                this.props.SetUser(res.data);
                  this.NextScreen();
              }
            } else {
                this.setState({
                    showOTPError: false,
                    spinner: false
                }, () => {
                  this.setState({
                    digits:  ""
                  });
                  alert(Language.get("otpPage","otpErrorNotreceived",this.props.settings.language))
                })
            }
          })
      });
    }

    NextScreen = () => {
      const { isRegistered } = this.props.user;
      if(isRegistered) {
        this.props.navigation.navigate("Dashboard");
      } else {
        this.props.navigation.navigate("Register");
      }
    }
    
    render() {
        let currentLanguage = this.props.settings.language;

        return (
          <Wrapper paddLeft={15} paddRight={15}>
            <View style={{marginTop: 50}}>
              <View style={[Styles.spacings.mTopXLarge]}>
                <View style={[Styles.alignments.verticalCenter]}>
                    <Image style={[LocalStyles.image]} source={Otp}/>
                    <Text style={[Styles.typograhy.strong, Styles.spacings.mTopMedium]} category="h3">{Language.get("otpPage", "title", currentLanguage)}</Text>
                    <Text style={[Styles.spacings.mTopXSmall, {fontFamily: "nunito-semibold"}]} category="h6">{Language.get("otpPage", "subtitle", currentLanguage)}</Text>
                    <Text style={[Styles.typograhy.strong, Styles.spacings.mTopXSmall]} category="h6">+91 {this.props.user.phoneNumber}</Text>
                    <View style={[LocalStyles.gridContainer]}>
                    <Grid style={[LocalStyles.container, Styles.spacings.mTopMedium]}>
                        <Col size={25}></Col>
                        <Col size={50}>
                              <Input
                                onChangeText={(number) => this.setPhoneNumber(number)}
                                value={this.state.digits}
                                textStyle={[LocalStyles.otpInput, Styles.typograhy.strong]}
                                keyboardType='numeric'
                                maxLength={4}
                                placeholder="* * * *"
                                size='large'/>
                         </Col>
                         <Col size={25}></Col>
                    </Grid>
                    </View>
                    <View style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
                    {
                      this.state.spinner ? 
                      <Spinner size='giant'/>
                      : 
                      <Button onPress={() => this.submitOTP()} style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='primary' accessoryRight={RightIcon}>
                          {Language.get("otpPage","submitOTP",currentLanguage)}
                      </Button>
                    }
                    </View>
                </View>
              </View>
            </View>
            <Footer/>
          </Wrapper>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    gridContainer: {width: "100%"},
    otpInput: { textAlign: "center", fontSize: 30, fontFamily: "nunito-bold" },
    image: { width: 80, height: 80},
    container: { width: "100%","justifyContent": "space-between" },
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      OTPStatus: status => dispatch(OTPStatus(status)),
      SetUser: data => dispatch(SetUser(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);


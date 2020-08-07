import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image, ImageBackground } from 'react-native';

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
import { SetuLogo } from '../../config/Images';
import Header from './header';
class Console extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          spinner: false
        }
    }
    
    render() {
        let currentLanguage = this.props.settings.language;

        return (
            <View style={{flex: 1 }}>
            <Header navigation={this.props.navigation} />
            <Wrapper bg="#f4f4f4">
              <Text>fwef</Text>
            </Wrapper>
          </View>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Console);


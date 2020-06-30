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
import { Keys } from '../../config/Images';

import { SendOTPToLogin } from '../../services/api.service';
import { OTPStatus, SubmitMobileNumberStatus } from '../../redux/actions/user';

class Signin extends React.Component {
    constructor(props) {
      super(props);  
      this.state = {
          phoneNumber: "",
          spinner: false,
        }
    }

    setPhoneNumber = number => {
      const { phoneNumber } = this.state;
      if(number.length <= 10) {
        this.setState({
          phoneNumber: number
        })
      }
    }

    showOTPPage = () => {
      let currentLanguage = this.props.settings.language;
      if(this.state.phoneNumber.length === 10) {
        this.setState({
          spinner: true
        }, async () => {
          await SendOTPToLogin(this.state.phoneNumber).then( res => {
            if(res && res.data && res.data.status === "pass" && res.status === 200) {
                this.props.SubmitMobileNumberStatus(res.data.status,res.data.phoneNumber)
                this.props.navigation.navigate('OTP');
            } else {
              alert(Language.get("otpPage","error",currentLanguage))      
            }
          })
        });
      } else {
        alert(Language.get("otpPage","mobileNumberNotValid",currentLanguage))
      }
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
          <Wrapper>
            <View>
              <View style={[Styles.spacings.mTopXLarge]}>
                <View style={[Styles.alignments.verticalCenter]}>
                    <Image style={[LocalStyles.image]} source={Keys}/>
                    <Text style={[Styles.typograhy.strong, Styles.spacings.mTopMedium]} category="h3">{Language.get("signin", "title", currentLanguage)}</Text>
                    <Grid style={[LocalStyles.container, Styles.spacings.mTopSmall]}>
                        {
                          this.props.user.type === "Worker" ? 
                          <Grid>
                            <Row style={[Styles.spacings.mTopSmall]}>
                              <Col size={12}>
                                  <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                              </Col>
                              <Col size={88}>
                                  <Text style={LocalStyles.listText}>{Language.get("location", "list", currentLanguage)[1]}</Text>
                              </Col>
                            </Row>
                            <Row style={[Styles.spacings.mTopSmall]}>
                              <Col size={12}>
                                  <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                              </Col>
                              <Col size={88}>
                                  <Text style={LocalStyles.listText}>{Language.get("location", "list", currentLanguage)[3]}</Text>
                              </Col>
                            </Row>
                          </Grid>
                         : 
                         <Grid>
                          <Row style={[Styles.spacings.mTopSmall]}>
                            <Col size={12}>
                                <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                            </Col>
                            <Col size={88}>
                                <Text style={LocalStyles.listText}>{Language.get("location", "list", currentLanguage)[0]}</Text>
                            </Col>
                          </Row>
                          <Row style={[Styles.spacings.mTopSmall]}>
                            <Col size={12}>
                                <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                            </Col>
                            <Col size={88}>
                                <Text style={LocalStyles.listText}>{Language.get("location", "list", currentLanguage)[4]}</Text>
                            </Col>
                          </Row>
                        </Grid>
                        }
                        
                    </Grid>
                        <View style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
                            <Input
                                onPress={() => this.onPhoneNumberPressed()}
                                value={this.state.phoneNumber}
                                onChangeText={this.setPhoneNumber}
                                style={[Styles.alignments.full]}
                                textStyle={[Styles.alignments.full, LocalStyles.inputFile]}
                                keyboardType='numeric'
                                size='large'
                                placeholder={Language.get("signin","phoneNumber",currentLanguage)}
                        />
                        </View>
                        <View style={[Styles.alignments.row, Styles.spacings.mTopXSmall,  Styles.alignments.horizontalCenter]} >
                        {
                          this.state.spinner ? 
                          <Spinner size='giant'/> :
                          
                            <Button onPress={() => this.showOTPPage()} style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='primary' accessoryRight={RightIcon}>
                                {Language.get("signin","submitPhoneNumber",currentLanguage)}
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
    image: { width: 80, height: 80},
    icon: { width: 22, height: 22, },
    
    container: { width: "85%" },
    listText: { fontSize: 16, fontWeight: "bold" }
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      SubmitMobileNumberStatus: (status, phoneNumber) => dispatch(SubmitMobileNumberStatus(status, phoneNumber)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Signin);


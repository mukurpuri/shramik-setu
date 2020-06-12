import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Icon } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon } from '../../component/Icons';
import Styles from '../../styles';

import Footer from '../../component/Footer';
import { Otp } from '../../config/Images';

class OTP extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
          <Wrapper>
            <View>
              <View style={[Styles.spacings.mTopXLarge]}>
                <View style={[Styles.alignments.verticalCenter]}>
                    <Image style={[LocalStyles.image]} source={Otp}/>
                    <Text style={[Styles.typograhy.strong, Styles.spacings.mTopMedium]} category="h3">{Language.get("otpPage", "title", currentLanguage)}</Text>
                    <Text style={[Styles.spacings.mTopXSmall]} category="h6">{Language.get("otpPage", "subtitle", currentLanguage)}</Text>
                    <Text style={[Styles.typograhy.strong, Styles.spacings.mTopXSmall]} category="h6">+91 7042107850</Text>
                    <View style={[LocalStyles.gridContainer]}>
                    <Grid style={[LocalStyles.container, Styles.spacings.mTopMedium]}>
                      <Col size={25}>
                        <Input
                                textStyle={[LocalStyles.otpInput]}
                                keyboardType='numeric'
                                size='large'/>
                      </Col>
                      <Col style={Styles.spacings.pLeftXSmall} size={25}>
                        <Input
                                textStyle={[LocalStyles.otpInput]}
                                keyboardType='numeric'
                                size='large'/>
                      </Col>
                      <Col style={Styles.spacings.pLeftXSmall} size={25}>
                        <Input
                                textStyle={[LocalStyles.otpInput]}
                                keyboardType='numeric'
                                size='large'/>
                      </Col>
                      <Col style={Styles.spacings.pLeftXSmall} size={25}>
                        <Input
                                textStyle={[LocalStyles.otpInput]}
                                keyboardType='numeric'
                                size='large'/>
                      </Col>
                    </Grid>
                    </View>
                    <View style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
                            <Button style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='primary' accessoryRight={RightIcon}>
                                {Language.get("otpPage","submitOTP",currentLanguage)}
                            </Button>
                        </View>
                    {/* <Text style={[Styles.typograhy.strong, Styles.spacings.mTopMedium]} category="h3">{Language.get("otpPage", "title", currentLanguage)}</Text>
                        <View style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
                            <Input
                                style={[Styles.alignments.full, {color: "red !important"}]}
                                keyboardType='numeric'
                                size='large'
                                placeholder={Language.get("signin","phoneNumber",currentLanguage)}
                        />
                        </View>
                        <View style={[Styles.alignments.row, Styles.spacings.mTopXSmall,  Styles.alignments.horizontalCenter]} >
                            <Button style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='primary' accessoryRight={RightIcon}>
                                {Language.get("signin","submitPhoneNumber",currentLanguage)}
                            </Button>
                        </View> */}
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
    otpInput: { textAlign: "center", fontSize: 30, fontWeight: "bold" },
    image: { width: 80, height: 80},
    container: { width: "100%","justifyContent": "space-between" },
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(OTP);


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
import { Rangoli } from '../../config/Images';

import { SendOTPToLogin } from '../../services/api.service';
import { OTPStatus, SubmitMobileNumberStatus } from '../../redux/actions/user';

class WelcomeScreen extends React.Component {
    constructor(props) {
      super(props);  
      this.state = {
          user: this.props.user
        }
    }

    continue = () => {
        this.props.navigation.navigate("Dashboard");
    }
    
    componentWillUnmount() {
        this.setState({
            user: null
        })
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
          <Wrapper paddRight={15} paddLeft={15}>
            <View>
              <View style={[Styles.spacings.mTopXLarge]}>
                <View style={[Styles.alignments.verticalCenter]}>
                    <Image style={[LocalStyles.image]} source={Rangoli}/>
                </View>
                <View style={[Styles.alignments.verticalCenter, Styles.spacings.mTopMedium]}>
                    <Text category="h1" style={Styles.typograhy.strong} > 
                     Hello {this.state.user && this.state.user.name ? this.state.user.name.split(" ")[0] :  ""}
                    </Text>
                </View>
                <View style={[Styles.alignments.verticalCenter]}>
                    <Text category="h4" style={Styles.typograhy.strong}> 
                        Welcome to Setu
                    </Text>
                </View>
                
                <Grid style={[LocalStyles.container, Styles.spacings.mTopSmall]}>
                        <Row style={[Styles.spacings.mTopSmall]}>
                        <Col size={12}>
                            <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                        </Col>
                        <Col size={88}>
                            <Text style={LocalStyles.listText, Styles.typograhy.strong}>{Language.get("location", "list", currentLanguage)[0]}</Text>
                        </Col>
                        </Row>
                        <Row style={[Styles.spacings.mTopSmall]}>
                        <Col size={12}>
                            <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                        </Col>
                        <Col size={88}>
                            <Text style={LocalStyles.listText, Styles.typograhy.strong}>{Language.get("location", "list", currentLanguage)[1]}</Text>
                        </Col>
                        </Row>
                        <Row style={[Styles.spacings.mTopSmall]}>
                        <Col size={12}>
                            <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                        </Col>
                        <Col size={88}>
                            <Text style={LocalStyles.listText, Styles.typograhy.strong}>{Language.get("location", "list", currentLanguage)[2]}</Text>
                        </Col>
                        </Row>
                        <Row style={[Styles.strong, Styles.spacings.mTopXSmall]}>
                            <Button onPress={() => this.continue()} style={[Styles.alignments.full, LocalStyles.button, Styles.spacings.mTopMedium, Styles.typograhy.strong]}  size='giant' status='danger' accessoryRight={RightIcon}>
                                {Language.get("location","buttonAddress",currentLanguage)}
                            </Button>
                        </Row>
                    </Grid>
              </View>
            </View>
            {/* <Footer/> */}
          </Wrapper>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    image: { width: 80, height: 80},
    icon: { width: 22, height: 22, },
    
    container: { width: "85%", marginLeft: "auto", "marginRight" : "auto"},
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
  
export default connect(mapStateToProps)(WelcomeScreen);


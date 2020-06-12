import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Icon, Radio,  TopNavigation, TopNavigationAction, Divider } from '@ui-kitten/components';

import  Wrapper from '../../../component/Wrapper';
import Language from '../../../config/languages/Language';
import { PinIcon, BackIcon, PlaneIcon } from '../../../component/Icons';
import Styles from '../../../styles';

import Footer from '../../../component/Footer';
import { Otp } from '../../../config/Images';

class ListAdScreen extends React.Component {
    constructor(props) {
        super(props);
    }


    renderBackAction = () => (
      <TopNavigationAction onPress={() => {console.log("fewfw")}} icon={BackIcon}/>
    );
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
            <Wrapper>
            <TopNavigation
                  title={Language.get("listAdd", "title", currentLanguage)}
                  subtitle={Language.get("listAdd","subtitle", currentLanguage)}
                  accessoryLeft={this.renderBackAction}
              />
              <Divider/>
              <View>
                <Grid>
                </Grid>
              </View>
              <Footer/>
            </Wrapper>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    image: { width: 60, height: 50},
    icon: { width: 22, height: 22, },
    container: { width: "85%" },
    listText: { fontSize: 16, fontWeight: "bold" }
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ListAdScreen);


import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet } from 'react-native';

//import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Divider } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, SearchIcon, UserIcon } from '../../component/Icons';
import Styles from '../../styles';

import Hero from './Hero';
import Footer from '../../component/Footer';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    openSearchWorkerPage = () => {
      this.props.navigation.navigate('Signin');
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
          <Wrapper>
            <Hero data={{currentLanguage}} />
            {/* <View style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
              <Input
                  style={[Styles.alignments.full, {color: "red !important"}]}
                  keyboardType='numeric'
                  size='large'
                  placeholder={Language.get("inputs","phoneNumber",currentLanguage)}
              />
            </View>
            <View style={[Styles.alignments.row, Styles.spacings.mTopXSmall,  Styles.alignments.horizontalCenter]} >
              <Button style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='primary' accessoryRight={RightIcon}>
                {Language.get("inputs","submitPhoneNumber",currentLanguage)}
              </Button>
            </View> */}
            <View style={[Styles.alignments.row, Styles.spacings.mTopXSmall,  Styles.alignments.horizontalCenter]} >
              <Button onPress={() => this.openSearchWorkerPage()} style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='primary' accessoryRight={SearchIcon}>
                {Language.get("inputs","searchJobs",currentLanguage)}
              </Button>
            </View>
            <View style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
                    <Text style={[Styles.typograhy.strong,Styles.typograhy.center, Styles.alignments.horizontalCenter]} category='h6'>{Language.get("title","postJob",currentLanguage)}</Text>
                </View>
            <View style={[Styles.alignments.row, Styles.spacings.mTopXSmall,  Styles.alignments.horizontalCenter]} >
              <Button onPress={() => this.openSearchWorkerPage()} style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='danger' accessoryRight={UserIcon}>
                {Language.get("title","postJobButton",currentLanguage)}
              </Button>
            </View>
            <Footer/>
          </Wrapper>
        );   
    }
}


const LocalStyles = StyleSheet.create({
  phoneNumber: { fontSize: 123 },
  button: { fontSize: 432423}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


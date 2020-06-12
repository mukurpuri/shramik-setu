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
import { Keys } from '../../config/Images';

class Signin extends React.Component {
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
                    <Image style={[LocalStyles.image]} source={Keys}/>
                    <Text style={[Styles.typograhy.strong, Styles.spacings.mTopMedium]} category="h3">{Language.get("signin", "title", currentLanguage)}</Text>
                        <View style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
                            <Input
                                style={[Styles.alignments.full]}
                                textStyle={[Styles.alignments.full, LocalStyles.inputFile]}
                                keyboardType='numeric'
                                size='large'
                                placeholder={Language.get("signin","phoneNumber",currentLanguage)}
                        />
                        </View>
                        <View style={[Styles.alignments.row, Styles.spacings.mTopXSmall,  Styles.alignments.horizontalCenter]} >
                            <Button style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='primary' accessoryRight={RightIcon}>
                                {Language.get("signin","submitPhoneNumber",currentLanguage)}
                            </Button>
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
    inputFile: {fontSize: 20, textAlign: "center", fontWeight: "bold"},
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Signin);


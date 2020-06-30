import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

import Language from '../../../config/languages/Language';
import Images, { SetuCover, SetuTextLogo } from '../../../config/Images';

import Styles from '../../../styles';

class Hero extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { currentLanguage } = this.props.data;
        return (
            <View style={{marginTop: 50}}>
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter]} >
                    <Image style = {[HeroStyles.textImage]} source={SetuTextLogo}/>
                </View>
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]} >
                    <Image style = {[HeroStyles.image]} source={SetuCover}/>
                </View>
                <View style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
                    <Text style={[HeroStyles.moto,Styles.typograhy.center, Styles.alignments.horizontalCenter]} category='h5'>{Language.get("title","moto",currentLanguage)}</Text>
                </View>
            </View>
        );   
    }
}

const HeroStyles = StyleSheet.create({
    moto: { width: "90%", fontFamily: "nunito-bold", fontSize: 19},
    phoneNumber: { fontSize: 40 },
    image: { width: 250, height: 170 },
    textImage: { width: 200, height: 170 }
});
  
  
export default Hero;

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

import Language from '../../../config/languages/Language';
import Images, { SetuCover } from '../../../config/Images';

import Styles from '../../../styles';

class Hero extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { currentLanguage } = this.props.data;
        return (
            <View>
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter]} >
                    <Text style={Styles.typograhy.superText} category='h1'>{Language.get("title","name",currentLanguage)}</Text>
                </View>
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]} >
                    <Image style = {[HeroStyles.image]} source={SetuCover}/>
                </View>
                <View style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
                    <Text style={[HeroStyles.moto,Styles.typograhy.strong,Styles.typograhy.center, Styles.alignments.horizontalCenter]} category='h5'>{Language.get("title","moto",currentLanguage)}</Text>
                </View>
            </View>
        );   
    }
}

const HeroStyles = StyleSheet.create({
    moto: { width: "70%"},
    phoneNumber: { fontSize: 40 },
    image: { width: 200, height: 120 }
});
  
  
export default Hero;

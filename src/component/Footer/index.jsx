import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@ui-kitten/components';

import { setLanguage } from '../../redux/actions/settings';

import Styles from '../../styles';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    setLang = lang => {
        this.props.setLanguage(lang)
    }

    isActive = lang => {
        const { settings } = this.props;
        return lang === settings.language ? "active" : ""
    }
    render() {
        let currentLanguage = this.props.settings.language;
        let isHindiLanguageSelected = this.isActive("hi");
        let isEnglishLanguageSelected = this.isActive("en");
        return (
            <View style={[Styles.alignments.row, Styles.spacings.mTopLarge,Styles.spacings.mBottomSmall,  Styles.alignments.horizontalCenter]} >
                <TouchableOpacity onPress={() => this.setLang("hi")}>
                    <Text style={[Styles.alignments.row, LocalStyles.linkText, Styles.spacings.mLeftXSmall, isHindiLanguageSelected === "active" ? LocalStyles.linkTextActive : {} ]}>हिन्दी</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setLang("en")}>
                    <Text style={[Styles.alignments.row, LocalStyles.linkText, Styles.spacings.mLeftXSmall, isEnglishLanguageSelected === "active" ? LocalStyles.linkTextActive : {}  ]}>English</Text>
                </TouchableOpacity>
            </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    linkText: { color: "#3366FF"},
    linkTextActive: {textDecorationColor: "#3366FF", textDecorationStyle: "dotted" , textDecorationLine: "underline", "fontWeight": "bold"}
});
const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: language => dispatch(setLanguage(language))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Footer);

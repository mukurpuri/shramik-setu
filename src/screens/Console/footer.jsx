import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image, TextInput } from 'react-native';


import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Avatar } from '@ui-kitten/components';
import { EventRegister } from 'react-native-event-listeners'
import { Col, Row, Grid } from "react-native-easy-grid";



import { RightIcon, ProfileIcon, BackIcon } from '../../component/Icons';
import Styles from '../../styles';

import { GetUpdates } from '../../services/api.service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SetuTextLogo } from '../../config/Images';


class Footer extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
        this.state = {
          
        }
    }

    goBack = () => {
      this.props.navigation.goBack(null);
    }

    render() {
        let currentLanguage = this.props.settings.language;

        return (
          <View style={[LocalStyles.footer, { borderWidth: this.props.isStoryOpen ? 0 : 1 }]}>
            {/* <View style={LocalStyles.disabledFooter}></View> */}
            <Grid>
              <Col size={15} style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter, {borderRightWidth: 1, borderRightColor: "#efefef"}]}>
                <Icon fill="#888" name="smiling-face-outline" style={{width: 30, height: 30}}/>
              </Col>
              <Col size={67}>
                <TextInput placeholderTextColor="#888" multiline={true} placeholder="Write your Message" style={LocalStyles.messageInput} />
              </Col>
              
              <Col size={18} style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter, {borderLeftWidth: 1, borderLeftColor: "#efefef"}]}>
                <Icon fill="#888" name="paper-plane-outline" style={{width: 30, height: 30}}/>
              </Col>
            </Grid>
          </View>
        );   
    }
}

const LocalStyles = StyleSheet.create({
    disabledFooter: {
      width: "100%",
      position: "absolute",
      backgroundColor: "rgba(255,255,255,0.95)",
      height: 68,
      bottom: 6,
      left: 0,
      right: 0,
      borderRadius: 6,
      zIndex: 12,
      top: 0
    },
    footer: {
        width: "95%",
        position: "absolute",
        backgroundColor: "white",
        minHeight: 55,
        bottom: 10,
        left: 10,
        right: 10,
        borderColor: "#ecebeb",
        borderRadius: 60
    },
    messageInput: {
      paddingLeft: 20,
        paddingTop: 0,
        fontFamily: "nunito-bold",
        fontSize: 17,
        color: "#444",
        maxHeight: 165,
        minHeight: 50
    }
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        UserLogout: () => dispatch(UserLogout()),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Footer);


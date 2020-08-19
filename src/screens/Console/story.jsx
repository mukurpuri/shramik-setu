import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image, Dimensions } from 'react-native';


import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Avatar } from '@ui-kitten/components';
import { EventRegister } from 'react-native-event-listeners'
import { Col, Row, Grid } from "react-native-easy-grid";

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, ProfileIcon, BackIcon } from '../../component/Icons';
import Styles from '../../styles';

import { UserLogout } from '../../redux/actions/user';
import { GetUpdates } from '../../services/api.service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SetuTextLogo } from '../../config/Images';


import { getProfilePicture } from '../../utilities/helpers';


class Story extends React.Component {
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
        let g = "https://images.unsplash.com/photo-1597179761147-08a63e7622ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80";
        let storyheight = Dimensions.get('window').height;
        storyheight -= 0;
        return (
          <View style={LocalStyles.storyContainer}>
            <View style={LocalStyles.closeIcon}>
                <TouchableOpacity onPress={() => this.props.toggleStory()}>
                    <Icon name="close" fill="#fff" />
                </TouchableOpacity>
            </View>
            <View style={LocalStyles.views}>
                <Icon name="eye" fill="#fff" style={{width: 20, height: 20}} />
                <Text style={[Styles.typograhy.nunito, {color: "#fff"}]}>22</Text>
            </View>
            <View style={[LocalStyles.story,{height: storyheight}]}>
                <Image style={{resizeMode: 'contain', width: "80%", height: "80%"}} source={{uri: g}} />
            </View>
          </View>
        );   
    }
}

const LocalStyles = StyleSheet.create({
    storyContainer: {
        position: "relative"
    },
    story: {
        backgroundColor: "#000",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    closeIcon: {
        width: 35,
        height: 35,
        top: 20,
        right: 15,
        position: "absolute",
        zIndex: 12
    },
    views: {
        width: 60,
        height: 30,
        top: 20,
        left: 15,
        position: "absolute",
        zIndex: 12,
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",paddingLeft:5, paddingRight: 5
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Story);


import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';


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
import Story from './story';
import MessageContainer from './MessageContainer';

class Content extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
        this.state = {
          messages: ""
        }
    }

    goBack = () => {
      this.props.navigation.goBack(null);
    }

    closeStory = () => {
    }

    render() {
        let currentLanguage = this.props.settings.language;
        let { isStoryOpen } = this.props;
        return (
          <View style={LocalStyles.messageContainer}>
          </View>
        );   
    }
}

const LocalStyles = StyleSheet.create({
    messageContainer: {
      width: "100%",
      height: 414,
      backgroundColor: "red",
      position: "absolute"
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Content);


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

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

const MessageIcon = props => (
  <Icon {...props} name='message-circle-outline'/>
)
const NotificationIcon = props => (
  <Icon {...props} name='bell-outline' />
)


class Header extends React.Component {
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
          <View style={LocalStyles.header}>
            <View style={LocalStyles.topGapper}></View>
            <Grid>
                <Col onPress={() => this.goBack()} style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={10}>
                    <BackIcon fill="#333" style={{width: 30, height: 30}} />
                </Col>
                <Col style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={10}>
                    <View style={LocalStyles.avatar}>
                        <Image source={{uri: "https://www.w3.org/2010/Talks/06-01-steven-social3/1998-050.jpg"}} style={{width: 45, height: 45, backgroundColor: "#09F"}} />
                    </View>
                </Col>
                <Col size={5}></Col>
                <Col style={{justifyContent: "center"}} size={75}>
                    <View>
                        <Text style={[Styles.typograhy.strong, {fontSize: 19}]}>
                            Sada shiv Daal Bhandar
                        </Text>
                    </View>
                </Col>
            </Grid>
          </View>
        );   
    }
}

const LocalStyles = StyleSheet.create({
    header: {
        width: "100%",
        backgroundColor: "white",
        borderBottomColor: "#efefef",
        borderBottomWidth: 1,
        height: 90,
    },
    avatar: {
        width: 45,
        height: 45,
        backgroundColor: "red",
        borderRadius: 80,
        overflow: "hidden"
    },
    topGapper: {
        width: "100%",
        height: 26,
        backgroundColor: "rgba(0,0,0,0.1)"
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);


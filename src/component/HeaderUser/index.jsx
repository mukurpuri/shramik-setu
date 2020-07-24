import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';


import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Avatar } from '@ui-kitten/components';
import { EventRegister } from 'react-native-event-listeners'

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, ProfileIcon, GlobeIcon } from '../../component/Icons';
import Styles from '../../styles';

import { UserLogout } from '../../redux/actions/user';
import { GetUpdates } from '../../services/api.service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SetuTextLogo } from '../../config/Images';
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


class HeaderUser extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
        this.state = {
          menuVisible: false,
          refreshDelay: 1000,
          showMenu: true,
          requests: {
            messages: 0,
            notifications: 0
          }
        }
    }

    componentDidMount = () => {
      this.interval = setInterval(this.getHeaderUpdates, this.state.refreshDelay);
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevState.delay !== this.state.refreshDelay) {
        clearInterval(this.interval);
        this.interval = setInterval(this.getHeaderUpdates, this.state.refreshDelay);
      }
    }

    componentWillUnmount() {
      clearInterval(this.interval);
      this._isMounted = false;
    }

    getHeaderUpdates = async () => {
      this._isMounted = true;
      await GetUpdates(this.props.user.id).then(res => {
        if(res.status === 200) {
          if(this._isMounted) {
            this.setState({
              requests: res.data.requests || {
                messages: 0,
                notifications: 0
              }
            })
          }
        }
      });
    }

    toggleMenu = () => {
      this.props.navigation.navigate("Menu");
    };

    showMessageScreen = () => {
      this.props.navigation.navigate("Messages");
    }

    showNotificationScreen = () => {
      EventRegister.emit('loadNotifications');
      this.props.navigation.navigate("Notifications");
    }

    logout = async () => {
      await this.props.UserLogout();
      this.props.navigation.navigate("Home");
    }
    showMyProfle = () => {
      this.props.navigation.navigate("MyProfile");
    }
    showHome = () => {
        this.props.navigation.navigate("Dashboard");
    }
    RenderTitle = (title) => {
      return (
      <View style={LocalStyles.titleContainer}>
        {
          this.props.showBack ? 
          <Icon onPress={() => this.props.leftIconCall()} style={LocalStyles.headerIcon} fill="#333" name="arrow-back-outline" /> : null
        }
        <Image source={SetuTextLogo} style={{width: 45, height: 45}} />
      </View>);
    }
    render() {
        let currentLanguage = this.props.settings.language;
        const renderRightActions = () => (
          <React.Fragment>
          <View style={{width: 188, flexDirection: "row"}}>
          <View  style={LocalStyles.headerIcons}>
            <TouchableOpacity style={LocalStyles.headerTouch} onPress={() => this.showMessageScreen()}>
              {
                this.state.requests.messages > 0 ?
                <Text style={LocalStyles.notificationBubble}>{this.state.requests.messages}</Text> : 
                null
              }
              <TopNavigationAction icon={MessageIcon} />
            </TouchableOpacity>
          </View>
          <View  style={LocalStyles.headerIcons}>
            <TouchableOpacity style={LocalStyles.headerTouch} onPress={() => this.showNotificationScreen()}>
              {
                this.state.requests.notifications > 0 ?
                <Text style={LocalStyles.notificationBubble}>{this.state.requests.notifications}</Text> : 
                null
              }
              <TopNavigationAction icon={NotificationIcon} />
            </TouchableOpacity>
          </View>
          <View  style={LocalStyles.headerIcons} >
            <TouchableOpacity style={LocalStyles.headerTouch} onPress={() => this.toggleMenu()}>
              <TopNavigationAction icon={MenuIcon} />
            </TouchableOpacity>
          </View>
          </View>
          {
            this.props.hideHam && this.props.rightIcon ? (
              <Icon onPress={() => this.props.leftIconCall()} style={LocalStyles.headerIcon} fill="#333" name={this.props.rightIcon} />
            ) : <View style={{width: 20, height: 40}}>
            </View>
          }
          </React.Fragment>
        );

        return (
          <View style={{paddingTop: 0, width: "100%"}}>
            <TopNavigation
              style={{paddingTop: 25}}
              alignment='center'
              title={() => this.RenderTitle(this.props.title)}
              accessoryRight={renderRightActions}
            >
            </TopNavigation>
            <Divider/>
          </View>
        );   
    }
}

const LocalStyles = StyleSheet.create({
    gridContainer: {width: "100%"},
    titleInner: {
        fontSize: 20,
        fontFamily: "nunito-bold",
        marginTop: 12,
    },
    subTitle: {
        fontSize: 12,
        fontFamily: "nunito",
        color: "#828181"
    },
    headerIcons: {
      position: "relative", 
      width: 60, 
      height: 40,
      marginRight: 10
      },
      headerTouch: {
        justifyContent: "center", 
        alignItems: "center",
        width: "100%",
        height: 40,
      },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "flex-end",
      position: "absolute",
      left: 15,
      top:24 ,
      //position: "relative"
    },
    logo: {
      marginHorizontal: 16,
    },
    avatar: {
      width: 30,
      height:  30,
      borderRadius: 4,
      marginRight: 10
    },
    headerIcon: {
      width: 30,
      height: 30,
      marginRight: 10
    },
    notificationBubble: {
      position: "absolute",
      borderRadius: 100,
      backgroundColor: "red",
      width: 17,
      height: 17,
      color: "white",
      fontSize: 11,
      textAlign: "center",
      fontFamily: "nunito-bold",
      top: 2,
      right: 8
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
  
export default connect(mapStateToProps, mapDispatchToProps)(HeaderUser);


import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Avatar } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, ProfileIcon, GlobeIcon } from '../../component/Icons';
import Styles from '../../styles';

import Footer from '../../component/Footer';
import  { getProfilePicture } from '../../utilities/helpers';
import { UserLogout } from '../../redux/actions/user';

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

class HeaderUser extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          menuVisible: false,
          showMenu: true
        }
    }

    toggleMenu = () => {
      this.setState({
        menuVisible: !this.state.menuVisible,
      });
    };

    anchor = () => {
      return <TopNavigationAction style={LocalStyles.hamburger} icon={MenuIcon} onPress={() => this.toggleMenu()}/>
    }
    logout = async () => {
      this.toggleMenu();
      await this.props.UserLogout();
      this.props.navigation.navigate("Home");
    }
    showMyProfle = () => {
      this.toggleMenu();
      this.props.navigation.navigate("MyProfile");
    }
    showHome = () => {
        this.toggleMenu();
        this.props.navigation.navigate("Dashboard");
    }
    RenderTitle = (title) => {
      if(this.props.showBack) {
        return <View style={LocalStyles.titleContainer}>
          <Icon style={LocalStyles.headerIcon} fill="#333" name="arrow-back-outline" />
        </View>
      }
      else {
        return (
          <View style={LocalStyles.titleContainer}>
          <Image style={LocalStyles.avatar} source={getProfilePicture(this.props.user.imageID)} />
          <Text><Text style={Styles.typograhy.nunito, LocalStyles.title}><Text style={LocalStyles.titleInner}>{title}</Text></Text></Text>
      </View>)
      }
    }
    render() {
        let currentLanguage = this.props.settings.language;
        const renderRightActions = () => (
          <React.Fragment>
          {
            this.state.showMenu ? 
            <OverflowMenu
              anchor={this.anchor}
              visible={this.state.menuVisible}
              onBackdropPress={()=>this.toggleMenu()}>
              <MenuItem style={Styles.typograhy.nunito} onPress={() => this.showHome()} accessoryLeft={GlobeIcon} title='Home'/>
              <MenuItem style={Styles.typograhy.nunito} onPress={() => this.showMyProfle()} accessoryLeft={ProfileIcon} title='My Profle'/>
              <MenuItem style={Styles.typograhy.nunito} onPress={() => this.logout()} accessoryLeft={LogoutIcon} title='Logout'/>
            </OverflowMenu> : null
          }
          </React.Fragment>
        );

        return (
          <View style={{paddingTop: 0, width: "100%", left: 0}}>
            <TopNavigation
              style={{paddingTop: 25}}
              alignment='center'
              
              title={() => this.RenderTitle(this.props.title)}
              // subtitle={evaProps => <Text {...evaProps}><Text style={Styles.typograhy.nunito, LocalStyles.subTitle}>{this.props.subTitle}</Text></Text>}
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
    hamburger: {width: 40, height: 40, display: "flex", "justifyContent": "center", alignItems: "center"},
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "flex-end",
      position: "absolute",
      left: 15,
      top:30
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
      height: 30
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


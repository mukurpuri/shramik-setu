import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Alert,Dimensions } from 'react-native';


import { Text, Icon, Spinner, Button } from '@ui-kitten/components';
import { EventRegister } from 'react-native-event-listeners'
import { Col, Row, Grid } from "react-native-easy-grid";

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, ProfileIcon, BackIcon, CircularCheckIconFull } from '../../component/Icons';
import Styles from '../../styles';
import Image from 'react-native-scalable-image';
import { UserLogout } from '../../redux/actions/user';
import { 
  SaveToList,
  GetSaveInfo,
  HideUser,
  BlockUser,
  MuteUser,
  ReportUser,
  SEND_NOTIFICATIOIN,
  HideBanner
} from '../../services/api.service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SetuTextLogo } from '../../config/Images';

//import { Get } from '../../c'

import { getProfilePicture, optimizeName } from '../../utilities/helpers';


class Header extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
        this.state = {
          showSaveLoader: true,
          showOption: true,
          inList: false,
          isBannerActive: this.props.node.isBannerActive,
        }
    }

    toggleOptions = () => {
      if(this.props.node.ownerId) {
        this.props.navigation.navigate("Shop", {id: this.props.node.id});
      } else {
        this.setState({
          showOption: !this.state.showOption
        }, () => {
          if(!this.state.showOption) {
            this.loadSaveRequest();
          }
        })
      }
    }

    goBack = () => {
      this.props.navigation.goBack(null);
    }

    loadSaveRequest = async () => {
      let data = {
        entityId: this.props.node.id,
        type: this.props.node.type,
        userId: this.props.user.id
      }
      await GetSaveInfo(data).then( res => {
        if(res.status === 200) {
          this.setState({
            inList: res.data.isSaved,
            showSaveLoader: false
          })
        }
      })
    }

    saveToList = () => {
      if(!this.state.inList) {
        this.setState({
          inList: true
        }, async () => {
          let data = {
            entityId: this.props.node.id,
            type: this.props.node.type,
            userId: this.props.user.id
          }

          await SaveToList(data).then( async res => {
            if(res.status === 200) {
              if(res.data.result !== "saved") {
                this.setState({
                  inList: false
                })
              } else {
                await SEND_NOTIFICATIOIN({
                  to: this.props.node.uid,
                  sound: 'default',
                  title: 'Setu',
                  body: this.props.user.name + ` has added ` + (this.props.node.ownerId ? this.props.node.name : "you") + ` in their "Saved" List`
                });
              }
            }
          })
        })
      }
    }

    viewShop = id => {
      this.props.navigation.navigate("Shop", {id: id});
    }

    navigateBack = () => {
      if(this.props.node.type === 1) {
        EventRegister.emit("loadShopData");
      }
      if(this.props.node.type === 0) {
        EventRegister.emit("loadPeopleData");
      }
      this.props.navigation.navigate("Connect");
    }

  
    HIDE_ACCOUNT = async () => {
      let data = {
        entityId: this.props.node.id,
        type: this.props.node.type,
        createdBy: this.props.user.id
      }
      await HideUser(data).then(res => {
        alert(`This Account is now hidden from you. You can unhide it from your "Hidden" list`);
        this.navigateBack()
      });
    }

    BLOCK_ACCOUNT = async () => {
      let data = {
        entityId: this.props.node.id,
        type: this.props.node.type,
        createdBy: this.props.user.id
      }
      await BlockUser(data).then(res => {
        alert(`This Account is now Blocked from you. You can unblock it from your "Blocked" list`);
        this.navigateBack()
      });
    }

    toggleBlock =  () => {
      Alert.alert(
        "Block Account",
        "You are about to Block this Account. Are you sure?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => {
            this.BLOCK_ACCOUNT();
          } }
        ],
        { cancelable: false }
      );
    }

    toggleHide = () => {
      Alert.alert(
        "Hide Account",
        "You will not be able to view this account in your People List. Are you sure you want to hide this account?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => {
            this.HIDE_ACCOUNT();
          } }
        ],
        { cancelable: false }
      );
    }

    showMenu = () => {
      this.setState({
        showOption: !this.state.showOption
      }, () => {
        if(!this.state.showOption) {
          this.loadSaveRequest();
        }
      })
    }

    toggleBanner = () => {
      this.setState({
        isBannerActive: !this.state.isBannerActive
      }, async () => {
        let data = {
          userId: this.props.user.id,
          shopId: this.props.node.id,
          active: this.state.isBannerActive
        }
        await HideBanner(data)
      });
    }

    render() {
        let currentLanguage = this.props.settings.language;
        return (
          <React.Fragment>
          
          <View style={LocalStyles.header}>
            <Grid>
                <Col onPress={() => this.goBack()} style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={10}>
                    <BackIcon fill="#333" style={{width: 30, height: 30}} />
                </Col>
                <Col style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={15}>
                    <TouchableOpacity onPress={() => this.toggleOptions()} style={LocalStyles.avatar}>
                        <Image source={getProfilePicture(this.props.node.imageID)} width={45} />
                    </TouchableOpacity>
                    {
                      this.props.node.isVerified ?
                      <CircularCheckIconFull style={Styles.UI.headerTick} fill="#09F" /> : null
                    }
                </Col>
                <Col style={{justifyContent: "center"}} size={50}>
                    <TouchableOpacity onPress={() => this.toggleOptions()}>
                        <View style={Styles.alignments.row}>
                          <Text style={[Styles.typograhy.strong, {fontSize: 19}]}>
                            {(this.props.node.name)}
                          </Text>
                        </View>
                    </TouchableOpacity>
                </Col>
                <Col onPress={() => this.showMenu()} style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={20}>
                    <Icon name="menu-outline" fill="#333" style={{width: 30, height: 30}} />
                </Col>
            </Grid>
          </View>
          {
            this.props.node.ownerId && this.props.node.banner ?
            <View style={[LocalStyles.topOptions]}>
              <View style={[{width: "100%", marginTop: 10, paddingLeft: 10, paddingRight: 10}]}>
                {
                  this.state.isBannerActive ?
                  <View style={[LocalStyles.banner, Styles.UI.card]}>
                    <View style={{justifyContent: "flex-end", alignItems: "flex-end", marginTop: -20, marginRight: -20}}>
                      <TouchableOpacity onPress={() => this.toggleBanner()} >
                          <Icon name="close-circle" style={{width: 30, height: 30}} fill="#666" />
                      </TouchableOpacity>
                    </View>
                    <View style={{marginTop: -10}}>
                      <Text style={[Styles.typograhy.strong, {lineHeight: 23}]}>{this.props.node.banner.text}</Text>
                    </View>
                    <View>
                      <Image onPress={() => this.props.navigation.navigate("PhotoModal", {pic: this.props.node.imageID,imageSource: getProfilePicture(this.props.node.banner.imageId),name: this.props.node.name})} source={ getProfilePicture(this.props.node.banner.imageId)} width={Dimensions.get('window').width - 42} />
                    </View>
                </View> : 
                <View style={{alignItems: "flex-start"}}>
                  <TouchableOpacity onPress={() => this.toggleBanner()} style={{width: 160, height: 35, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderWidth: 1, borderColor: "#efefef", borderRadius: 8}}>
                    <View style={{justifyContent: "center", flexDirection: "row"}}>
                    <View><Text style={Styles.typograhy.strong}>Show Banner</Text></View>
                    <View style={{paddingLeft: 5, marginTop: 4}}>
                      <Icon name="loader-outline" style={{width: 15, height: 15}} fill="#333"/>
                    </View>
                    </View>
                  </TouchableOpacity>
                </View>
                }
              </View>
          </View> : null
          }
          {
            !this.state.showOption ?
            <View style={LocalStyles.topOptions}>
              <View style={LocalStyles.options}>
              {
                !this.props.isPrivate ?
                <View style={LocalStyles.option}>
                  {
                    this.state.showSaveLoader ? 
                    <View style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter, {height: 100}]}>
                      <Spinner size="medium" status="danger"/>
                    </View>
                    :
                    <TouchableOpacity onPress={this.saveToList}>
                      <View style={[Styles.alignments.row, Styles.alignments.verticalCenter ,Styles.alignments.horizontalCenter]}>
                        <Icon fill={this.state.inList ? `#09F` : `#333`} name={ this.state.inList ? `checkmark-outline` : `plus-outline`} style={{width: 20, height: 20}} />
                        <Text style={[Styles.typograhy.strong, Styles.spacings.mLeftXSmall, {color: this.state.inList ? `#09F` : `#333`}]}>{ this.state.inList ? `Added to "Saved" List` : `Add to "Saved" List`}</Text>
                      </View>
                    </TouchableOpacity>
                  }
                </View> : null
              }
              {
                this.props.node.ownerId ?
                <View style={LocalStyles.option}>
                    <TouchableOpacity onPress={() => this.viewShop(this.props.node.id)}>
                      <View style={[Styles.alignments.row, Styles.alignments.verticalCenter ,Styles.alignments.horizontalCenter]}>
                        <Icon fill="#333" name="info-outline" style={{width: 20, height: 20}} />
                        <Text style={[Styles.typograhy.strong, Styles.spacings.mLeftXSmall]}>View Profile</Text>
                      </View>
                    </TouchableOpacity>
                </View> : null
              }
              <View style={LocalStyles.option}>
                <Grid>
                  <Col size={50}>
                    <TouchableOpacity onPress={this.toggleHide} style={[Styles.alignments.row, Styles.alignments.verticalCenter ,Styles.alignments.horizontalCenter, {height: 60, borderRightWidth: 1, borderRightColor: "#efefef"}]}>
                      <Icon fill="#333" name="eye-off-outline" style={{width: 20, height: 20}} />
                      <Text style={[Styles.typograhy.strong, Styles.spacings.mLeftXSmall]}>Hide</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col size={50}>
                    <TouchableOpacity  onPress={this.toggleBlock} style={[Styles.alignments.row, Styles.alignments.verticalCenter ,Styles.alignments.horizontalCenter, {height: 60, borderRightWidth: 1, borderRightColor: "#efefef"}]}>
                      <Icon fill="#333" name="slash-outline" style={{width: 20, height: 20}} />
                      <Text style={[Styles.typograhy.strong, Styles.spacings.mLeftXSmall]}>Block</Text>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
            </View>
            </View>
             : null
            }
          
          {/* {
            this.props.node.type === 1 ?
            <Button onPress={() => this.male()}>Hello</Button> : null
          } */}
          
          </React.Fragment>
        );   
    }
}

const LocalStyles = StyleSheet.create({
    header: {
        width: "100%",
        backgroundColor: "white",
        borderBottomColor: "#efefef",
        borderBottomWidth: 1,
        height: 80,
        paddingTop: 15,
        overflow: "visible",
        zIndex: 12,
    },
    avatar: {
        width: 45,
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 5,
        overflow: "hidden",
    },
    topGapper: {
        width: "100%",
        height: 26,
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    topOptions: {
      flexDirection: "row", justifyContent: "flex-end",
      position: "absolute",
      zIndex: 12,
      top: 80,
    },
    options: {
      position: "relative",
      top: 0,
      right: 0,
      width: "100%",
      backgroundColor: "white",
      borderBottomWidth: 1, borderBottomColor: "#efefef",
      borderLeftWidth: 1, borderLeftColor: "#efefef",
    },
    option: {
      width: "100%",
      height: 60,
      borderBottomWidth: 1,
      borderBottomColor: "#efefef",
      alignItems: "center",
      justifyContent: "center"
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


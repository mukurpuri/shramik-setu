import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image, Alert } from 'react-native';


import { Text, Icon, Spinner } from '@ui-kitten/components';
import { EventRegister } from 'react-native-event-listeners'
import { Col, Row, Grid } from "react-native-easy-grid";

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, ProfileIcon, BackIcon, CircularCheckIconFull } from '../../component/Icons';
import Styles from '../../styles';

import { UserLogout } from '../../redux/actions/user';
import { 
  SaveToList,
  GetSaveInfo,
  HideUser,
  BlockUser,
  MuteUser,
  ReportUser
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
          inList: false
        }
    }

    toggleOptions = () => {
      this.setState({
        showOption: !this.state.showOption
      }, () => {
        if(!this.state.showOption) {
          this.loadSaveRequest();
        }
      })
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
          //console.log("FU", data);
          await SaveToList(data).then( res => {
            if(res.status === 200) {
              if(res.data.result !== "saved") {
                this.setState({
                  inList: false
                })
              }
            }
          })
        })
      }
    }

    viewProfile = () => {
      this.props.navigation.navigate("Profile", ({
        user: {
          imageID: this.props.node.imageID,
          id: this.props.node.id,
          name: this.props.node.name
        }
      }))
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
                    <TouchableOpacity onPress={this.props.toggleStory} style={LocalStyles.avatar}>
                        <Image source={getProfilePicture(this.props.node.imageID)} style={{width: 45, height: 45}} />
                    </TouchableOpacity>
                </Col>
                <Col style={{justifyContent: "center"}} size={50}>
                    <TouchableOpacity onPress={() => this.toggleOptions()}>
                        <View style={Styles.alignments.row}>
                          <Text style={[Styles.typograhy.strong, {fontSize: 19}]}>
                            {(this.props.node.name)}
                          </Text>
                          {
                            this.props.node.isVerified ?
                                <CircularCheckIconFull style={Styles.UI.headerTick} fill="#09F" /> : null
                          }
                        </View>
                    </TouchableOpacity>
                </Col>
                <Col onPress={() => this.toggleOptions()} style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={20}>
                    <Icon name="menu-outline" fill="#333" style={{width: 30, height: 30}} />
                </Col>
            </Grid>
          </View>
          {
            !this.state.showOption ?
            <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
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
              {/* <View style={LocalStyles.option}>
                    <TouchableOpacity onPress={this.viewProfile}>
                      <View style={[Styles.alignments.row, Styles.alignments.verticalCenter ,Styles.alignments.horizontalCenter]}>
                        <Icon fill="#333" name="info-outline" style={{width: 20, height: 20}} />
                        <Text style={[Styles.typograhy.strong, Styles.spacings.mLeftXSmall]}>View Profile</Text>
                      </View>
                    </TouchableOpacity>
              </View> */}
              <View style={LocalStyles.option}>
                <Grid>
                  <Col size={50}>
                    <TouchableOpacity onPress={this.toggleHide} style={[Styles.alignments.row, Styles.alignments.verticalCenter ,Styles.alignments.horizontalCenter, {height: 70, borderRightWidth: 1, borderRightColor: "#efefef"}]}>
                      <Icon fill="#333" name="eye-off-outline" style={{width: 20, height: 20}} />
                      <Text style={[Styles.typograhy.strong, Styles.spacings.mLeftXSmall]}>Hide</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col size={50}>
                    <TouchableOpacity  onPress={this.toggleBlock} style={[Styles.alignments.row, Styles.alignments.verticalCenter ,Styles.alignments.horizontalCenter, {height: 70, borderRightWidth: 1, borderRightColor: "#efefef"}]}>
                      <Icon fill="#333" name="slash-outline" style={{width: 20, height: 20}} />
                      <Text style={[Styles.typograhy.strong, Styles.spacings.mLeftXSmall]}>Block</Text>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
            </View></View> : null
          }
          {
            !this.props.isPrivate && this.props.node.type === 1 && false ?
            <View style={[Styles.spacings.mBottomXSmall,Styles.spacings.mTopXSmall,Styles.spacings.mLeftXSmall,Styles.spacings.mRightXSmall]}>
              <View style={[LocalStyles.banner, Styles.UI.card]}>
                <Text style={Styles.typograhy.strong}>Flat 50% Discount on all major Botiques and Sarees</Text>
              </View>
            </View> : null
          }
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
        overflow: "visible"
    },
    avatar: {
        width: 45,
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 80,
        overflow: "hidden",
        borderWidth: 1, borderColor: "#efefef"
    },
    topGapper: {
        width: "100%",
        height: 26,
        backgroundColor: "rgba(0,0,0,0.1)"
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
      height: 70,
      borderBottomWidth: 1,
      borderBottomColor: "#efefef",
      alignItems: "center",
      justifyContent: "center"
    },
    banner: {
      
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


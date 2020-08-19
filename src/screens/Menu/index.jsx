import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, Image } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Col, Row, Grid } from "react-native-easy-grid";
import _ from 'lodash';
import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import FootbarAction from '../../component/FootbarAction';
import { SetUserLocation } from '../../redux/actions/user';
import { getProfilePicture } from '../../utilities/helpers';
import { VerifiedTick, Gear, EyeOutline, Edit, PictureIcon, AddCircular, Briefcase, Shop, Logout  } from '../../component/Icons';
import { SetuLogo } from '../../config/Images';
import Styles from '../../styles';
import { getOtherAccounts } from '../../services/api.service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserLogout } from '../../redux/actions/user';
import { EventRegister } from 'react-native-event-listeners'

class Menu extends React.Component {
  _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          spinner: false,
          showShopLoaders: false,
          otherAccounts: [
          ]
        }
    }

    componentDidMount = async () => {
      this.fetchOtherAccounts();
      this.listener = EventRegister.addEventListener('loadOtherAccounts', (data) => {
        this.fetchOtherAccounts();
      })
    }

    editProfile = () => {
      this.props.navigation.navigate("EditProfile")
    }
    
    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
        this._isMounted = false;
    }
    
    logout = async () => {
      await this.props.UserLogout();
      this.props.navigation.navigate("Home");
    }

    fetchOtherAccounts = () => {
      this.setState({
        showShopLoaders: true
      }, async () => {
        await getOtherAccounts(this.props.user.id).then( res => {
          if(res.status === 200) {
            this._isMounted = true;
            this.setState({
              showShopLoaders: false,
              otherAccounts: res.data,
            }, () => {
            })
          }
        })
      })
    }

    showList = () => {
      EventRegister.emit("myLists");
      this.props.navigation.navigate("MyList");
    }

    render() {
        let currentLanguage = this.props.settings.language;
        let { user } = this.props;
        return (
          <View style={{flex: 1}}>
            <HeaderUser title="Connect" paddBottom={0} navigation={this.props.navigation} />
            <Wrapper bg="#f5f5f5">
                <View style={LocalStyles.menuContainer}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("MyProfile")}>
                    <Grid>
                      <Col size={18}>
                        <Image style={{width: 45, height: 45, borderRadius: 10, marginTop: 3}} source={getProfilePicture(this.props.user.imageID)} />
                      </Col>
                      <Col size={82}>
                        <View style={{flexDirection: "row"}}>
                          <View>
                            <Text style={[Styles.typograhy.strong, {fontSize: 20}]}>
                              {this.props.user.name}
                            </Text>
                          </View>
                          {
                            this.props.user.isVerified ?  <VerifiedTick  style={LocalStyles.tick} fill="#09F" />  : null
                          }
                        </View>
                        <View>
                          <Text style={[Styles.typograhy.nunito, {fontSize: 14}]}>
                            View your Profle
                          </Text>
                        </View>
                      </Col>
                    </Grid>
                  </TouchableOpacity>
                  <View style={[LocalStyles.card, Styles.spacings.mTopSmall]}>
                    <TouchableOpacity onPress={() => this.editProfile()} style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center", width: 10, height: 40}} >
                          <Edit style={{width: 20, height: 20}} fill="#333"/>
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>Edit Profile</Text>
                        </Col>
                      </Grid>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfilePicture", { notFirstTime: true })} style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center", width: 10, height: 40}} >
                          <PictureIcon style={{width: 20, height: 20}} fill="#333"/>
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>Change Profile Picture</Text>
                        </Col>
                      </Grid>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("CreateShop")} style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center", width: 10, height: 40}} >
                          <Shop style={{width: 20, height: 20}} fill="#333"/>
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>Create Bussiness Acccount</Text>
                        </Col>
                      </Grid>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.showList()} style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center", width: 10, height: 40}} >
                          <Icon name="layers-outline" style={{width: 20, height: 20}} fill="#333"/>
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>My Lists</Text>
                        </Col>
                      </Grid>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("AccountSetting")} style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center", width: 10, height: 40}} >
                          <EyeOutline style={{width: 20, height: 20}} fill="#333"/>
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>Privacy Settings</Text>
                        </Col>
                      </Grid>
                    </TouchableOpacity> */}
                  </View>
                  {/* <View style={LocalStyles.divider}></View> */}
                  {
                    this.state.otherAccounts.length > 0 ?
                    <View style={[Styles.spacings.mTopSmall]}>
                      <View>
                          <Text style={LocalStyles.label}>OTHER ACCOUNTS</Text>
                      </View>
                      <View>
                        {
                          this.state.showShopLoaders ? 
                          <View style={Styles.spacings.mTopSmall}>
                          <View style={Styles.alignments.row, Styles.alignments.horizontalCenter}>
                            <Spinner size="medium" status="danger"/>
                          </View></View> : 
                          <Accounts navigation={this.props.navigation} data={this.state.otherAccounts} user={this.props.user} />
                        }
                      </View>
                    </View> : null
                  }
                  <View style={[Styles.spacings.mTopSmall]}>
                      <Text style={LocalStyles.label}>CHANGE LANGUAGE</Text>
                  </View>
                  {/* <View style={[Styles.spacings.mTopXSmall]}>
                    <Grid>
                      <Col size={46}>
                        <View style={[LocalStyles.card,{backgroundColor: "#09f", borderBottomWidth: 0}]}>
                          <View style={LocalStyles.cardItem}>
                            <View style={[Styles.alignments.horizontalCenter]}>
                              <Text style={[LocalStyles.cardListItems, {paddingTop: 7, color: "white"}]}>हिंदी (Hindi)</Text>
                            </View>
                          </View>
                        </View>
                      </Col>
                      <Col size={8}></Col>
                      <Col size={46}>
                      <View style={LocalStyles.card}>
                        <View style={LocalStyles.cardItem}>
                            <View style={[Styles.alignments.horizontalCenter]}>
                            <Text style={[LocalStyles.cardListItems, {paddingTop: 7}]}>English</Text>
                            </View>
                        </View>
                      </View>
                      </Col>
                    </Grid>
                  </View> */}
                  <View style={[LocalStyles.card, Styles.spacings.mTopXSmall]}>
                    {/* <View style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center"}} >
                          <Image source={SetuLogo} style={{width: 25, height: 25}} />
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>About Setu</Text>
                        </Col>
                      </Grid>
                    </View> */}
                    <TouchableOpacity onPress={() => this.logout()} style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center"}} >
                          <Logout style={{width:20, height:20}} fill="#333"/>
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>Logout</Text>
                        </Col>
                      </Grid>
                    </TouchableOpacity>
                  </View>
                  <View style={[Styles.spacings.mTopSmall, Styles.alignments.horizontalCenter]}>
                    <View>
                    <Grid>
                      <Row>
                        <Image source={SetuLogo} style={{width: 90, height: 90, borderRadius: 400}} />
                      </Row>
                      <Row>
                        <Text style={Styles.typograhy.strong}>© Setu 2020</Text>
                      </Row>
                    </Grid>
                    </View>
                  </View>
                </View>
            </Wrapper>
            <FootbarAction navigation={this.props.navigation} active="connect"/>
          </View>
        );   
    }
}
class Accounts extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  componentDidMount = async () => {
  }

  render() {
      let accounts = [];
      _.each(this.props.data, (account, index) => {
        accounts.push(
          <View key={account.id}  style={[Styles.alignments.rel,LocalStyles.shopCard, Styles.spacings.pBottomXSmall]}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Shop", {id: account.id})} style={LocalStyles.cardItem, Styles.spacings.pTopXSmall}>
              {
                account.deactivate ? 
                  <React.Fragment>
                    <View style={LocalStyles.deactivate}></View>
                    <View style={LocalStyles.deactivateTag}><Text style={[Styles.typograhy.nunito, {color: "#888", fontSize: 12}]}>Deactivated</Text></View>
                  </React.Fragment>
                   : null
              }
              {
                account.hide ? 
                  <React.Fragment>
                    <View style={LocalStyles.hidden}><Text style={[Styles.typograhy.nunito, {color: "#fff", fontSize: 12}]}>Unavailable</Text></View>
                  </React.Fragment>
                   : null
              }
              <Grid>
                <Col size={20} style={{justifyContent: "center", alignItems: "center"}} >
                  <Image style={{width: 40, height: 40, borderRadius: 4,}} source={getProfilePicture(account.imageID)} />
                </Col>
                <Col style={{justifyContent: "center"}} size={90}>
                  <View><Text style={LocalStyles.cardListItems}>{account.name}</Text></View>
                  <View><Text style={LocalStyles.about}>{account.about}</Text></View>
                  {/* <View style={LocalStyles.shopNotification}>
                    <Text style={LocalStyles.shopNotificationText}>33</Text>
                  </View> */}
                </Col>
              </Grid>
            </TouchableOpacity>
          </View>
        )
      })
      return (
        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
          {accounts}
        </View>
      );   
  }
}

const LocalStyles = StyleSheet.create({
  menuContainer: {
    width: "100%",
    padding: 20,
    minHeight: 500,
    paddingBottom: 200
  },
  card: {
    backgroundColor: "white",
    borderWidth: 1, borderColor: "#efefef",
    borderRadius: 4
  },
  shopCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 4,
    marginTop: 10,
  },
  cardItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    minHeight: 40
  },
  tick: {
    width: 15, height: 15,
    marginTop: 8,
    marginLeft: 5
  },
  cardListItems: {
    fontFamily: "nunito-bold",
    fontSize: 16,
    color: "#444",
    position: "relative"
  },
  label: {
    fontSize: 10,
    fontFamily: "nunito-bold"
  },
  divider: {
    marginTop: 25,
    marginBottom: 25,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    height: 1,
  },
  about: {
    color: "#666",
    fontFamily: "nunito",
    fontSize: 12,
    height: 20,
    width: "70%",
    overflow: "hidden"
  },
  shopNotification: {
    backgroundColor: "red",
    width: 25,
    height: 25,
    borderRadius: 50,
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    right: 10
  },
  shopNotificationText: {
    color: "white",
    fontSize: 12,
    fontFamily: "nunito-bold",
  },
  deactivate: {
    position: "absolute",
    width: "100%",
    height: 100,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255, 0.8)"
  },
  deactivateTag: {
    borderWidth: 1,
    position: "absolute",
    borderColor: "#ccc",
    padding: 3,
    paddingLeft: 6,
    paddingRight: 6,
    top: 5,
    right: 5,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 100
  },
  hidden: {
    borderWidth: 1,
    position: "absolute",
    borderColor: "#09F",
    backgroundColor: "#09F",
    padding: 3,
    paddingLeft: 6,
    paddingRight: 6,
    bottom: 0,
    right: 5,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 100
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

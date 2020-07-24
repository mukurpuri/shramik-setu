import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, Image } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Col, Row, Grid } from "react-native-easy-grid";

import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import FootbarAction from '../../component/FootbarAction';
import { SetUserLocation } from '../../redux/actions/user';
import { getProfilePicture } from '../../utilities/helpers';
import { VerifiedTick, Gear, Edit, PictureIcon, AddCircular, Briefcase, Shop, Logout  } from '../../component/Icons';
import { SetuLogo } from '../../config/Images';
import Styles from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserLogout } from '../../redux/actions/user';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          spinner: false,
        }
    }

    componentDidMount = async () => {

    }

    editProfile = () => {
      this.props.navigation.navigate("EditProfile")
    }
    
    logout = async () => {
      await this.props.UserLogout();
      this.props.navigation.navigate("Home");
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
                    <View style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center", width: 10, height: 40}} >
                          <PictureIcon style={{width: 20, height: 20}} fill="#333"/>
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>Change Profile Picture</Text>
                        </Col>
                      </Grid>
                    </View>
                    <View style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center", width: 10, height: 40}} >
                          <Gear style={{width: 20, height: 20}} fill="#333"/>
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>Account Settings</Text>
                        </Col>
                      </Grid>
                    </View>
                  </View>
                  <View style={LocalStyles.divider}></View>
                  <View>
                      <Text style={LocalStyles.label}>OTHER ACCOUNTS</Text>
                  </View>
                  <View style={[LocalStyles.card, Styles.spacings.mTopXSmall]}>
                    <View style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center", width: 10, height: 40}} >
                          <Shop style={{width: 20, height: 20}} fill="#333"/>
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>Create Bussiness/Shop</Text>
                        </Col>
                      </Grid>
                    </View>
                    <View style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center", width: 10, height: 40}} >
                          <Briefcase style={{width: 20, height: 20}} fill="#333"/>
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>Create a Service</Text>
                        </Col>
                      </Grid>
                    </View>
                  </View>
                  <View style={LocalStyles.divider}></View>
                  <View>
                      <Text style={LocalStyles.label}>CHANGE LANGUAGE</Text>
                  </View>
                  <View style={[Styles.spacings.mTopXSmall]}>
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
                  </View>
                  <View style={LocalStyles.divider}></View>
                  <View>
                      <Text style={LocalStyles.label}>SWITCH CITIES</Text>
                  </View>
                  <View style={[Styles.spacings.mTopXSmall]}>
                    <Grid>
                      <Col size={46}>
                        <View style={LocalStyles.card}>
                          <View style={LocalStyles.cardItem}>
                            <View style={[Styles.alignments.horizontalCenter]}>
                              <Text style={[LocalStyles.cardListItems, {paddingTop: 7}]}>Jaipur (जयपुर)</Text>
                            </View>
                          </View>
                        </View>
                      </Col>
                      <Col size={8}></Col>
                      <Col size={46}>
                      <View style={LocalStyles.card}>
                        <View style={LocalStyles.cardItem}>
                            <View style={[Styles.alignments.horizontalCenter]}>
                            <Text style={[LocalStyles.cardListItems, {paddingTop: 7}]}>Gurgaon (गुडगाँव)</Text>
                            </View>
                        </View>
                      </View>
                      </Col>
                    </Grid>
                  </View>
                  <View style={LocalStyles.divider}></View>
                  <View>
                      <Text style={LocalStyles.label}>MORE</Text>
                  </View>
                  <View style={[LocalStyles.card, Styles.spacings.mTopXSmall]}>
                    <View style={LocalStyles.cardItem}>
                      <Grid>
                        <Col size={20} style={{justifyContent: "center", alignItems: "center"}} >
                          <Image source={SetuLogo} style={{width: 25, height: 25}} />
                        </Col>
                        <Col style={{justifyContent: "center"}} size={90}>
                          <Text style={LocalStyles.cardListItems}>About Setu</Text>
                        </Col>
                      </Grid>
                    </View>
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
                </View>
            </Wrapper>
            <FootbarAction navigation={this.props.navigation} active="connect"/>
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
  cardItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    height: 40
  },
  tick: {
    width: 15, height: 15,
    marginTop: 8,
    marginLeft: 5
  },
  cardListItems: {
    fontFamily: "nunito-bold",
    fontSize: 16,
    color: "#444"
  },
  label: {
    fontSize: 10,
    fontFamily: "nunito-bold"
  },
  divider: {
    marginTop: 15,
    marginBottom: 15,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    height: 1,
    backgroundColor: "#eae7e7"
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

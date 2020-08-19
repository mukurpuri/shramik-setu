import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet,  Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Divider, Spinner, Icon, Card } from '@ui-kitten/components';
import _ from 'lodash';
import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, AwardIcon, Edit, CircularCheckIconFull, Gear } from '../../component/Icons';
import Styles from '../../styles';
import HeaderUser from '../../component/HeaderUser';

import { GetProfileData } from '../../services/api.service';
import { OTPStatus, SubmitMobileNumberStatus } from '../../redux/actions/user';
import { getProfilePicture } from '../../../src/utilities/helpers';
import { EventRegister } from 'react-native-event-listeners'
import { TouchableOpacity } from 'react-native-gesture-handler';

class MyProfileScreen extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);  
    this.state = {
        myProfileData: null,
        spinner: false,
      }
  }

  componentDidMount = () => {
    this.myProfiledData();
    this.listener = EventRegister.addEventListener('loadMyProfile', (data) => {
      this.myProfiledData();
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
    this._isMounted = false;
  }

  myProfiledData = async () => {
    this._isMounted = true;
    this.setState({
      spinner: true
    }, async  () => {
      await GetProfileData(this.props.user.id).then( res => {
        if (this._isMounted) {
          if(res && res.data && res.data.data.status === "pass") {
            let myProfileData = res.data.data.body;
            this.setState({ myProfileData: myProfileData, spinner: false})
          }
        }
      });
    })
  }

  followConnection = number => {
    true;
  }

  changeProfilePicture = () => {
    this.props.navigation.navigate('ProfilePicture', {
      notFirstTime: true
    });
  }

  render() {
      let currentLanguage = this.props.settings.language;
      const { user } = this.props;
      const { myProfileData } = this.state;
      let connections = [];
      _.each(myProfileData?.connections, (connection, index) => {
        connections.push(
          <Col style={{marginBottom: 10}} index={`index-${index}-col`} size={31}>
            <View style={LocalStyles.connectionCard}>
              <View style={Styles.alignments.horizontalCenter}>
                <Image source={getProfilePicture(connection?.imageID, "sm")} style={LocalStyles.connectionImage}></Image>
              </View>
              <Text style={[LocalStyles.connectionName,Styles.spacings.mBottomXSmall]}>{connection?.name}</Text>
              <Divider />
              <Button onPress={() => this.followConnection(connection?.phoneNumber)} appearance='ghost' status='danger'>
                <Text status='danger' style={{fontFamily: "nunito-bold", fontSize: 14}}>Connect</Text>
              </Button>
            </View>
          </Col>
        );
      })
      return (
        <Wrapper bg="#f5f5f5">
          <HeaderUser title={this.props.user.name} subTitle="Profile" navigation={this.props.navigation}/>
          {
                !this.state.spinner ? 
                <View style={LocalStyles.masthead}>
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                  <TouchableOpacity onPress={() => this.changeProfilePicture()} style={[LocalStyles.avatarContainer]}>
                      <Image style={LocalStyles.avatar} source={getProfilePicture(user.imageID)} />
                      <View style={LocalStyles.editIcon}>
                        <Edit style={{width: 27, height: 27, marginLeft: 3}} fill="#09F" />
                      </View>
                  </TouchableOpacity>
                </View>
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                  <Text style={LocalStyles.profileName}>{myProfileData?.name}</Text><View><CircularCheckIconFull style={LocalStyles.tick} fill="#09F" /></View>
                </View>
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                  <View style={LocalStyles.profileStats}>
                    <View style={LocalStyles.bio}>
                    <Text style={LocalStyles.labels}>
                      About
                    </Text>
                      <Text style={LocalStyles.bioText}>
                        {myProfileData?.about}
                      </Text>
                    </View>
                    <Divider/>
                      {/* <Grid style={LocalStyles.rewards}>
                        <Col style={Styles.alignments.horizontalCenter} size={33}>
                          <View style={Styles.alignments.column}>
                            <Icon style={LocalStyles.rewardIcons} name="flash-outline"  fill="#ff5722"/>
                            <View style={Styles.alignments.horizontalCenter}>
                              <Text style={LocalStyles.karmaValue}>{ myProfileData?.liked ? myProfileData?.liked : 0 }</Text>
                            </View>
                          </View>
                        </Col>
                        <Col style={Styles.alignments.horizontalCenter} size={33}>
                          <View style={Styles.alignments.column}>
                            <Icon style={LocalStyles.rewardIcons} name="unlock-outline"  fill="#09F"/>
                            <View style={Styles.alignments.horizontalCenter}>
                                <Text style={LocalStyles.karmaValue}>0</Text>
                              </View>
                          </View>
                        </Col>
                        <Col style={Styles.alignments.horizontalCenter} size={33}>
                          <View style={Styles.alignments.column}>
                            <Icon style={LocalStyles.rewardIcons} name="globe-2-outline"  fill="#00bc00"/>
                            <View style={Styles.alignments.horizontalCenter}>
                                <Text style={LocalStyles.karmaValue}>0</Text>
                              </View>
                          </View>
                        </Col>
                      </Grid> */}
                  </View>
                </View>
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                  <View style={{width: "90%"}}>
                  <Grid>
                    <Col size={100}>
                        <Button onPress={() => this.props.navigation.navigate("EditProfile")} accessoryRight={Edit} status="danger" size="small" >
                        <Text accesso style={{color: "white", fontFamily: "nunito-bold", fontSize: 18}}>
                          Edit Profile
                        </Text>
                      </Button>
                    </Col>
                  </Grid>
                  </View>
                </View>
                <View style={[Styles.spacings.mTopSmall,Styles.spacings.mBottomSmall ]}>
                </View>
                {/* <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                  <View style={{width: "90%"}}>
                    <Text style={LocalStyles.labels}>
                      Connections ({connections.length})
                    </Text>
                  </View>
                </View> */}
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                  <View style={{width: "90%", marginBottom: 20}}>
                    <Grid>
                      {connections}
                      {/* <Col size={3.5}>
                        <View></View>
                      </Col>
                      <Col size={31}>
                        <View style={LocalStyles.connectionCard}></View>
                        <Text style={LocalStyles.connectionName}>Mukur</Text>
                      </Col>
                      <Col size={3.5}>
                        <View></View>
                      </Col>
                      <Col size={31}>
                        <View style={LocalStyles.connectionCard}></View>
                        <Text style={LocalStyles.connectionName}>Mukur</Text>
                      </Col> */}
                    </Grid>
                    </View>
                </View>
              </View> : 
              <View style={Styles.alignments.full, {minHeight: 500, justifyContent: "center", alignItems: "center"}}>
                <Spinner status="danger" size="giant"/>
              </View>
          }
        </Wrapper>
      );   
  }
}


const LocalStyles = StyleSheet.create({
  masthead: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop:15
  },
  connectionImage: {
    width: 80,
    top: 10,
    height: 80,
    backgroundColor: "red",
    borderRadius: 6
  },
  connectionName: {
    textAlign: "center",
    fontFamily: "nunito-bold",
    marginTop: 15,
  },
  connectionCard: {
    backgroundColor: "white",
    borderColor: "#efefef",
    borderWidth:  1,
    width: "100%",
    borderRadius: 6,
    paddingBottom: 5
  },
  karmaValue: {
    fontSize: 20,
    color: "#5d5d5d",
    fontFamily: "nunito-bold",
    marginTop: 20
  },
  labels: {
    fontSize: 12,
    color: "#5d5d5d",
    fontFamily: "nunito-bold"
  },
  rewardIcons: {
    width: 25,
    height: 25,
  },
  bio: {
    padding: 15,
  },
  karma: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 0
  },
  rewards: {
    paddingTop: 10,
  },
  bioText: {
    color: "#333",
    fontSize: 15,
    fontFamily: "nunito",
    color: "#555"
  },
  avatarContainer: {
    width: 130,
    height:   130,
    borderRadius: 6,
    backgroundColor: "white",
    borderColor: "#efefef",
    borderWidth:  1,
    overflow: "hidden"
  },
  profileStats: {
    width: "90%",
    borderRadius: 6,
    backgroundColor: "white",
    borderColor: "#efefef",
    borderWidth:  1,
    overflow: "hidden"
  },
  avatar: {
    width: 115,
    height:  115,
    borderRadius: 0,
    top: 6,
    left:  6.5
  },
  profileName: {
    fontSize: 35,
    fontFamily: "nunito-bold",
    color: "#333"
  },
  tick:{
    width: 20,
    height: 20,
    marginLeft: 10,
    marginTop: 19
  },
  editIcon: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 4,
    top: -21,
    right: -95
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
      
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen);


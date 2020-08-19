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
        myProfileData: {
          about: "",
          isVerified: false,
        },
        spinner: false,
      }
  }

  componentDidMount = () => {
    this.loadProfiledData();
    this.listener = EventRegister.addEventListener('loadMyProfile', (data) => {
      this.loadProfiledData();
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
    this._isMounted = false;
  }

  loadProfiledData = async () => {
    this._isMounted = true;
    this.setState({
      spinner: true
    }, async  () => {
      await GetProfileData(this.props.route.params.user.id).then( res => {
        if (this._isMounted) {
          if(res && res.data && res.data.data.status === "pass") {
            let myProfileData = res.data.data.body;
            this.setState({ myProfileData: myProfileData, spinner: false})
          }
        }
      });
    })
  }

  render() {
      let currentLanguage = this.props.settings.language;
      let { user } = this.props.route.params;
      return (
        <Wrapper bg="#f5f5f5">
          {
                !this.state.spinner ? 
                <View style={LocalStyles.masthead}>
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                  <TouchableOpacity style={[LocalStyles.avatarContainer]}>
                      <Image style={LocalStyles.avatar} source={getProfilePicture(user.imageID)} />
                  </TouchableOpacity>
                </View>
                <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                  <Text style={LocalStyles.profileName}>{user.name}</Text>{ this.state.myProfileData.isVerified ? <CircularCheckIconFull style={LocalStyles.tick} fill="#09F" /> : <Text></Text> }
                </View>
                {
                  this.state.myProfileData.about ? 
                  <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                    <View style={LocalStyles.profileStats}>
                      <View style={LocalStyles.bio}>
                        <Text style={LocalStyles.bioText}>
                          {this.state.myProfileData.about}
                        </Text>
                      </View>
                    </View>
                  </View>
                  : null
                }
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
  connectionName: {
    textAlign: "center",
    fontFamily: "nunito-bold",
    marginTop: 15,
  },
  bioText: {
    color: "#000",
    fontSize: 15,
    fontFamily: "nunito-bold",
    color: "#555"
  },
  avatarContainer: {
    width: 200,
    height:   200,
    borderRadius: 200,
    backgroundColor: "white",
    borderColor: "#efefef",
    borderWidth:  1,
    overflow: "hidden"
  },
  bio: {
    padding: 10
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
    width: 185,
    height:  185,
    borderRadius: 200,
    left:  6.5,
    top: 6.5
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


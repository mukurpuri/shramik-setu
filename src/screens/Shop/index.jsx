import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, Alert } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import FootbarAction from '../../component/FootbarAction';
import { SetUserLocation } from '../../redux/actions/user';
import { EventRegister } from 'react-native-event-listeners'
import { getShop, EntityToSave, EntityToDelete, HideShop, DeactivateShop, DeleteShop, BlockShop, ReportShop, UnblockShop } from '../../services/api.service';
import Styles from '../../styles';
import Header from './header';
import * as Location from 'expo-location';

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          spinner: true,
          editMode: false,
          location: {
            lat: 0,
            lng: 0
          },
          activeTab: 0,
          data: {
            name: "",
            about: "",
            imageID: "",
            address: "",
            stars: 0,
            noOfReviews: 0,
            isVerified: false,
            averageStars: 0,
            category: [],
            contacts: [],
            isSaved: false,
            isOwner: false,
            location: {
              lat: null,
              lng: null
            },
            range: "0",
            hide: false,
            deactivate: false
        }
      }
    }

    componentDidMount = async () => {
      let shopId  = this.props.route.params && this.props.route.params.id;
      this.fetchShop(shopId);
      this.listener = EventRegister.addEventListener('loadShop', id => {
        this.fetchShop(id);
      })
    }

    refreshPageWithReviews = () => {
      this.setState({
        activeTab: 1
      }, async () => {
        let shopId = this.props.route.params && this.props.route.params.id;
        this.fetchShop(shopId)
      })
    }

    fetchShop = shopId => {
      this.setState({
        spinner: true
      }, async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
        } else {
          let locationData = await Location.getCurrentPositionAsync({});
          let location = {
            lat: locationData.coords.latitude,
            lng: locationData.coords.longitude
          }
          this.setState({
            location
          }, async () => {
            let params = {
              id: this.props.route.params && this.props.route.params.id, 
              location: location,
              userID: this.props.user.id
            }
            await getShop(params).then( res => {
              if(res.status === 200) {
                this._isMounted = true;
                this.setState({
                  spinner: false,
                  data: res.data.data
                })
              }
            })
          });
        }
      })
    }

    saveEntity = () => {
      let {data} = this.state;
      data.isSaved = true;
      this.setState({
        data: data
      }, async () => {
        let paramsData = {
          entityId: this.props.route.params && this.props.route.params.id, 
          type: 1,
          userId: this.props.user.id
        }
        await EntityToSave(paramsData).then( res => {
          if(res.status === 200) {
            this._isMounted = true;
          }
        })
      })
    }

    unsaveEntity = () => {
      let {data} = this.state;
      data.isSaved = false;
      this.setState({
        data: data
      }, async () => {
        let paramsData = {
          entityId: this.props.route.params && this.props.route.params.id, 
          userId: this.props.user.id
        }
        await EntityToDelete(paramsData).then( res => {
          if(res.status === 200) {
            this._isMounted = true;
          }
        })
      })
    }

    hideShop = () => {
      if(this.state.data.hide) {
        this.HIDE_ACCOUNT();
        Alert.alert(
          "Unhide Account",
          "Your account is now Available on Setu.",
          [
            { text: "OK", onPress: () => {
              
            } }
          ],
          { cancelable: true }
        );
      } else {
        Alert.alert(
          "Hide Account",
          "Are you sure you want to make your Business Acount Unavailable?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Yes", onPress: () => {
              this.HIDE_ACCOUNT()
            } }
          ],
          { cancelable: false }
        );
      }
    }

    deactivateShop = () => {
      if(this.state.data.deactivate) {
        this.DEACTIVATE_ACCOUNT();
        Alert.alert(
          "Reactivate Account",
          "You account is now reactivated on Setu.",
          [
            { text: "OK", onPress: () => {
              
            } }
          ],
          { cancelable: true }
        );
      } else {
        Alert.alert(
          "Deactivate Account",
          "Are you sure you want to Deactivate your Business Acount?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Yes", onPress: () => {
              this.DEACTIVATE_ACCOUNT();
            } }
          ],
          { cancelable: false }
        );
      }
    }

    DEACTIVATE_ACCOUNT() {
      let {data} = this.state;
      data.deactivate = !data.deactivate;
      this.setState({
        data: data
      }, async () => {
        let paramsData = {
          entityId: this.props.route.params && this.props.route.params.id, 
          userId: this.props.user.id,
          state: this.state.data.deactivate
        }
        await DeactivateShop(paramsData).then( res => {
          if(res.status === 200) {
            this._isMounted = true;
          }
        })
      })
    }

    HIDE_ACCOUNT() {
      let {data} = this.state;
      data.hide = !data.hide;
      this.setState({
        data: data
      }, async () => {
        let paramsData = {
          entityId: this.props.route.params && this.props.route.params.id, 
          userId: this.props.user.id,
          state: this.state.data.hide
        }
        await HideShop(paramsData).then( res => {
          if(res.status === 200) {
            this._isMounted = true;
          }
        })
      })
    }

    DELETE_ACCOUNT() {
      let {data} = this.state;
      data.hide = !data.hide;
      this.setState({
        data: data
      }, async () => {
        let paramsData = {
          entityId: this.props.route.params && this.props.route.params.id, 
          userId: this.props.user.id,
          state: this.state.data.hide
        }
        await DeleteShop(paramsData).then( res => {
          if(res.status === 200) {
            this._isMounted = true;
            EventRegister.emit("loadOtherAccounts")
            this.props.navigation.navigate("Menu");
          }
        })
      })
    }

    deleteShop = () => {
      Alert.alert(
        "Deleting Account on Setu",
        "Deletion of an Account is a permanent action. It will delete all your Connections, Messages and Photos. Are you sure you want to take this step?",
        [
          { text: "Yes", onPress: () => {
            this.DELETE_ACCOUNT()
          } }
        ],
        { cancelable: true }
      );
    }

    blockAccount = () => {
      Alert.alert(
          "Block Account",
          "Are you sure you want to Block this Account?",
          [
            { text: "Yes", onPress: async () => {
              let paramsData = {
                  entityId: this.props.route.params && this.props.route.params.id, 
                  createdBy: this.props.user.id,
                }
                await BlockShop(paramsData).then( res => {
                  if(res.status === 200) {
                    this.setState({
                        flagship: false
                    }, () => {
                      alert("You have blocked this Account for you.")
                    })
                  }
                })
            } }
          ],
          { cancelable: true }
        );
    }


    
    render() {
        let currentLanguage = this.props.settings.language;
        let { user } = this.props;
        return (
          <View style={{flex: 1}}>
            <HeaderUser title="Connect" paddBottom={0} navigation={this.props.navigation} />
            <Wrapper bg="#f5f5f5">
                 {
                   this.state.spinner ? 
                   <View style={LocalStyles.center, LocalStyles.emptyShop}>
                    <View style={LocalStyles.center}>
                      <Spinner status="danger" size="giant"/>
                      <Text style={[Styles.typograhy.strong, LocalStyles.noText]}>Loading...</Text>
                    </View>
                   </View> : 
                   <View style={LocalStyles.profile}>
                    <Header
                      blockAccount={this.blockAccount}
                      deleteShop={this.deleteShop}
                      hideShop={this.hideShop}
                      deactivateShop={this.deactivateShop}
                      unsaveEntity={this.unsaveEntity}
                      saveEntity={this.saveEntity}
                      activeTab={this.state.activeTab}
                      refreshPageWithReviews={this.refreshPageWithReviews}
                      shopId={this.props.route.params && this.props.route.params.id}
                      user={this.props.user} data={this.state.data}
                      navigation={this.props.navigation}
                      editMode={this.state.editMode} />
                   </View>
                 }
            </Wrapper>
            <FootbarAction navigation={this.props.navigation} active="connect"/>
          </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: "nunito",
  },
  center: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  emptyShop: {
    marginTop: 200
  },
  noText: {
    marginTop: 10,
    fontSize: 19,
    color: "#ccc"
  },
  profile: {
    paddingBottom: 100
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Shop);

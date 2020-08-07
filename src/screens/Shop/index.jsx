import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import FootbarAction from '../../component/FootbarAction';
import { SetUserLocation } from '../../redux/actions/user';
import { EventRegister } from 'react-native-event-listeners'
import { getShop } from '../../services/api.service';
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
          data: {
            name: "",
            about: "",
            imageID: "",
            address: "",
            stars: 0,
            noOfReviews: 0,
            isVerified: false,
            category: [],
            contacts: [],
            location: {
              lat: null,
              lng: null
            },
            range: "0"
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
              location: location
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
                    <Header data={this.state.data} navigation={this.props.navigation} editMode={this.state.editMode} />
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

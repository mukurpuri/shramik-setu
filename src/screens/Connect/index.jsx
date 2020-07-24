import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import FootbarAction from '../../component/FootbarAction';
import { SetUserLocation } from '../../redux/actions/user';
import * as Location from 'expo-location';

import Categories from './categories';
import Content from './content';

import Styles from '../../styles';

class Connect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          spinner: false,
        }
    }

    componentDidMount = async () => {
      await this.setUserLoc();

    }

    setUserLoc = async () => {
      //ask for location
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
      } else {
        let locationData = await Location.getCurrentPositionAsync({});
        let location = {
          lat: locationData.coords.latitude,
          lng: locationData.coords.longitude
        }
        this.props.SetUserLocation(location);
      }
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        let { user } = this.props;
        return (
          <View style={{flex: 1}}>
            <HeaderUser title="Connect" paddBottom={0} navigation={this.props.navigation} />
            <Wrapper bg="#f5f5f5">
                {
                   !this.state.spinner ? 
                     <View style={{flex: 1, paddingBottom: 100}}>
                       <Categories/>
                       <Content navigation={this.props.navigation}>
                       </Content>
                     </View> :
                     <LoadingSetu />
                 }
            </Wrapper>
            <FootbarAction navigation={this.props.navigation} active="connect"/>
          </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
  placeholder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 500
  },
  gridContainer: {width: "100%"}
});
const LoadingSetu = () => { return (<View style={LocalStyles.placeholder}>
<Text style={[Styles.typograhy.strong, {fontSize: 20, color: "#aaa"}]}>Connecting everything near you</Text>
<Text style={[Styles.typograhy.strong, {fontSize: 18, color: "#aaa"}]}>People, Shops, Events, Places</Text>
  <View style={[Styles.spacings.mTopMedium]}>
    <Spinner size="giant" status="info"/>
  </View>
</View>)};
// const  AllowSetu = (
//   <View style={LocalStyles.placeholder}>
//     <Icon name="pin-outline" fill="#aaa" style={{width: 50, height: 50}}/>
//     <Text style={[Styles.typograhy.strong, {fontSize: 20, color: "#aaa"}]}>Let us know your location</Text>
//     <Button onPress={() => this.setUserLoc()} style={[LocalStyles.button, Styles.spacings.mTopMedium]}  size='medium' status='danger'>
//       Set your Location
//     </Button>
//   </View>
// )
const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      SetUserLocation: (location) => dispatch(SetUserLocation(location)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Connect);

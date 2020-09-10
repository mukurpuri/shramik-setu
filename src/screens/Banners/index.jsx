import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, ImageBackground, Dimensions, Alert } from 'react-native';
import Image from 'react-native-scalable-image';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Text, Input, Button, Icon, Spinner } from '@ui-kitten/components';
import  Wrapper from '../../component/Wrapper';
import Styles from '../../styles';
import _ from 'lodash';
import { GetMyBanners, RemoveBanner } from '../../services/api.service';
import HeaderUser from '../../component/HeaderUser';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { EventRegister } from 'react-native-event-listeners'
import { getProfilePicture } from '../../utilities/helpers'
class Banner extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
        this.state = {
          spinner: false,
          banners: []
        }
    }

    componentDidMount = async () => {
      this.loadMyBanners();
      this.listener = EventRegister.addEventListener('loadMyBanners', (data) => {
        this.loadMyBanners();
      })
    }

    componentWillUnmount() {
      EventRegister.removeEventListener(this.listener)
      this._isMounted = false;
    }

    loadMyBanners = () => {
      this._isMounted = true;
      this.setState({
        spinner: true
      }, async () => {
        let data = {
          shopId: this.props.route.params.shopId
        }
        await GetMyBanners(data).then(res => {
          if(res.status === 200) {
            this.setState({
              spinner: false,
              banners: res.data.banners
            })
          }
        })
      })
    }

    bannerState = (id, isActive) => {
      this.BANNER_STATE(id, isActive)
    }

    removeBanner = id => {
      Alert.alert(
        "Remove Banner",
        "Are you sure you want to remove this banner?",
        [
          { text: "Yes", onPress: () => {
            this.REMOVE_BANNER(id);
          } },
          { text: "No", onPress: () => {
            console.log("Donothing")
          } }
        ],
        { cancelable: true }
      );
    }

    BANNER_STATE = async (id, isActive) => {
      let { banners } = this.state;

      if(isActive) {
        _.each(banners, banner => {
          banner.isActive = false;
        })
      } else {
        _.each(banners, banner => {
          if(banner.id === id) {
            banner.isActive = true;
          }
        })
      }
       
      this.setState({
        banners
      }, async() => {
          await RemoveBanner(id);
      })
    }

    REMOVE_BANNER = async id => {
      let { banners } = this.state;
      _.remove(banners, function(n) {
        return n.id === id;
      });
      this.setState({
        banners
      }, async() => {
          await RemoveBanner(id);
      })
    }


    render() {
        let currentLanguage = this.props.settings.language;
        let bannersList = [];
        _.each(this.state.banners, banner => {
          bannersList.push(
            <View key={banner.id} style={LocalStyles.bannerContainer}>
              <View style={[LocalStyles.bannerTile, Styles.UI.card]}>
                <Text style={Styles.typograhy.strong}>
                  {banner.name}
                </Text>
                <Text style={Styles.typograhy.strong}>
                  {banner.name}
                </Text>
                {
                  banner.imageId ?
                  <View>
                    <Image source={ getProfilePicture(banner.imageId)} width={Dimensions.get('window').width - 80} />
                  </View> : null
                }
              </View>
              <View style={{marginTop: 5}}>
                <Text style={[Styles.typograhy.nunito, {color: "#888"}]}>
                  Created {banner.createdAt} ago
                </Text>
              </View>
              <Grid style={{marginTop: 5}}>
                <Col size={23}>
                  <TouchableOpacity onPress={() => this.removeBanner(banner.id)} style={[LocalStyles.buttonLink, LocalStyles.removeButtonLink]}><Text style={[LocalStyles.link]}>Remove</Text></TouchableOpacity>
                </Col>
                <Col size={35}>
                  {/* <TouchableOpacity onPress={() => this.bannerState(banner.id, banner.isActive)} style={[LocalStyles.buttonLink, LocalStyles.removeButtonLink]}><Text style={[LocalStyles.link, LocalStyles.blue]}>{ !banner.isActive ? `Activate` : `Deactivate`}</Text></TouchableOpacity> */}
                </Col>
                <Col size={70}></Col>
              </Grid>
            </View>
          )
        })
        return (
            <View style={{flex: 1 }}>
              <HeaderUser title="Home" paddBottom={0} navigation={this.props.navigation} />
              <Wrapper bg="#f4f4f4">
                <View style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 1000}}>
                  <View style={[Styles.UI.card, Styles.spacings.mTopSmall]}>
                    <Text style={Styles.typograhy.nunito}>
                      Banners can help you to tell your customers about your new offers and latest updates. Banners will be shown to them on Message window.
                    </Text>
                    <View style={Styles.spacings.mTopSmall}>
                        <Button onPress={() => this.props.navigation.navigate("AddBanners", {shopId: this.props.route.params.shopId})} style={[Styles.alignments.full, LocalStyles.button]}  size='large' status='danger'>
                          Create new Banner
                        </Button>
                    </View>
                  </View>
                  <View style={Styles.spacings.mTopSmall}>
                    <Text style={[Styles.typograhy.strong, {fontSize: 20}]}>My Banners</Text>
                  </View>
                  <View style={Styles.spacings.mTopSmall}>
                    {
                      this.state.spinner ? 
                      <View style={{width: "100%", height: 300, justifyContent: "center", alignItems: "center"}}>
                        <Spinner status="danger" size="giant"/>
                      </View> : bannersList
                    }
                  </View>
                </View>
              </Wrapper>
          </View>
        );   
    }
}


const LocalStyles = StyleSheet.create({
  bannerTile: {

  },
  blue: {
    color: "#09F",
  },
  link: {
    fontFamily: "nunito-bold",
    textAlign: "left",
    color: "#f44d4d",
  },
  bannerContainer: {
    paddingBottom: 10,
    marginBottom: 20,
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 10,
    borderRadius: 6,
  },
  buttonLink: {
  },
  removeButtonLink: {
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Banner);


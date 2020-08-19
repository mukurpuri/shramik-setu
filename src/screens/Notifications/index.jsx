import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";
import { Card } from '../../component/customComponents'

import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Spinner } from '@ui-kitten/components';
import _ from 'lodash';
import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import Language from '../../config/languages/Language';
import Styles from '../../styles';

import { GetNotifications, KillNotification } from '../../services/api.service';
import { CardContainer } from '../../../src/component/customComponents';
import FootbarAction from '../../component/FootbarAction';
import { getProfilePicture, HTMLizer } from '../../utilities/helpers'
import { EventRegister } from 'react-native-event-listeners'
import { TouchableOpacity } from 'react-native-gesture-handler';

class NotificationScreen extends React.Component {
  _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          spinner: true,
          notifications: [
          ]
        } 
    }

    componentDidMount = async () => {
      this.getData();
      this.listener = EventRegister.addEventListener('loadNotifications', (data) => {
        this.getData();
      })
    }

    getData = async() => {
      await GetNotifications(this.props.user.id).then( res => {
        if(res.status === 200) {
          this._isMounted = true;
          this.setState({
            spinner: false,
            notifications: res.data.notifications,
          }, () => {
          })
        }
      })
    }

    killNotification = id => {
      let { notifications } = this.state;
      let f = _.remove(notifications, function(n) {
        return n.id === id;
      });
      this.setState({
        notifications
      }, async () => {
        await KillNotification(id);
      })
    }
    
    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
        this._isMounted = false;
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        let notificationNodes = [];
        _.each(this.state.notifications, (notification, index) => {
          const createdOn = notification.createdOn;
          const imageID = notification.imageID;
          let formatedText = HTMLizer(notification.textNode);
          notificationNodes.push(
              <CardContainer key={`${index}-notification`} paddLeft={15} paddRight={15} MarginTop={5} MarginBottom={5}>
                  <View style={Styles.UI.card}>
                    <Grid>
                      <Col size={18}>
                        <Image style={{width: 40, height: 40, borderRadius: 5, marginTop: 3}} source={getProfilePicture(imageID)} />
                      </Col>
                      <Col size={74}>
                        <View>
                          <Text style={Styles.typograhy.strong}>{formatedText}</Text>
                        </View>
                        <View>
                          <Text style={Styles.typograhy.nunito}>
                            <Text style={[ Styles.typograhy.strong, {fontSize: 11, color: "#666"}]}>{createdOn}</Text>
                          </Text>
                        </View>
                      </Col>
                      <Col size={18}>
                        <TouchableOpacity onPress={() => this.killNotification(notification.id)}>
                          <Icon style={{width: 22, height: 22, marginLeft: 25}} name="close" fill="#979797"/>
                        </TouchableOpacity>
                      </Col>
                    </Grid>
                  </View>
              </CardContainer>
          )
        })
        return (
          <View style={{flex: 1}}>
          <HeaderUser title="Notifications" paddBottom={0} navigation={this.props.navigation} />
          <Wrapper bg="#f5f5f5">
              {
                !this.state.spinner ? 
                <View style={{marginTop: 10}}>
                { 
                  notificationNodes.length > 0 ? 
                  notificationNodes : 
                  <View style={LocalStyles.center, LocalStyles.emptyNotifications}>
                    <View style={LocalStyles.center}>
                      <Icon name="bell-outline" fill="#CCC" style={{width: 30, height: 30}}/>
                      <Text style={[Styles.typograhy.strong, LocalStyles.noText]}>No Notifications yet.</Text>
                    </View>
                  </View>
                }
               </View> :
               <View style={LocalStyles.center, LocalStyles.emptyNotifications}>
                    <View style={LocalStyles.center}>
                      <Spinner status="danger" size="giant"/>
                      <Text style={[Styles.typograhy.strong, LocalStyles.noText]}>Fetching Notifications..</Text>
                    </View>
                </View>
              }
          </Wrapper>
          <FootbarAction navigation={this.props.navigation}/>
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
  emptyNotifications: {
    marginTop: 200
  },
  noText: {
    marginTop: 10,
    fontSize: 19,
    color: "#ccc"
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
  
export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

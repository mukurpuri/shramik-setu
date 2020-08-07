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

import { GetNotifications } from '../../services/api.service';
import { CardContainer } from '../../../src/component/customComponents';
import FootbarAction from '../../component/FootbarAction';
import { getProfilePicture } from '../../utilities/helpers'
import { EventRegister } from 'react-native-event-listeners'

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
    
    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
        this._isMounted = false;
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        let notificationNodes = [];
        _.each(this.state.notifications, (notification, index) => {
          console.log(notification)
          const type = notification  ? notification.type : 0;
          const title = notification.title;
          const engager = notification.engager;
          const createdOn = notification.createdOn;
          const imageID = notification.imageID;
          let textNode = <Text></Text>;
          switch(type) {
            case 1:
              textNode = <Text style={LocalStyles.text}><Text style={Styles.typograhy.linkText}>{engager}</Text> gave an answer to your Question <Text style={Styles.typograhy.strong}>{title}</Text></Text>
              break;
            case 2:
              textNode = <Text style={LocalStyles.text}><Text style={Styles.typograhy.linkText}>{engager}</Text> upvoted your Question <Text style={Styles.typograhy.strong}>{title}</Text></Text>
            case 3:
              textNode = <Text style={LocalStyles.text}><Text style={Styles.typograhy.linkText}>{engager}</Text> upvoted your Answer <Text style={Styles.typograhy.strong}>{title}</Text></Text>
              break;
          }
          notificationNodes.push(
              <CardContainer key={`${index}-notification`} paddLeft={15} paddRight={15} MarginTop={5} MarginBottom={5}>
                  <View style={Styles.UI.card}>
                    <Grid>
                      <Col size={18}>
                        <Image style={{width: 40, height: 40, borderRadius: 5, marginTop: 3}} source={getProfilePicture(imageID)} />
                      </Col>
                      <Col size={74}>
                        <View>
                          { textNode }
                        </View>
                        <View>
                          <Text style={Styles.typograhy.nunito}>
                            <Text style={{fontSize: 11, color: "#666"}}>{createdOn}</Text>
                          </Text>
                        </View>
                      </Col>
                      <Col size={18}>
                        <Icon style={{width: 22, height: 22, marginLeft: 25}} name="close" fill="#979797"/>
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

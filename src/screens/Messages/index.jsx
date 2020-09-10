import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Spinner, Avatar } from '@ui-kitten/components';
import _ from 'lodash';
import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import Language from '../../config/languages/Language';
import Styles from '../../styles';

import { GetDashboardData, GetAllMessages, AllowSave, CancelSave, SEND_NOTIFICATIOIN } from '../../services/api.service';
import { CardContainer } from '../../../src/component/customComponents';
import FootbarAction from '../../component/FootbarAction';
import { EventRegister } from 'react-native-event-listeners'
import { getProfilePicture } from '../../utilities/helpers';
class MessagesScreen extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          spinner: true,
          active: 0,
          messages: [],
          requests: []
        }
    }

    componentDidMount = async () => {
      this.getAllMessages();
      this.listener = EventRegister.addEventListener('loadAllMessages', (data) => {
        this.getAllMessages();
      })
    }

    getAllMessages = async() => {
      this.interval = setInterval( async() => {
      await GetAllMessages(this.props.user.id).then( res => {
        if(res.status === 200) {
          this._isMounted = true;
          this.setState({
            spinner: false,
            requests: res.data.data.requests,
            messages: res.data.data.messages,
          })
        }
      })
      }, 1000);
    }

    setTab = type => {
      this.setState({
        active: type
      });
    }
    
    componentWillUnmount() {
      EventRegister.removeEventListener(this.listener)
      this._isMounted = false;
    }

    allowSave = (id, uid, name) => {
      const { requests } = this.state;
      let removeIndex = _.findIndex(requests, r => { return r.id == id; });
      requests[removeIndex].doneAccept = true;
      this.setState({
        requests
      }, async () => {
        await AllowSave(id).then( async res => {
          if(res.status === 200 && uid) {
            await SEND_NOTIFICATIOIN({
              to: uid,
              sound: 'default',
              title: 'Setu',
              body: this.props.user.name + ` has been added to your "Saved" List`
            });
          }
        });
      })
    }

    cancelSave = id => {
      const { requests } = this.state;
      _.remove(requests, function(r) {
        return r.id === id;
      });
      this.setState({
        requests
      }, async () => {
        await CancelSave(id);
      })
    }

    getTotalRequests = () => {
      const { requests } = this.state;
      let requestList = 0;
      _.each(requests, request => {
        if(request.doneAccept === false) {
          requestList++
        }
      });
      return requestList;
    }

    openConsole = (type, user) => {
      console.log("QER", type);
      if(type === "0") {
        this.props.navigation.navigate("Console", { node: {id: user.id, name: user.name, imageID: user.imageID, isVerified: user.isVerified, type: 0, isPrivate: false, uid: user.uid, isRequested: false} })
      }
      if(type === "1") {
        this.props.navigation.navigate("Console", { node: {id: user.id, name: user.name, imageID: user.imageID, isVerified: true, type: 1, isPrivate:false, uid:user.uid, ownerId: user.ownerId, banner: user.banner, isBannerActive: user.isBannerActive} })
      }
    }

    render() {
        let currentLanguage = this.props.settings.language;
        let { active, requests, messages } = this.state;

        let messageList = [];
        _.each(messages, message => {
          messageList.push(
            <TouchableOpacity onPress={() => this.openConsole(message.type, message.user)} key={message.id} style={LocalStyles.item}>
              <Grid>
                <Col size={15}>
                  <Image style={{width: 60, height: 60, borderRadius: 15}} source={getProfilePicture(message.user.imageID)}/>
                </Col>
                <Col size={10}></Col>
                <Col size={80}>
                  {
                    <View>
                      <View>
                        <Text style={Styles.typograhy.nunito}><Text style={Styles.typograhy.strong}>{message.user.name} </Text></Text>
                      </View>
                      <View>
                        <Text style={[Styles.typograhy.strong, {color: "#666", fontSize: 12}]}>{message.time}</Text>
                      </View>
                      <View>
                        <Grid>
                          {
                            message.isSentOrNot ? 
                            <Col size={7}>
                              <Icon name="done-all-outline" fill="#777" style={{width:15, height: 15, marginTop: 14}} />
                            </Col> : null
                          }
                          
                          <Col size={message.isSentOrNot ? 100 : 93}>
                            {
                              message.message ? 
                              <Text style={[Styles.typograhy.nunito, LocalStyles.message,{fontSize:15} ]}>{message.message}</Text> :
                              <View style={{flexDirection: "row"}}>
                                <View><Text style={[Styles.typograhy.nunito, LocalStyles.message,{fontSize:15} ]}>Photo</Text></View>
                                <View style={{marginLeft: 5}}><Icon name="image-outline" fill="#777" style={{width:15, height: 15, marginTop: 14}} /></View>
                              </View>
                            }
                          </Col>
                        </Grid>
                      </View>
                    </View>
                  }
                </Col>
              </Grid>  
            </TouchableOpacity>
          )
        });

        let requestList = [];
        _.each(requests, request => {
          requestList.push(
            <View key={request.id} style={LocalStyles.item}>
              <Grid>
                <Col size={15}>
                  <Image style={{width: 60, height: 60, borderRadius: 15}} source={getProfilePicture(request.imageID)}/>
                </Col>
                <Col size={10}></Col>
                <Col size={80}>
                  {
                    request.doneAccept ? <Text style={Styles.typograhy.nunito}> You have been added to Save List of <Text style={Styles.typograhy.strong}>{request.name}</Text></Text> :
                    <View>
                      <View>
                        <Text style={Styles.typograhy.nunito}><Text style={Styles.typograhy.strong}>{request.name} </Text> wants to add you in their <Text style={Styles.typograhy.strong}>Saved</Text> List</Text>
                      </View>
                      <View>
                        <Text style={[Styles.typograhy.strong, {color: "#666", fontSize: 12}]}>{request.createdAt}</Text>
                      </View>
                      <View style={LocalStyles.messageContainer}>
                        <Text style={[Styles.typograhy.nunito, LocalStyles.message ]}>"{request.message}"</Text>
                      </View>
                      <View>
                        <View>
                          <Grid>
                            <Col size={40}>
                              <View>
                                <TouchableOpacity onPress={() => this.allowSave(request.id,request.uid, request.name)} style={LocalStyles.allowButton}>
                                  <View>
                                    <Text style={[Styles.typograhy.strong, LocalStyles.allowButtonText]}>
                                      Allow
                                    </Text>
                                  </View>
                                  <View>
                                    <Icon name="checkmark-outline" style={{width: 20, height: 20, marginLeft: 10}} fill="#fff"/>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </Col>
                            <Col size={40}>
                              <TouchableOpacity onPress={() => this.cancelSave(request.id)} style={LocalStyles.ignoreButton}>
                                  <View>
                                    <Text style={[{color :"#999"},Styles.typograhy.strong]}>
                                      Cancel
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                            </Col>
                          </Grid>
                        </View>
                      </View>
                    </View>
                  }
                </Col>
              </Grid>  
            </View>
          )
        });

        return (
        <View style={{flex: 1}}>
            <HeaderUser title="Messages" paddBottom={0} navigation={this.props.navigation} />
            <Wrapper bg="#f5f5f5">
            {
                this.state.spinner ?
                <View style={{width: "100%", height: 300, justifyContent: "center", alignItems: "center"}}>
                  <Spinner status="danger" size="giant"/>
                </View>
                :
                <View style={[{paddingBottom: 200},Styles.spacings.mLeftXSmall, Styles.spacings.mRightXSmall, Styles.spacings.mTopXSmall]}>
                <Grid>
                  <Col size={32}>
                      <TouchableOpacity onPress={() => this.setTab(0)} style={[ active === 0 ? LocalStyles.activeTab : LocalStyles.inActiveTab, Styles.spacings.pTopXSmall, Styles.spacings.pBottomXSmall ,Styles.alignments.horizontalCenter]}>
                          <Text style={[Styles.typograhy.strong]}>Messages</Text>
                      </TouchableOpacity>
                  </Col>
                  <Col size={1}>
                  </Col>
                  <Col size={32}>
                      <TouchableOpacity onPress={() => this.setTab(1)} style={[  active === 1 ? LocalStyles.activeTab : LocalStyles.inActiveTab, Styles.spacings.pTopXSmall, Styles.spacings.pBottomXSmall ,Styles.alignments.horizontalCenter]}>
                          <View><Text style={[Styles.typograhy.strong]}>Requests</Text></View>
                          {
                            requests.length === 0 ? null : <View style={Styles.UI.redBulb}><Text style={Styles.UI.bulbText}>{this.getTotalRequests()}</Text></View>
                          }
                      </TouchableOpacity>
                  </Col>
                </Grid>
                <View style={[LocalStyles.container, {minHeight: Dimensions.get('window').height - 180}  ]}>
                  {
                    active === 0 ? (
                        messages.length ? 
                        <View>
                          <View>
                            { messageList }
                          </View>
                        </View> : 
                        <View style={LocalStyles.noData}>
                          <View><Icon name="message-square-outline" fill="#bebebe" style={{width: 80, height: 80}}  /></View>
                          <View><Text style={[Styles.typograhy.strong, {color: "#bebebe", fontSize: 26}]}>No Conversations</Text></View>
                        </View>
                    ) : null
                  }
                  {
                    active === 1 ? (
                      requests.length ? 
                      <View>
                          <View>
                            { requestList }
                          </View>
                        </View> :
                        <View style={LocalStyles.noData}>
                          <View><Icon name="folder-outline" fill="#bebebe" style={{width: 80, height: 80}}  /></View>
                          <View><Text style={[Styles.typograhy.strong, {color: "#bebebe", fontSize: 26}]}>No Requests</Text></View>
                        </View>
                    ) : null
                  }
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
  activeTab: {
    backgroundColor: "#fff",
    borderColor: "#efefef",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  inActiveTab: {
    backgroundColor: "transparent",
    borderColor: "#f5f5f5",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  container: {
    backgroundColor: "white",
    width: "100%",
    borderWidth: 1,
    borderColor: "#efefef",
    borderTopWidth: 0,
    borderRadius: 6,
  },
  head: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  noData: {
    minHeight: 500,
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    color: "#444",
    marginTop: 10,
    paddingBottom: 10,
  },
  messageContainer: {
    borderRadius: 4, padding: 5, backgroundColor: "rgba(0,0,0,0.03)", marginTop: 10, marginBottom: 15
  },
  allowButton: {
    backgroundColor: "#09f",
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    flexDirection :"row"
  },
  ignoreButton: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    flexDirection :"row"
  },
  allowButtonText: {
    color: "white",
  }
});
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    settings: state.settingsReducer.settings
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);

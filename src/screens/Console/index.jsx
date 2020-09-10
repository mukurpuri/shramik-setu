import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Icon, Spinner } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { PlusSquareIcon } from '../../component/Icons';
import Styles from '../../styles';
import { Otp } from '../../config/Images';
import _ from 'lodash';
import { OTPStatus, SetUser } from '../../redux/actions/user';
import { getTimeAMPMFormat } from '../../utilities/helpers';
import { SendMessage, GetMessages, SEND_NOTIFICATIOIN, GetLatestMessage, SeenMessage, SetSaveRequest } from '../../services/api.service';
import { SetuLogo } from '../../config/Images';
import Header from './header';
import Footer from './footer';
import Content from './content';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import MessageContainer from './MessageContainer';
class Console extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          message: "",
          spinner: true,
          isStoryOpen: true,
          isRequestSent: this.props.route.params.node.isRequested,
          note: "",
          messageState: "sent",
          lastMessageReceived: null,
          chats: []
        }
    }

    toggleStory = () => {
      this.setState({
        isStoryOpen: !this.state.isStoryOpen
      });
    }

    componentDidMount = async () => {
      this.getMessages(this.props.user.id, this.props.route.params.node.id);
    }

    getLatestMessage = async (primary, secondary) => {
      this.interval = setInterval( async() => {
        let data = {
          primary: primary,
          secondary: secondary
        }
        await GetLatestMessage(data).then(res => {
          if(res.status === 200 && res.data.result === "latest") {
            let message = res.data.message;
            if(!_.isEmpty(message)){
              if(message.id !== this.state.lastMessageReceived) {
                let { chats } = this.state;
                chats.push({
                  id: message.id,
                  isOther: true,
                  message: message.message,
                  time: message.time,
                  type: message.type,
                  media: message.type === 2 ?  message.media : null,
                });
                this.setState({
                  chats,
                  lastMessageReceived: message.id
                }, async () => {
                  await SeenMessage(message.id).then(res => {
                    if(res.status === 200) {
                      this.setState({
                        messageState: "seen"
                      })
                    }
                  });
                })
              }
            }
          }
        })
        
      }, 1000);
    }
    
    getMessages = async (primary, secondary) => {
      let data = {
        primary: primary,
        secondary: secondary
      }
      await GetMessages(data).then(res => {
        if(res.status === 200) {
          let receivedMessages = []
          _.each(res.data.messages, (m) => {
            if(m.isOther) {
              receivedMessages.push(m);
            }
          });

          if(receivedMessages.length > 0) {
            this.setState({
              spinner: false,
              chats: res.data.messages,
              lastMessageReceived: receivedMessages ? receivedMessages[receivedMessages.length - 1].id : null
            }, () => {
              this.getLatestMessage(primary, secondary);
            });
          } else {
            this.setState({
              spinner: false,
              chats: res.data.messages,
              lastMessageReceived: null
            }, () => {
              this.getLatestMessage(primary, secondary);
            });
          }
        }
      })
    }

    
    setMessage = message => {
      if(!message.text && message.type === 1) {
        return;
      }
      let { chats } = this.state;
      let rightnow = new Date();
      chats.push({
        id: Math.floor(Math.random() * Math.floor(1000)),
        isOther: false,
        message: message.text,
        type: message.type,
        media: message.media,
        time: getTimeAMPMFormat(rightnow)
      });
      this.setState({
        message,
        chats,
        messageState: "sending"
      }, async () => {
        let data = {
          message,
          sender: this.props.user.id,
          receiver: this.props.route.params.node.id,
        }
        await SendMessage(data).then((res) => {
          if(res.status === 200) {
            this.setState({
              chats,
              messageState: "sent"
            });
          } else {
            this.setState({
              chats: [],
              messageState: "unsent"
            });
          }
        })
      });
    }

    requestSave = state => {
      if(this.state.note === "") {
        alert(`Please add a small note to let `+ this.props.route.params.node.name +` know about you.`)
        return false;
      }
      this.setState({
        isRequestSent: state
      }, async () => {
        let data = {
          entityId: this.props.route.params.node.id,
          type: this.props.route.params.node.type,
          userId: this.props.user.id,
          isRequested: state,
          message: this.state.note
        }
       await SetSaveRequest(data).then(res => {
         if(res && res.status === 200) {
           if(res.data.result === "requested save" && res.data.isRequested) {
             SEND_NOTIFICATIOIN({
              to: this.props.route.params.node.uid,
              sound: 'default',
              title: 'Setu',
              body: this.props.user.name + ` wants to add you in their "Saved" List`
            })
           }
         }
       });
      })
    }

    openImage = imageSource => {
      this.props.navigation.navigate("PhotoModal", {
        imageSource,
        name: this.props.route.params.node.name,
        pic: this.props.route.params.node.imageID,
      });
    }

    render() {
        let currentLanguage = this.props.settings.language;
        return (
            <View style={{flex: 1 }}>
            
              <Header isPrivate={this.props.route.params.node.isPrivate} toggleStory={this.toggleStory} node={this.props.route.params.node} navigation={this.props.navigation} />
              <Wrapper bg="#f4f4f4">
                {
                  this.props.route.params.node.isPrivate ?  
                  <View>
                    <View style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter, {height: 500}]}>
                      <View>
                      <View>
                        <Text style={[Styles.typograhy.strong, Styles.alignments.textCenter ,{fontSize: 26, color: "#888"}]}>
                          This is a Private Account
                        </Text>
                      </View>
                      <View>
                        <Text style={[Styles.typograhy.nunito,{fontSize: 18, color: "#888", textAlign: "center"}]}>
                          Only available in Saved Lists
                        </Text>
                      </View>
                      <View style={Styles.spacings.mTopMedium}>
                        {
                          this.state.isRequestSent ? 
                          <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                            <TouchableOpacity style={[Styles.UI.card, {width: 200}]}>
                              <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                                <Text style={[Styles.typograhy.nunito, {fontSize: 19, color: "#09F"}]}>
                                  Requested 
                                </Text>
                                <Icon name="checkmark-outline" fill="#09F" style={{width: 23, height: 23, marginTop: 2, marginLeft: 4}}/>
                              </View>
                            </TouchableOpacity>
                          </View>
                          :
                          <View style={Styles.alignments.horizontalCenter}>
                            <View style={{overflow: "hidden", width: "90%"}}>
                              <Input

                                      maxLength={140}
                                      multiline = {true}
                                      numberOfLines = {4}
                                      textStyle={[LocalStyles.innerTextStyle]}
                                      style={[LocalStyles.iputText]}
                                      onChangeText={(val) => this.setState({note: val})}
                                      value={this.state.note}
                                      placeholder={`Write a small note to ${this.props.route.params.node.name} `}
                                  />
                                <Button style={Styles.spacings.mTopXSmall} onPress={() => this.requestSave(true)}  size='giant' status='danger' accessoryRight={PlusSquareIcon}>
                                  Add to Save List
                                </Button>
                            </View>
                          </View>
                        }
                      </View>
                      </View>
                    </View>
                  </View>
                  : null
                }
              </Wrapper>
              {
                !this.props.route.params.node.isPrivate ?
                <React.Fragment>
                  {
                    this.state.spinner ?
                    <View style={{position: "absolute",width: "100%" ,height: 500, justifyContent: "center", alignItems: "center"}}>
                      <Spinner status="danger" size="giant"/>
                    </View> :
                    <ScrollView style={LocalStyles.messagePanel} ref={ref => {this.scrollView = ref}} onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
                      <MessageContainer openImage={this.openImage} node={this.props.route.params.node} messageState={this.state.messageState} chats={this.state.chats}/>
                    </ScrollView> 
                    
                  }
                  <Footer setMessage={this.setMessage}  isStoryOpen={this.state.isStoryOpen}/>
                </React.Fragment> : null
              }
          </View>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    gridContainer: {width: "100%"},
    otpInput: { textAlign: "center", fontSize: 30, fontFamily: "nunito-bold" },
    image: { width: 80, height: 80},
    container: { width: "100%","justifyContent": "space-between" },
    innerTextStyle: {
      backgroundColor: "white",
      fontFamily: "nunito-bold",
      justifyContent: "center",
      textAlignVertical : 'top'
  },
  messagePanel: {
    width: "100%",
    height: (Dimensions.get("window").height - 140),
    position: "absolute",
    top: 80,
  },
  messagesContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  iputText: {
    backgroundColor: "white",
    marginTop: 5,
    textAlignVertical : 'top'
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
      OTPStatus: status => dispatch(OTPStatus(status)),
      SetUser: data => dispatch(SetUser(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Console);


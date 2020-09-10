import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Dimensions } from 'react-native';

import Image from 'react-native-scalable-image';

import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Avatar, Spinner } from '@ui-kitten/components';

import { Col, Row, Grid } from "react-native-easy-grid";


import Styles from '../../styles';

import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import { getProfilePicture, getAllEmojis } from '../../utilities/helpers';
import _ from 'lodash';
import { ThemeService } from '@ui-kitten/components/theme/theme/theme.service';

class MessageContainer extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            tab: 0,
            spinner: true,
            messageState: {
                sending: {
                    text: "Sending",
                    color: "#999",
                    size: 13
                },
                sent: {
                    text: "Sent",
                    color: "#999",
                    size: 13
                },
                seen: {
                    text: "Seen",
                    color: "#333",
                    size: 13
                },
                unsent: {
                    text: "Unset",
                    color: "#333",
                    size: 13
                }
            }
        }
    }

    render() {
        let chats = [];
        let { messageState } = this.state;
        
        _.each(this.props.chats, (chat, index) => {
            let hasMedia = (chat.type === 2 && chat.media);
            let src = "";
            if(hasMedia) {
                if(chat.media.length <=32) {
                    src = getProfilePicture(chat.media);
                } else {
                    src= {uri: chat.media};
                }
            }

            let source = 
            chats.push(
                <Row key={chat.id} style={[LocalStyles.messageRow, chat.isOther ? LocalStyles.leftHanded : LocalStyles.rightHanded]}>
                    <View>
                        <View style={[LocalStyles.message, chat.isOther ? LocalStyles.messageLeft : LocalStyles.messageRight ]}>
                            {
                                hasMedia ?
                                <TouchableOpacity activeOpacity={.9} onPress={()=> {this.props.openImage(src)}}>
                                <Image source={src} width={Dimensions.get('window').width - 100} /></TouchableOpacity> : null
                            }
                            <Text style={[LocalStyles.messageText, chat.isOther ? null : Styles.typograhy.white]}>
                                {chat.message}
                            </Text>
                            <View style={{flexDirection: "column"}}>
                                <View><Text style={[Styles.typograhy.nunito, LocalStyles.time, chat.isOther ? LocalStyles.dim : {} ,chat.isOther ? Styles.typograhy.textLeft : Styles.typograhy.textRight]}>{chat.time}</Text></View>
                            </View>
                        </View>
                        {
                            (index + 1) === this.props.chats.length && !chat.isOther && this.props.messageState?
                            <View style={{ justifyContent: "flex-end", flexDirection: "row", marginTop: 5 }}>
                                <View style={Styles.alignments.row}>
                                    <View>
                                        <Text style={[Styles.typograhy.nunito, {color: messageState[this.props.messageState].color, fontSize: messageState[this.props.messageState].size}]}>{messageState[this.props.messageState].text}</Text>
                                    </View>
                                    <View>
                                        {
                                            this.props.messageState === "sent" ?
                                            <View style={{marginLeft: 1, marginTop: -2}}>
                                                <Icon name="done-all-outline" fill="#999" style={{width: 20, height: 20}}/>
                                            </View> :  null
                                        }
                                        {
                                            this.props.messageState === "sending" ?
                                            <View style={{marginLeft: 1, marginTop: -2}}>
                                                <Text style={{color :"#999"}}>...</Text>
                                            </View> :  null
                                        }
                                        {
                                            this.props.messageState === "seen" ?
                                            <View style={{marginLeft: 5}}>
                                                <Image source={getProfilePicture(this.props.node.imageID)} style={{width: 20, height: 20, borderRadius: 1000}}/>
                                            </View> :  null
                                        }
                                        {
                                            this.props.messageState === "unsent" ?
                                            <View style={{marginLeft: 5}}>
                                            <Icon name="alert-circle-outline" fill="#999" style={{width: 20, height: 20}}/>
                                            </View> :  null
                                        }
                                    </View>
                                </View>
                            </View>:null
                        }
                    </View>
                </Row>
            )
        })
        return (
        <View style={LocalStyles.messageContainer}>
            <Grid>
                { chats }
            </Grid>
        </View>
        );   
    }
}

const LocalStyles = StyleSheet.create({
    messageContainer: {
        padding: 15,
    },
    messageRow: {
        marginBottom: 15
    },
    message: {
        maxWidth: "100%",
        minWidth: "10%",
        minHeight: 10,
        backgroundColor: "white",
        borderColor: "#ececec",
        borderWidth: 1,
        padding: 10,
    },
    messageLeft: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomRightRadius: 10,
    },
    messageRight: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: "#E91E62"
    },
    messageText: {
        fontSize: 17,
    },
    leftHanded: {
        justifyContent: "flex-start" 
    },
    rightHanded: {
        justifyContent: "flex-end" 
    },
    time: {
        fontSize: 10,
        color: "#fff",
        marginTop: 5
    },
    dim: {
        color: "#999"
    }
});

  
export default MessageContainer;


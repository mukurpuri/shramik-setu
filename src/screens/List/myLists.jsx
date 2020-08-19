import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image, Alert } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Col, Row, Grid } from "react-native-easy-grid";
import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import FootbarAction from '../../component/FootbarAction';
import { SetUserLocation } from '../../redux/actions/user';
import { EventRegister } from 'react-native-event-listeners'
import { GetMyList, UnHideUser, UnBlockUser } from '../../services/api.service';
import Styles from '../../styles';
import { getProfilePicture } from '../../utilities/helpers';

import _ from 'lodash'
import { TouchableOpacity } from 'react-native-gesture-handler';
class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          spinner: false,
          data: {
              hidden: {
                  numbers: 0,
                  list: []
              },
              mute: {
                numbers: 0,
                list: []
              },
              blocked: {
                hidden: {
                    numbers: 0,
                    list: []
                }
              },
              blocked: {
                hidden: {
                    numbers: 0,
                    list: []
                }
              }
          }
      }
    }

    componentDidMount = async () => {
      this.myLists();
      this.listener = EventRegister.addEventListener('myLists', id => {
        this.myLists();
      })
    }

    myLists = () => {
        this.setState({
            spinner: true,
        }, async () => {
            await GetMyList(this.props.user.id).then(res => {
                if(res.status === 200) {
                    this.setState({
                        data: res.data.data,
                        spinner: false
                    })
                }
            })
        })
    } 
    
    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
        this._isMounted = false;
    }

    unhide = id => {
        this.setState({
            spinner: true,
        }, async () => {
            await UnHideUser(id).then(res => {
                if(res.status === 200) {
                    this.props.navigation.navigate("Connect");
                    EventRegister.emit("loadPeopleData")
                }
            })
        })
    }

    unblock = id => {
        this.setState({
            spinner: true,
        }, async () => {
            await UnBlockUser(id).then(res => {
                if(res.status === 200) {
                    this.props.navigation.navigate("Connect");
                    EventRegister.emit("loadPeopleData")
                }
            })
        })
    }


    
    render() {
        let currentLanguage = this.props.settings.language;
        let { user } = this.props;
        let { data } = this.state;
        let hiddenList = [];
        _.each(data.hidden.list, item => {
            hiddenList.push(
                <View key={item.id} style={LocalStyles.list}>
                    <Grid>
                        <Col style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={20}>
                            <Image style={LocalStyles.image} source={ getProfilePicture(item.imageID) }/>
                        </Col>
                        <Col style={{flexDirection: "column",justifyContent: "center" }} size={60}>
                            <View>
                                <Text style={[Styles.typograhy.strong, {fontSize: 17}]}>
                                    {item.name}
                                </Text>
                            </View>
                        </Col>
                        <Col style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={30}>
                            <TouchableOpacity onPress={() => {this.unhide(item.id)}}>
                                <View style={LocalStyles.unhide}><Text style={[Styles.typograhy.strong, {fontSize: 13}]}>Unhide</Text></View>
                            </TouchableOpacity>
                        </Col>
                    </Grid>
                </View>
            )
        })

        let blockedList = [];
        _.each(data.blocked.list, bItem => {
            blockedList.push(
                <View key={bItem.id} style={LocalStyles.list}>
                    <Grid>
                        <Col style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={20}>
                            <Image style={LocalStyles.image} source={ getProfilePicture(bItem.imageID) }/>
                        </Col>
                        <Col style={{flexDirection: "column",justifyContent: "center" }} size={60}>
                            <View>
                                <Text style={[Styles.typograhy.strong, {fontSize: 17}]}>
                                    {bItem.name}
                                </Text>
                            </View>
                        </Col>
                        <Col style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={30}>
                            <TouchableOpacity onPress={() => {this.unblock(bItem.id)}}>
                                <View style={LocalStyles.unhide}><Text style={[Styles.typograhy.strong, {fontSize: 13}]}>Unblock</Text></View>
                            </TouchableOpacity>
                        </Col>
                    </Grid>
                </View>
            )
        })
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
                   <View>
                        <View style={[Styles.spacings.mTopSmall, Styles.spacings.mLeftSmall, Styles.spacings.mRightSmall]}>
                            <Text style={[Styles.typograhy.strong, {fontSize: 16}]}>
                                Hidden ({data.hidden.numbers})
                            </Text>
                            <View style={LocalStyles.listContainer}>
                                {hiddenList}
                            </View>
                        </View>

                        <View style={[Styles.spacings.mTopSmall, Styles.spacings.mLeftSmall, Styles.spacings.mRightSmall]}>
                            <Text style={[Styles.typograhy.strong, {fontSize: 16}]}>
                                Muted ({data.mute.numbers})
                            </Text>
                            <View style={LocalStyles.listContainer}>

                            </View>
                        </View>

                        <View style={[Styles.spacings.mTopSmall, Styles.spacings.mLeftSmall, Styles.spacings.mRightSmall]}>
                            <Text style={[Styles.typograhy.strong, {fontSize: 16}]}>
                                Blocked ({data.blocked.numbers})
                            </Text>
                            <View style={LocalStyles.listContainer}>
                                {blockedList}
                            </View>
                        </View>

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
  },
  listContainer: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderRadius: 6,
      borderColor: "#efefef",
      minHeight: 50,
      marginTop: 5
  },
  list: {
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#efefef",
      paddingTop: 10,
      paddingBottom: 10
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#333"
    },
    unhide: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: "#efefef",
        borderRadius: 6,

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

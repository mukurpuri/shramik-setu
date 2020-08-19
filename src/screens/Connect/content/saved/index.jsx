import React from 'react';;
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, SafeAreaView,StyleSheet, Image, Alert } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Slider } from 'react-native'
import Styles from '../../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { getProfilePicture } from '../../../../utilities/helpers';
import { EventRegister } from 'react-native-event-listeners'
import { GetSaveData, RemoveSave } from '../../../../services/api.service';
import { CircularCheckIconFull } from '../../../../component/Icons';

class Saved extends React.Component {

    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            spinner: true
        }
    }

    componentDidMount() {
        this.loadSaveData();
        this.listener = EventRegister.addEventListener('loadSaveData', () => {
          this.loadSaveData();
        });
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
        this._isMounted = false;
    }

    loadSaveData = async () => {
        this._isMounted = true;
        await GetSaveData(this.props.user.id).then( async res => {
          if(res && res.status === 200) {
            if (this._isMounted) {
               this.setState({
                spinner: false,
                data: res.data.data
               });
            }
          }
        });
    }

    naviagateConsole = (id, name, imageID, isVerified) => {
        this.props.navigation.navigate("Console", { node: {id, name, imageID, isVerified, type: 0} })
    }

    hasLeftMargin = index => {
        if(index%3 === 0) {
            return 0;
        }
        return 6;
    }

    getMinWidth = len => {
        if(len === 1) {
            return "60%";
        }
        if(len >= 3 ){
            return "32.1%";
        }
        if(len === 2 ){
            return "40.1%";
        }
        return 0;
    }

    removeNode = (id, type) => {
        Alert.alert(
            "Saved Accounts",
            "Are you sure you want to remove it from your Saved List?",
            [
              { text: "Yes", onPress: () => {
                this.REMOVE_NODE(id, type);
              } },
              { text: "No", onPress: () => {
                console.log("Donothing")
              } }
            ],
            { cancelable: true }
          );
    }

    REMOVE_NODE = (id, type) => {
        let { data } = this.state;
        switch(type) {
            case 0:
            let f = _.remove(data.people, function(n) {
                return n.saveID === id;
            });
            break;

            case 1:
            let d = _.remove(data.shops, function(n) {
                return n.saveID  === id;
            });
            break;

            default:
            console.log("Unknown type")
        }
        this.setState({
            data
        }, async() => {
            await RemoveSave(id);
        })
    }

    render() {
        let People = [];
        let Shops = [];
        _.each(this.state.data.people, (p,e) => {
            People.push(
                <View key={`prop-peope-${p.id}`} style={[LocalStyles.nodeCard]}>
                    <Grid>
                        <Col size={15}>
                            <TouchableOpacity onPress={() => this.naviagateConsole(p.id, p.name, p.imageID, p.isVerified)} style={LocalStyles.avatar}>
                                <View>
                                    <Image style={[LocalStyles.peopleAv]} source={getProfilePicture(p.imageID)}/>
                                </View>
                            </TouchableOpacity>
                        </Col>
                        <Col size={60}>
                            <TouchableOpacity onPress={() => this.naviagateConsole(p.id, p.name, p.imageID, p.isVerified)} style={LocalStyles.name}>
                                <View style={Styles.alignments.row}>
                                    <Text style={[Styles.typograhy.strong, Styles.typograhy.center]}>{(p.name)}</Text>
                                    {
                                        p.isVerified ?
                                        <CircularCheckIconFull style={Styles.UI.peopleTick} fill="#09F" /> : null
                                    }
                                </View>
                            </TouchableOpacity>
                        </Col>
                        <Col size={5}>
                            <TouchableOpacity onPress={() => this.removeNode(p.saveID, 0)} style={LocalStyles.action}>
                                <Icon name="close-outline" style={{width: 20, height: 20, zIndex: 0}} fill="#333"/>
                            </TouchableOpacity>
                        </Col>
                    </Grid>
                </View>
            )
        });

        _.each(this.state.data.shops, (s,e) => {
            Shops.push(
                <View key={`prop-peope-${s.id}`} style={[LocalStyles.nodeCard]}>
                    <Grid>
                        <Col size={15}>
                            <TouchableOpacity onPress={() => this.naviagateConsole(s.id, s.name, s.imageID, s.isVerified)} style={LocalStyles.avatar}>
                                <View>
                                    <Image style={[LocalStyles.peopleAv]} source={getProfilePicture(s.imageID)}/>
                                </View>
                            </TouchableOpacity>
                        </Col>
                        <Col size={60}>
                            <TouchableOpacity onPress={() => this.naviagateConsole(s.id, s.name, s.imageID, s.isVerified)} style={LocalStyles.name}>
                                <View style={Styles.alignments.row}>
                                    <Text style={[Styles.typograhy.strong]}>{(s.name)}</Text>
                                    {
                                        s.isVerified ?
                                        <CircularCheckIconFull style={Styles.UI.peopleTick} fill="#09F" /> : null
                                    }
                                </View>
                            </TouchableOpacity>
                        </Col>
                        <Col size={5}>
                            <TouchableOpacity  onPress={() => this.removeNode(s.saveID, 1)} style={LocalStyles.action}>
                                <Icon name="close-outline" style={{width: 20, height: 20}} fill="#333"/>
                            </TouchableOpacity>
                        </Col>
                    </Grid>
                    
                    
                </View>
            )
        });
        return (
            <View style={{paddingBottom: 200, marginTop: 0, width: "100%"}}>
                {
                    this.state.spinner ? 
                    <View style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter, {height: 400}]}>
                        <Spinner size="large" status="danger"/>
                    </View> : 
                    (
                        <React.Fragment>
                            <View>
                            {
                                this.state.data.people.length > 0 ?
                                <View style={[LocalStyles.inner, LocalStyles.section]}>
                                    <Text style={LocalStyles.label}>People ({this.state.data.people?.length || 0})</Text>
                                    <View style={LocalStyles.list}>
                                        { People || <Text style={{fontFamily: "nunito", fontSize: 11}}>You haven't saved anyone right now</Text> }
                                    </View>
                                </View> : null
                            }
                            {
                                this.state.data.shops.length > 0 ?
                                <View style={[LocalStyles.inner, LocalStyles.section]}>
                                    <Text style={LocalStyles.label}>Shops ({this.state.data.shops?.length || 0})</Text>
                                    <View style={LocalStyles.list}>
                                        { Shops || <Text style={{fontFamily: "nunito", fontSize: 11}}>You haven't saved any Shop right now</Text> }
                                    </View>
                                </View> : null
                            }
                            </View>
                            <View>
                            {
                                this.state.data.people.length === 0 && this.state.data.shops.length === 0 ?
                                    <View>
                                        <View style={[{height: 300},Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]}>
                                            <View>
                                                <View style={Styles.alignments.horizontalCenter}>
                                                    <Icon name="folder-outline" fill="#B5B5B5" style={{width: 90, height: 90}}/>
                                                </View>
                                                <View style={Styles.spacings.mTopSmall}>
                                                    <Text style={[Styles.typograhy.strong, {color: "#B5B5B5", fontSize: 19, textAlign: "center"}]}>
                                                        Your Saved List is Empty !
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                : null
                            }
                            </View>
                        </React.Fragment>
                    )
                }
            </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    inner: {
        padding: 5,
        paddingTop: 2,
        paddingBottom: 2,
    },
    label: {
        fontFamily: "nunito-bold",
        fontSize: 15,
        color: "#444"
    },
    section: {
        marginBottom: 10
    },
    nodeCard: {
        width: "100%",
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
        zIndex: 0,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 200
    },
    peopleAv: {
        width: 50,
        height: 50,
        borderRadius: 200
    },
    name: {
        height: 44,
        justifyContent: "center",
    },
    action: {
        width: 30, height: 50,
        justifyContent: "center"
    },
    list: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#efefef",
        marginTop:10,
        borderRadius: 6,
        position: "relative"
    }
});
export default Saved;

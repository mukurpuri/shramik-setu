import React from 'react';;
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, SafeAreaView,StyleSheet, Image } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Slider } from 'react-native'
import Styles from '../../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { getProfilePicture, optimizeName } from '../../../../utilities/helpers';
import { wrap } from 'lodash';
import { GetPeopleData } from '../../../../services/api.service';
import { EventRegister } from 'react-native-event-listeners'
import { CircularCheckIconFull } from '../../../../component/Icons';

class People extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            spinner: true
        }
    }

    componentDidMount() {
        this.loadPeopleData();
        this.listener = EventRegister.addEventListener('loadPeopleData', () => {
          this.loadPeopleData();
        });
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
        this._isMounted = false;
    }

    loadPeopleData = async () => {
        this._isMounted = true;
        let data = {
            range: this.props.settings.range,
            id: this.props.user.id,
            lat: this.props.location.lat,
            lng: this.props.location.lng
        }
        await GetPeopleData(data).then( async res => {
          if(res && res.status === 200) {
            if (this._isMounted) {
               this.setState({
                spinner: false,
                data: res.data.data
               }, () => {
                   this.props.setDataLength(this.state.data.length)
               });
            }
          }
        });
    }

    naviagateConsole = (id, name, imageID, isVerified, isPrivate) => {
        this.props.navigation.navigate("Console", { node: {id, name, imageID, isVerified, type: 0, isPrivate} })
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
    
    render() {
        //let currentLanguage = this.props.settings.language;
        let People = [];
        _.each(this.state.data, (p,e) => {
            People.push(
                <TouchableOpacity onPress={() => this.naviagateConsole(p.id, p.name, p.imageID, p.isVerified, p.isPrivate)} key={`prop-peope-${p.id}`} style={[LocalStyles.peopleCard, { minWidth: this.getMinWidth(this.state.data.length)}, {marginLeft: this.hasLeftMargin(e)}]}>
                    <View style={LocalStyles.avatar}>
                        <View>
                            <Image style={[LocalStyles.peopleAv]} source={getProfilePicture(p.imageID)}/>
                        </View>
                    </View>
                    <View style={LocalStyles.name}>
                        <View style={Styles.alignments.row}>
                            <Text style={[Styles.typograhy.strong, Styles.typograhy.center]}>{optimizeName(p.name)}</Text>
                            {
                                p.isVerified ?
                                <CircularCheckIconFull style={Styles.UI.peopleTick} fill="#09F" /> : null
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            )
        });
        const None = 
            <View style={LocalStyles.noData}>
            <View><Text style={[Styles.typograhy.strong, {fontSize: 19, color: "#aaa"}]}>Oh! No one is here</Text></View>
            <TouchableOpacity onPress={() => this.props.toggleFilter()}>
                <Text style={[Styles.typograhy.nunito, {fontSize: 18, color: "#09F"}]}>Increase the search range</Text>
            </TouchableOpacity>
            </View>
        
        return (
            <View style={{paddingBottom: 100, marginTop: 0}}>
                <View style={LocalStyles.gridRow}>
                    {
                        this.state.spinner ? 
                        <View style={{width: "100%", height: 200, justifyContent: "center", alignItems: "center"}}><Spinner status="danger" size="giant" /></View> : 
                        (
                            People.length > 0 ? People : None
                        )
                    }
                </View>
            </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    peopleCard: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginBottom: 6,
        //backgroundColor: "#fff",
        //borderWidth: 1,
        //borderColor: "#e9e9e9",
        borderRadius: 6,
        paddingTop: 10,
    },
    gap: {
        width: "2.5%"
    },
    noData: {
        minHeight: 300,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    gridRow: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: 200,
        backgroundColor: "white",
    },
    name: {
        marginTop:0,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 30
    },
    peopleAv: {
        width: 85,
        height: 85,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#e9e9e9"
    },
    statusAv: {
        borderWidth: 3,
        borderColor: "#E91E62"
    }
});
export default People;

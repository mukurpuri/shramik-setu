import React from 'react';;
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, SafeAreaView,StyleSheet, Image } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Slider } from 'react-native'
import Styles from '../../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { getProfilePicture, getProfilePictureShop } from '../../../../utilities/helpers';
import { wrap } from 'lodash';
import { MessageIcon, AddCircular, UserIcon, CircularCheckIconFull } from '../../../../component/Icons';
import { GetShopData } from '../../../../services/api.service'
import { EventRegister } from 'react-native-event-listeners'
class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            spinner: true
        }
    }

    hasLeftMargin = index => {
        if(index%2 === 0) {
            return 0;
        }
        return "1%";
    }

    getMinWidth = len => {
        if(len === 1) {
            return "60%";
        }
        if(len >= 3 ){
            return "48.50%";
        }
        if(len === 2 ){
            return "40.1%";
        }
        return 0;
    }

    componentDidMount() {
        this.loadShopData();
        this.listener = EventRegister.addEventListener('loadShopData', () => {
          this.loadShopData();
        });
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener)
        this._isMounted = false;
    }

    loadShopData = async () => {
        this._isMounted = true;
        let data = {
            range: this.props.settings.range,
            id: this.props.user.id,
            lat: this.props.location.lat,
            lng: this.props.location.lng
        }
        await GetShopData(data).then( async res => {
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

    hasLeftMargin = index => {
        if(index%2 === 0) {
            return 0;
        }
        return "2%";
    }

    getMinWidth = len => {
        if(len === 1) {
            return "60%";
        }
        return "49%";
    }

    naviagateConsole = (id, name, imageID, isVerified, isPrivate, uid, ownerId, banner, isBannerActive) => {
        this.props.navigation.navigate("Console", { node: {id, name, imageID, isVerified, type: 1, isPrivate, uid, ownerId, banner, isBannerActive} })
    }

    
    render() {
        let ShopNodes = [];
        _.each(this.state.data, (shop,index) => {
            let tags = [];
            for(var i = 1; i <= shop.stars; i++) {
                tags.push(<Icon key={`${i}-star-b`} name="star" style={{width: 15, height: 15}} fill="gold"/>);
            }
            for(var i = 1; i <= (5 - (shop.stars)); i++) {
                tags.push(<Icon key={`${i}-star-c`} name="star-outline" style={{width: 15, height: 15}} fill="#ccc"/>);
            }
            ShopNodes.push(
                <React.Fragment key={`${index}-shop`}>
                {/* { width: this.getMinWidth(this.state.data.length)}, {marginLeft: this.hasLeftMargin(index)} */}
                <View style={[LocalStyles.shop]} key={`${index}-shop`}>
                            <TouchableOpacity onPress={() => this.naviagateConsole(shop.id, shop.name, shop.imageID, shop.isVerified, shop.isPrivate, shop.uid, shop.ownerId, shop.banner, shop.isBannerActive)}>
                                <Grid>
                                    <Col size={28} style={ Styles.alignments.row, Styles.alignments.horizontalCenter}>
                                        <View style={[LocalStyles.inner]}>
                                            {
                                                shop.isVerified ?
                                                <View style={{position: "absolute", right: -15, top: 8}}>
                                                    
                                                </View> : null
                                            }
                                            <Image style={[LocalStyles.shopImage, shop.status === true ? LocalStyles.shopImageActive : {}]} source={getProfilePicture(shop.imageID)} />
                                        </View>
                                    </Col>
                                    <Col size={2}></Col>
                                    <Col size={66}>
                                        <View style={{width: "100%"}}>
                                            <View style={[LocalStyles.inner,{justifyContent: "center"}]}>
                                                <View style={Styles.alignments.row}>
                                                    <Text style={[Styles.typograhy.strong, {fontSize: 17}]}>
                                                        {shop.name}
                                                    </Text>
                                                    {
                                                        shop.isVerified ?
                                                        <View>
                                                            <CircularCheckIconFull style={Styles.UI.ShopTick} fill="#09F" />
                                                        </View> : null
                                                    }
                                                </View>
                                            </View>
                                            <View style={[LocalStyles.inner, {marginTop: 1}]}>
                                                <Text style={[Styles.typograhy.strong, {color: "#888",fontSize: 12}]}>{shop.distance} Away</Text>
                                            </View>
                                            <View style={LocalStyles.inner, {marginTop: 1}}>
                                                <View style={[Styles.alignments.row]}>
                                                {tags}
                                                </View>
                                            </View>
                                            <View style={LocalStyles.inner, {marginTop: 1}}>
                                                <View>
                                                    <Text style={[LocalStyles.shopType]}>{shop.categories}</Text>
                                                </View>
                                            </View>
                                        </View> 
                                    </Col>
                                </Grid>
                            </TouchableOpacity>
                </View>
                </React.Fragment>
            )
        })

        const None = 
            <View style={LocalStyles.noData}>
            <View><Text style={[Styles.typograhy.strong, {fontSize: 19, color: "#aaa"}]}>Oh! No Shop found</Text></View>
            <TouchableOpacity onPress={() => this.props.toggleFilter()}>
                <Text style={[Styles.typograhy.nunito, {fontSize: 18, color: "#09F"}]}>Increase the search range</Text>
            </TouchableOpacity>
            </View>

        return (
            <View style={{paddingBottom: 200, marginTop: 0}}>
                <View style={LocalStyles.gridRow}>
                    {
                        this.state.spinner ? 
                        <View style={{width: "100%", height: 200, justifyContent: "center", alignItems: "center"}}><Spinner status="danger" size="giant" /></View> : 
                        (
                            ShopNodes.length > 0 ? ShopNodes : None
                        )
                    }
                </View>
            </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    container: {
        padding: 10,
        minHeight: 700,
    },
    filterButton: {
        width: "100%",
        height: 35,
        justifyContent: "center",
        alignItems: "center"
    },noData: {
        minHeight: 300,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    gridRow: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    presence: {
        width: "100%",
        position: "absolute",
        height: 2,
        color: "white",
        bottom: 0
    },
    open: {
        backgroundColor: "#62c462",
    },
    close: {
        backgroundColor: "#ffe30b",
    },
    searchFilter: {
        width: 120,
        borderRadius: 4,
        height: 40,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#efefef",
        overflow: "hidden"
    },
    shop: {
        paddingBottom:15,
        width: "100%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#efefef"
    },
    inner: {
        paddingTop: 5,
        paddingBottom: 2,
        position: "relative"
    },
    innerText: {
        paddingTop: 0
    },
    wrap: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    tag: {
        borderRadius: 50,
        backgroundColor: "#efefef",
        paddingLeft: 10,
        paddingRight: 10,
        color: "#333",
        fontSize: 12,
        fontFamily: "nunito-bold"
    },
    central: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    divider: {
        width: "1%",
        height: 1
    },
    shopType: {
        fontFamily: "nunito",
        fontSize: 11
    },
    shopImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginTop: 6,
        marginTop: 10,
        zIndex: 0
    },
    shopImageActive: {
        borderWidth: 3,
        borderColor: "#E91E62"
    }
});
export default Shop;

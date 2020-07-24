import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, Image } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';

import Styles from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, CardContainer } from '../../../component/customComponents';
import { MessageIcon, PlusSquareIcon } from '../../../component/Icons';
import Filter from './filter';
import { Grid, Col, Row } from 'react-native-easy-grid';
import _ from 'lodash';
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "shops",
            showFilter: false
        }
    }

    componentDidMount = async () => {

    }

    setRange = () => {
        this.setState({
            showFilter: !this.state.showFilter
        })
    }
    
    render() {
        let shops = [
            {
                name: "Masala Chowk",
                image: "https://i.ytimg.com/vi/5qTuQPMHg2Q/maxresdefault.jpg",
                stars: 3,
                distance: "1 Km",
                status: "open",
                type: "Food Court"
            },
            {
                name: "सदा शिव दाल भंडार",
                image: "https://images.jdmagicbox.com/comp/jaipur/p8/0141px141.x141.121116165407.x8p8/catalogue/sada-shiv-daal-bhandar-mansarovar-jaipur-general-stores-qm5bq.jpg",
                stars: 1,
                distance: "200 Meters",
                status: "close",
                type: "Departmental Store"
            },
            {
                name: "Abhishek Enterprises",
                image: "https://images.jdmagicbox.com/comp/kanpur/s7/0512px512.x512.180327171728.l2s7/catalogue/hari-om-enterprises-barra-ii-kanpur-electronic-goods-showrooms-ck566.jpg",
                stars: 4,
                distance: "2 Km",
                status: "open",
                type: "Electronics"
            },
            {
                name: "Balaji Mishthan Bhandar",
                image: "https://img4.nbstatic.in/tr:w-500/5b29e3934cedfd000caacfa6.jpg",
                stars: 4,
                distance: "13 Meters",
                status: "close",
                type: "Sweet Shop"
            }
        ];
        shops = [];
        let ShopNodes = [];
        _.each(shops, (shop,index) => {
            let tags = [];
            for(var i = 1; i <= shop.stars; i++) {
                tags.push(<Icon key={`${i}-star-b`} name="star" style={{width: 15, height: 15}} fill="gold"/>);
            }
            for(var i = 1; i <= (5 - (shop.stars)); i++) {
                tags.push(<Icon key={`${i}-star-c`} name="star-outline" style={{width: 15, height: 15}} fill="#ccc"/>);
            }
            ShopNodes.push(
                <React.Fragment key={`${index}-shop`}>
                <View style={LocalStyles.shop} key={`${index}-shop`}>
                    <Grid>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Shop")}>
                            <View style={[LocalStyles.inner,{ height: 45, justifyContent: "center" }]}>
                                <Text style={[Styles.typograhy.strong, { fontSize: 14.5,}]}>
                                    {shop.name}
                                </Text>
                            </View>
                            <View style={[LocalStyles.inner]}>
                                <Image style={{width: "100%", height: 86, borderRadius: 4}} source={{uri: `${shop.image}`}} />
                            </View>
                            <View style={[LocalStyles.inner, Styles.alignments.horizontalCenter]}>
                                <Text style={[Styles.typograhy.nunito, {fontSize: 10}]}>{shop.distance} Away</Text>
                            </View>
                            <View style={LocalStyles.inner}>
                                <View style={Styles.alignments.row, Styles.alignments.horizontalCenter}>
                                   {tags}
                                </View>
                            </View>
                            <View style={LocalStyles.inner}>
                                <View>
                                    <Text style={LocalStyles.shopType}>{shop.type}</Text>
                                </View>
                            </View>
                            </TouchableOpacity>
                        </Col>
                    </Grid>
                </View>
                <View style={LocalStyles.divider}></View>
                </React.Fragment>
            )
        })
        return (
            <View style={LocalStyles.container}>
                <View style={[Styles.spacings.mBottomSmall, Styles.alignments.row, {alignItems: "center", justifyContent: "space-between"}]}>
                    <View>
                        <Text style={[Styles.typograhy.strong, {paddingTop: 0}]}>21 Found</Text>
                        <Text style={[Styles.typograhy.nunito, {fontSize: 10}]}>within 1 Km</Text>
                    </View>
                    <View style={LocalStyles.searchFilter}>
                        <TouchableOpacity onPress={()=>this.setRange()} style={LocalStyles.filterButton}>
                            <View style={{flexDirection: "row"}}>
                                <View><Icon name="funnel-outline" style={{width: 20, height: 20, marginRight: 5}} fill="#333"/></View>
                                <Text style={[Styles.typograhy.strong]}>Filter</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Filter active={this.state.showFilter}/>
                </View>
                <View style={LocalStyles.wrap}>
                    {ShopNodes}    
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
        width: "31%",
        marginRight: "1%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#efefef",
        borderRadius: 4,
        marginBottom: 10,
        paddingBottom: 10
    },
    button: {
        marginTop: 0,
        width: "48%"
    },
    inner: {
        padding: 5,
        paddingTop: 2,
        paddingBottom: 2,
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
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: "nunito",
        fontSize: 11,
        textAlign: "center"
    }
});

export default Content;

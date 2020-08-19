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
import People from './people';
import Shop from './shop';
import Saved from './saved';
import { EventRegister } from 'react-native-event-listeners'

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "shops",
            showFilter: false,
            resultLength: 0
        }
    }

    componentDidMount = async () => {

    }

    toggleFilter = () => {
        this.setState({
            showFilter: !this.state.showFilter
        })
    }

    setSearchRange = val => {
        this.props.setSearchRange(val);
    }

    setDataLength = i => {
        this.setState({
            resultLength: i
        })
    }

    refresh = () => {
        switch(this.props.settings.connectTab) {
          case "people":
          EventRegister.emit("loadPeopleData");
          break;
  
          case "shops":
          EventRegister.emit("loadShopData");
          break;
        }
      }
    
    render() {
        return (
            <View style={LocalStyles.container}>
                {
                    this.props.tabType !== "saved" ?
                    <Grid style={[Styles.spacings.mBottomSmall, Styles.alignments.row, {alignItems: "center", justifyContent: "space-between"}]}>
                    <Col size={40}>
                        <Text style={[Styles.typograhy.strong, {paddingTop: 0}]}>{this.state.resultLength} Found</Text>
                        <Text style={[Styles.typograhy.nunito, {fontSize: 14}]}>within <Text style={Styles.typograhy.strong}>{this.props.settings.range < 1000 ? `${this.props.settings.range} Meters` : `1 Km`}</Text></Text>
                    </Col>
                    <Col size={5}></Col>
                    <Col size={15} style={LocalStyles.searchFilter}>
                        <TouchableOpacity onPress={()=>this.toggleFilter()} style={LocalStyles.filterButton}>
                            <View style={{flexDirection: "row"}}>
                                <Icon name="funnel-outline" style={{width: 20, height: 20}} fill="#333"/>
                            </View>
                        </TouchableOpacity>
                    </Col>
                    <Col size={2}></Col>
                    <Col size={15} style={LocalStyles.searchFilter}>
                        <TouchableOpacity onPress={()=>this.props.showSearch()} style={LocalStyles.filterButton}>
                            <View style={{flexDirection: "row"}}>
                                <Icon name="search-outline" style={{width: 20, height: 20}} fill="#333"/>
                            </View>
                        </TouchableOpacity>
                    </Col>
                    </Grid> : null
                }
                <View>
                    <Filter settings={this.props.settings} tabType={this.props.tabType} toggleFilter={this.toggleFilter} searchRange={this.props.searchRange} setSearchRange={this.setSearchRange} active={this.state.showFilter}/>
                </View>
                {
                    !this.state.showFilter ?
                    <View style={LocalStyles.wrap}>
                        { this.props.tabType === "people" ? <People  {...this.props} toggleFilter={this.toggleFilter} setDataLength={this.setDataLength} settings={this.props.settings} user={this.props.user} location={this.props.location}/> : null }
                        { this.props.tabType === "shops" ? <Shop  {...this.props} toggleFilter={this.toggleFilter} setDataLength={this.setDataLength} settings={this.props.settings} user={this.props.user} location={this.props.location}/> : null }
                        { this.props.tabType === "saved" ? <Saved  {...this.props} setDataLength={this.setDataLength} settings={this.props.settings} user={this.props.user} location={this.props.location}/> : null }
                    </View> : null
                }
            </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    container: {
        padding: 10,
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
        borderRadius: 4,
        height: 40,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#efefef",
        overflow: "hidden"
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

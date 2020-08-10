import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, TextInput } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';

import Styles from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "people"
        }
    }

    componentDidMount = async () => {

    }
    
    render() {
        return (
            <View style={LocalStyles.container}>
                <View style={LocalStyles.categories}>
                    <View style={LocalStyles.category}>
                        <TouchableOpacity style={{justifyContent: "center", alignContent: "center", alignItems: "center", width: 120}} onPress={() => this.setState({active: "people"})}>
                        <Icon name="people-outline" fill={ this.state.active === "people" ? "#09F" : "#333"} style={{width: 15, height: 15}}/>
                        <Text style={[Styles.typograhy.strong, this.state.active === "people" ? LocalStyles.active : { color: "#333" }]}>
                            People
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={LocalStyles.divider}></View>
                    <View style={[LocalStyles.category]}>
                        <TouchableOpacity style={{justifyContent: "center", alignContent: "center", alignItems: "center", width: 120}} onPress={() => this.setState({active: "shops"})}>
                        <Icon name="shopping-bag-outline" fill={ this.state.active === "shops" ? "#09F" : "#333"} style={{width: 15, height: 15}}/>
                        <Text style={[Styles.typograhy.strong, this.state.active === "shops" ? LocalStyles.active : { color: "#333" }]}>
                            Shops
                        </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={LocalStyles.category}>
                        <TouchableOpacity style={{justifyContent: "center", alignContent: "center", alignItems: "center", width: 120}} onPress={() => this.setState({active: "places"})}>
                        <Icon name="cube-outline" fill={ this.state.active === "places" ? "#09F" : "#333"} style={{width: 15, height: 15}}/>
                        <Text style={[Styles.typograhy.strong, this.state.active === "places" ? LocalStyles.active : { color: "#333" }]}>
                            Services
                        </Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={LocalStyles.divider}></View>
                    <View style={LocalStyles.category}>
                        <TouchableOpacity style={{justifyContent: "center", alignContent: "center", alignItems: "center", width: 120}} onPress={() => this.setState({active: "saved"})}>
                        <Icon name="checkmark-outline" fill={ this.state.active === "saved" ? "#09F" : "#333"} style={{width: 15, height: 15}}/>
                        <Text style={[Styles.typograhy.strong, this.state.active === "saved" ? LocalStyles.active : { color: "#333" }]}>
                            Saved
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={LocalStyles.search}>
                    <TextInput placeholder="Search by Name, Categories.." style={LocalStyles.searchInput} />
                </View>
            </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    categories: {
        width: "100%",
        backgroundColor: "white",
        borderWidth: 1,
        minHeight: 50,
        borderRadius: 4,
        borderColor: "#efefef",
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderTopWidth: 0
    },
    category: {
        minWidth: 100,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    divider: {
        width: 1,
        height: 50,
        borderLeftWidth: 0.5,
        borderLeftColor: "#efefef",
        borderRightWidth: 0.5,
        borderRightColor: "#efefef",
    },
    active: {
        color: "#09F"
    },
    search: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#efefef"
    },
    searchInput: {
        paddingLeft: 20,
        paddingTop: 10,
        fontFamily: "nunito-bold",
        fontSize: 16,
        color: "#000"
    }
});

export default Categories;

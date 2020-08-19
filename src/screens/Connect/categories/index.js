import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, TextInput } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Styles from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SetTab } from '../../../redux/actions/settings';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connectTab: this.props.settings.connectTab
        }
    }

    setTab = type => {
        this.setState({
            connectTab: type
        }, () => {
            this.props.SetTab(type)
        })
    }
    
    render() {
        const { connectTab } = this.state;
        return (
            <View style={LocalStyles.container}>
                <View style={LocalStyles.categories}>
                    <View style={LocalStyles.category}>
                        <TouchableOpacity style={{justifyContent: "center", alignContent: "center", alignItems: "center", width: 120}} onPress={() => this.setTab("people")}>
                        <Icon name="people-outline" fill={ connectTab === "people" ? "#09F" : "#333"} style={{width: 15, height: 15}}/>
                        <Text style={[Styles.typograhy.strong, connectTab === "people" ? LocalStyles.active : { color: "#333" }]}>
                            People
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={LocalStyles.divider}></View>
                    <View style={[LocalStyles.category]}>
                        <TouchableOpacity style={{justifyContent: "center", alignContent: "center", alignItems: "center", width: 120}} onPress={() => this.setTab("shops")}>
                        <Icon name="shopping-bag-outline" fill={ connectTab === "shops" ? "#09F" : "#333"} style={{width: 15, height: 15}}/>
                        <Text style={[Styles.typograhy.strong, connectTab === "shops" ? LocalStyles.active : { color: "#333" }]}>
                            Shops
                        </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={LocalStyles.category}>
                        <TouchableOpacity style={{justifyContent: "center", alignContent: "center", alignItems: "center", width: 120}} onPress={() => this.setTab("places")}>
                        <Icon name="cube-outline" fill={ connectTab === "places" ? "#09F" : "#333"} style={{width: 15, height: 15}}/>
                        <Text style={[Styles.typograhy.strong, connectTab === "places" ? LocalStyles.active : { color: "#333" }]}>
                            Services
                        </Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={LocalStyles.divider}></View>
                    <View style={LocalStyles.category}>
                        <TouchableOpacity style={{justifyContent: "center", alignContent: "center", alignItems: "center", width: 120}} onPress={() => this.setTab("saved")}>
                        <Icon name="checkmark-outline" fill={ connectTab === "saved" ? "#09F" : "#333"} style={{width: 15, height: 15}}/>
                        <Text style={[Styles.typograhy.strong, connectTab === "saved" ? LocalStyles.active : { color: "#333" }]}>
                            Saved
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.props.showSearch ? 
                    <View style={LocalStyles.search}>
                        <Grid>
                            <Col style={{borderRightColor: "#efefef", borderRightWidth: 1}} size={80}>
                                    <TextInput placeholderTextColor="#888"  placeholder="Search by Name, Categories.." style={LocalStyles.searchInput} />
                            </Col>
                        </Grid>
                    </View> : null
                }
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
        paddingTop: 0,
        fontFamily: "nunito-bold",
        fontSize: 16,
        color: "#000",
        height: 50
    }
});


const mapStateToProps = state => {
    return {
      settings: state.settingsReducer.settings,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      SetTab: (type) => dispatch(SetTab(type)),
    };
};
    
  export default connect(mapStateToProps, mapDispatchToProps)(Categories);
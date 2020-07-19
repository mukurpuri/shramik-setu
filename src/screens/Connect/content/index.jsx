import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, Image } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';

import Styles from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, CardContainer } from '../../../component/customComponents';
import { MessageIcon, PlusSquareIcon } from '../../../component/Icons';
import { Grid, Col } from 'react-native-easy-grid';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "shops"
        }
    }

    componentDidMount = async () => {

    }
    
    render() {
        return (
            <View style={LocalStyles.container}>
                <View style={LocalStyles.wrap}>
                <View style={LocalStyles.shop}>
                    <Grid>
                        <Col size={35}>
                        <View style={{padding: 5}}>
                        <Image style={{width: "100%", height: 86, borderRadius: 4}} source={{uri: "https://images.unsplash.com/photo-1528696334500-245a1b1b67f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}} />
                        </View>
                        </Col>
                        <Col size={65}>
                            <View style={[LocalStyles.inner, {paddingTop: 0}]}>
                                <Text style={[Styles.typograhy.strong, {paddingTop: 0}]}>
                                    Reliance Fresh
                                </Text>
                            </View>
                            <View style={LocalStyles.inner}>
                                <View style={Styles.alignments.row}>
                                <Icon name="star" style={{width: 15, height: 15}} fill="gold"/>
                                <Icon name="star" style={{width: 15, height: 15}} fill="gold"/>
                                <Icon name="star" style={{width: 15, height: 15}} fill="gold"/>
                                <Icon name="star-outline" style={{width: 15, height: 15}} fill="#ccc"/>
                                <Icon name="star-outline" style={{width: 15, height: 15}} fill="#ccc"/>
                                </View>
                            </View>
                            <View style={LocalStyles.inner}>
                                <Text style={{fontFamily: "nunito-bold", fontSize: 10}}>4kms</Text>
                            </View>
                            <View style={LocalStyles.inner}>
                                <View style={LocalStyles.central}>
                                <Button style={[LocalStyles.button]}  size='tiny' status='info' accessoryRight={PlusSquareIcon}>
                                    Connect
                                    </Button>
                                    <View style={{height: 3, width: 5}}></View>
                                    <Button style={[LocalStyles.button]}  size='tiny' status='success' accessoryRight={MessageIcon}>
                                        Message
                                    </Button>
                                </View>
                            </View>
                        </Col>
                    </Grid>
                </View>

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
    shop: {
        width: "100%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#efefef",
        borderRadius: 4,
        marginBottom: 10,
        overflow: "hidden"
    },
    button: {
        marginTop: 0,
        width: "48%"
    },
    inner: {
        padding: 5,
        paddingTop: 2,
        paddingBottom: 2
    },
    innerText: {
        paddingTop: 0
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
    }
});

export default Content;

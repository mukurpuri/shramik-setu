import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Icon, Radio,  TopNavigation, TopNavigationAction, Divider } from '@ui-kitten/components';

import  Wrapper from '../../../component/Wrapper';
import Language from '../../../config/languages/Language';
import { PinIcon, BackIcon, PlaneIcon } from '../../../component/Icons';
import Styles from '../../../styles';

import Footer from '../../../component/Footer';
import { Otp } from '../../../config/Images';

class AdItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
            <Fragment>
                <View style={LocalStyles.container}>
                    <Grid>
                    <Row>
                    <Col size={80}>
                        <Text style={Styles.typograhy.strong} >Urgent Requirement of a Male bai to cook breakfast in the morning</Text>
                        <Text style={[Styles.typograhy.strong, Styles.spacings.mTopXSmall]} category="h5" >₹ 2,000 - ₹ 4,000</Text>
                        <View>
                            <Text style={[LocalStyles.small]}>
                                 Monthly Basis
                            </Text>
                        </View>
                    </Col>
                    <Col size={20}>
                        <Button style={LocalStyles.applyButton} appearance='outline' size="small" status='primary'>APPLY</Button>
                    </Col>
                    </Row>
                    <Row>
                        <Grid style={[LocalStyles.tagsContainer, Styles.spacings.mTopXSmall]}>
                            <View>
                                <Text style={LocalStyles.tags}>Plumbing</Text>
                            </View>
                            <View>
                                <Text style={LocalStyles.tags}>Sweeping</Text>
                            </View>
                        </Grid>
                    </Row>
                    <Row>
                        <Text style={[Styles.spacings.mTopXSmall, LocalStyles.small, LocalStyles.pinkTag]}>
                            Female
                        </Text>
                    </Row>
                    <Row>
                        <Text style={[LocalStyles.locationTag]}>Jaipur</Text>
                    </Row>
                    </Grid>
                </View>
                <Divider/>
                <View style={LocalStyles.container}>
                    <Grid>
                    <Row>
                    <Col size={80}>
                        <Text style={Styles.typograhy.strong} >Urgent Requirement of a Male bai to cook breakfast in the morning</Text>
                        <Text style={[Styles.typograhy.strong, Styles.spacings.mTopXSmall]} category="h5" >₹ 2,000 - ₹ 4,000</Text>
                        <View>
                            <Text style={[LocalStyles.small]}>
                                 Monthly Basis
                            </Text>
                        </View>
                    </Col>
                    <Col size={20}>
                        <Button style={LocalStyles.applyButton} appearance='outline' size="small" status='primary'>APPLY</Button>
                    </Col>
                    </Row>
                    <Row>
                        <Grid style={[LocalStyles.tagsContainer, Styles.spacings.mTopXSmall]}>
                            <View>
                                <Text style={LocalStyles.tags}>Cooking</Text>
                            </View>
                            <View>
                                <Text style={LocalStyles.tags}>Helper</Text>
                            </View>
                        </Grid>
                    </Row>
                    <Row>
                        <Text style={[Styles.spacings.mTopXSmall, LocalStyles.small, LocalStyles.blueTag]}>
                            Male
                        </Text>
                    </Row>
                    <Row>
                        <Text style={[LocalStyles.locationTag]}>Jaipur</Text>
                    </Row>
                    </Grid>
                </View>
                <Divider/>
            </Fragment>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    tags: {
        fontSize: 14,
        padding: 2,
        paddingLeft: 2,
        paddingRight: 2,
        borderColor: "#cccccc",
        borderWidth: 1,
        borderRadius: 42,
        marginBottom: 10,
        width: 100,
        textAlign: "center",
        marginRight: 10,
        justifyContent: "center",
    },
    locationTag: {
        padding: 2,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#f3f3f3",
        marginTop: 10,
        fontSize: 13,
        fontWeight: "bold"
    },
    container: {
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    blueTag: {
        width: 60,
        fontWeight: "bold",
        height: 19,
        backgroundColor: "#09F",
        color:  "#fff",
        borderRadius: 10,
        textAlign: "center"
    },
    pinkTag: {
        width: 70,
        fontWeight: "bold",
        height: 19,
        backgroundColor: "#eb5c9d",
        color:  "#fff",
        borderRadius: 10,
        textAlign: "center"
    },
    small: {
        fontSize: 13
    },
    applyButton: {
        width: 70
    },
    icon: {
        width: 15,
        height: 15,
      },
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AdItem);


import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';


import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Avatar, Spinner } from '@ui-kitten/components';
import { EventRegister } from 'react-native-event-listeners'
import { Col, Row, Grid } from "react-native-easy-grid";
import HeaderUser from '../../component/HeaderUser';
import FootbarAction from '../../component/FootbarAction';
import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, ProfileIcon, BackIcon } from '../../component/Icons';
import Styles from '../../styles';
import _ from 'lodash';
import { GetAllAccounts } from '../../services/api.service';

import { getProfilePicture } from '../../utilities/helpers';
import { TouchableOpacity } from 'react-native-gesture-handler';


class Add extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
        this.state = {
          step: 0,
          accountSelectorLoader: false,
          allAccounts: [],
          selectedAccount: null
        }
    }

    goBack = () => {
      this.props.navigation.goBack(null);
    }

    closeStory = () => {
    }

    steper = (step) => {
        if(step === 1) {
            this.loadAllAccounts();
        }
        this.setState({
            step
        })
    }

    loadAllAccounts = async () => {
        this.setState({
            accountSelectorLoader: true,
        }, async () => {
            await GetAllAccounts(this.props.user.id).then(res => {
                if(res.status === 200) {
                    this.setState({
                        allAccounts: res.data.data,
                        accountSelectorLoader: false
                    });
                }
            })
        })
    }

    render() {
        let currentLanguage = this.props.settings.language;
        let accounts = []
        _.each(this.state.allAccounts, account => {
            accounts.push(
                <TouchableOpacity onPress={() => this.setState({selectedAccount: account.id, step: 2})} key={account.id} style={LocalStyles.account}>
                    <Grid>
                        <Col style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter]} size={30}>
                            <Image style={LocalStyles.image} source={ getProfilePicture(account.imageID) }/>
                        </Col>
                        <Col style={{flexDirection: "column",justifyContent: "center" }} size={60}>
                            <View>
                                <Text style={[Styles.typograhy.strong, {fontSize: 17}]}>
                                    {account.name}
                                </Text>
                            </View>
                        </Col>
                    </Grid>
                </TouchableOpacity>
            )
        })
        return (
        <View style={{flex: 1}}>
            <HeaderUser title="Add" paddBottom={0} navigation={this.props.navigation} />
            <Wrapper bg="#f5f5f5">
                {
                    this.state.step === 0 ? (
                        <View style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter, {minHeight: 500, flexDirection: "column"}]}>
                            {/* <View style={[Styles.UI.card, {width: "60%",backgroundColor: "#E91E62"}]}>
                                <TouchableOpacity onPress={() => this.steper(1)} style={[Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                                        <Text style={[Styles.typograhy.strong, {fontSize: 20, color: "#fff"}]}>Add an Update</Text>
                                        <Icon name="plus-circle-outline" style={{width: 20, height: 20, marginLeft: 10, marginTop: 5}} fill="#fff"/>
                                </TouchableOpacity>
                            </View>
                            <View style={[Styles.spacings.mTopMedium, Styles.spacings.mBottomMedium]}>
                                <Text style={Styles.typograhy.strong}>OR</Text>
                            </View> */}
                            <View style={[Styles.UI.card, {width: "60%", backgroundColor: "#09F"}]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("CreateQuestion")} style={[Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                                        <Text style={[Styles.typograhy.strong, {fontSize: 20, color: "#fff"}]}>Ask a Question</Text>
                                        <Icon name="info-outline" style={{width: 20, height: 20, marginLeft: 10, marginTop: 5}} fill="#fff"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null
                 }
                 {
                    this.state.step === 1 ? (
                        <View  style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter, {minHeight: 500, flexDirection: "column"}]}>
                            <View style={[Styles.alignments.column,{width: "80%",}]}>
                                <View style={Styles.alignments.horizontalCenter}>
                                    <Text style={[Styles.typograhy.strong, {fontSize: 25}]}>
                                        { this.state.accountSelectorLoader ? "Fetching Accounts" : "Choose Account"}
                                    </Text>
                                </View>
                                <View>
                                    {
                                        this.state.accountSelectorLoader ? 
                                        <View style={[Styles.spacings.mTopMedium, Styles.alignments.horizontalCenter]}>
                                            <Spinner size="giant" status='danger'/>
                                        </View> : 
                                        <View style={Styles.spacings.mTopMedium}>
                                            <View style={LocalStyles.accountSelector}>
                                                {accounts}
                                            </View>
                                            <TouchableOpacity onPress={() => this.steper(0)} style={[Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                                                <Text style={[Styles.typograhy.nunito, {color: "#09F", fontSize: 18}]}>Back</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    ) : null
                 }
            </Wrapper>
            <FootbarAction navigation={this.props.navigation} active="add"/>
        </View>
        );   
    }
}

const LocalStyles = StyleSheet.create({
    content: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    accountSelector: {
        width: "100%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#efefef",
        borderRadius: 10,
        overflow: "hidden"
    },
    account: {
        borderBottomColor: "#efefef",
        borderBottomWidth: 1,
        minHeight: 80
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "#333"
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
        UserLogout: () => dispatch(UserLogout()),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Add);


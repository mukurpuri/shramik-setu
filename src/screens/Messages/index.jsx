import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Spinner } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import Language from '../../config/languages/Language';
import Styles from '../../styles';

import { GetDashboardData } from '../../services/api.service';
import { CardContainer } from '../../../src/component/customComponents';
import FootbarAction from '../../component/FootbarAction';

class MessagesScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
        <View style={{flex: 1}}>
            <HeaderUser title="Messages" paddBottom={0} navigation={this.props.navigation} />
            <Wrapper bg="#f5f5f5">
                <Text>Messages</Text>
            </Wrapper>
            <FootbarAction navigation={this.props.navigation}/>
          </View>
        );   
    }
}
const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);

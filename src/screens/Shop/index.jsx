import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import FootbarAction from '../../component/FootbarAction';
import { SetUserLocation } from '../../redux/actions/user';

import Styles from '../../styles';

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          spinner: false,
        }
    }

    componentDidMount = async () => {

    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        let { user } = this.props;
        return (
          <View style={{flex: 1}}>
            <HeaderUser title="Connect" paddBottom={0} navigation={this.props.navigation} />
            <Wrapper bg="#f5f5f5">
                {/* {
                   !this.state.spinner ? 
                     <View style={{flex: 1, paddingBottom: 100}}>
                       <Categories/>
                       <Content>
                       </Content>
                     </View> :
                     <LoadingSetu />
                 } */}
                 <Text>Sjop</Text>
            </Wrapper>
            {/* <FootbarAction navigation={this.props.navigation} active="connect"/> */}
          </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
  placeholder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 500
  },
  gridContainer: {width: "100%"}
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Shop);

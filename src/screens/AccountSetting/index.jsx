import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet } from 'react-native';
import { Radio, RadioGroup, Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import FootbarAction from '../../component/FootbarAction';
import { SetUserLocation } from '../../redux/actions/user';

import Styles from '../../styles';
export const RadioGroupSimpleUsageShowcase = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <React.Fragment>
      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}>
        <Radio><Text style={Styles.typograhy.nunit}>Yes</Text></Radio>
        <Radio><Text style={Styles.typograhy.nunit}>No</Text></Radio>
      </RadioGroup>

    </React.Fragment>
  );
};
class AccountSetting extends React.Component {
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
                <View style={{padding: 20}}>
                  <Text style={[Styles.typograhy.strong, {fontSize: 17}]}>Privacy Settings</Text>
                  <Text style={[Styles.typograhy.nunito, Styles.spacings.mTopXSmall]}>
                    Show me when people search me during connect
                  </Text>
                  <View style={[Styles.spacings.mTopXSmall]}>
                    <RadioGroupSimpleUsageShowcase/>
                  </View>
                </View>
            </Wrapper>
            <FootbarAction navigation={this.props.navigation}/>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);

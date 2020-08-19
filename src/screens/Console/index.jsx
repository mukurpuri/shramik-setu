import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image, ImageBackground } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Icon, Spinner } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { PlusSquareIcon } from '../../component/Icons';
import Styles from '../../styles';
import { Otp } from '../../config/Images';
        

import { OTPStatus, SetUser } from '../../redux/actions/user';
import { SetSaveRequest } from '../../services/api.service';
import { SetuLogo } from '../../config/Images';
import Header from './header';
import Footer from './footer';
import Content from './content';
import { TouchableOpacity } from 'react-native-gesture-handler';
class Console extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          spinner: false,
          isStoryOpen: true,
          isRequestSent: false,
        }
    }

    toggleStory = () => {
      this.setState({
        isStoryOpen: !this.state.isStoryOpen
      });
    }
    requestSave = state => {
      this.setState({
        isRequestSent: state
      }, async () => {
        let data = {
          entityId: this.props.route.params.node.id,
          type: this.props.route.params.node.type,
          userId: this.props.user.id,
          isRequested: state
        }
       await SetSaveRequest(data);
      })
    }
    render() {
        let currentLanguage = this.props.settings.language;
        return (
            <View style={{flex: 1 }}>
            <Header isPrivate={this.props.route.params.node.isPrivate} toggleStory={this.toggleStory} node={this.props.route.params.node} navigation={this.props.navigation} />
            <Wrapper bg="#f4f4f4">
              {
                this.props.route.params.node.isPrivate ?  
                <View>
                  <View style={[Styles.alignments.horizontalCenter, Styles.alignments.verticalCenter, {height: 500}]}>
                    <View>
                    <View style={Styles.alignments.horizontalCenter}>
                      <Icon name="layers-outline" fill="#B5B5B5" style={{width: 90, height: 90}}/>
                    </View>
                    <View>
                      <Text style={[Styles.typograhy.strong,{fontSize: 26, color: "#888"}]}>
                        This is a Private Account
                      </Text>
                    </View>
                    <View>
                      <Text style={[Styles.typograhy.nunito,{fontSize: 18, color: "#888", textAlign: "center"}]}>
                        Only available in Saved Lists
                      </Text>
                    </View>
                    <View style={Styles.spacings.mTopMedium}>
                      {
                        this.state.isRequestSent ? 
                        <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                          <TouchableOpacity onPress={() => this.requestSave(false)}  style={[Styles.UI.card, {width: 200}]}>
                            <View style={[Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                              <Text style={[Styles.typograhy.nunito, {fontSize: 19, color: "#09F"}]}>
                                Requested 
                              </Text>
                              <Icon name="checkmark-outline" fill="#09F" style={{width: 23, height: 23, marginTop: 2, marginLeft: 4}}/>
                            </View>
                          </TouchableOpacity>
                        </View>
                         :
                        <Button onPress={() => this.requestSave(true)}  size='giant' status='danger' accessoryRight={PlusSquareIcon}>
                          Add to Save List
                        </Button>
                      }
                    </View>
                    </View>
                  </View>
                </View>
                : <Content isPrivate={this.props.route.params.node.isPrivate} toggleStory={this.toggleStory} isStoryOpen={this.state.isStoryOpen} />
              }
            </Wrapper>
            {
              this.props.route.params.node.isPrivate ?
              <View></View> : <Footer isStoryOpen={this.state.isStoryOpen}/>
            }
          </View>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    gridContainer: {width: "100%"},
    otpInput: { textAlign: "center", fontSize: 30, fontFamily: "nunito-bold" },
    image: { width: 80, height: 80},
    container: { width: "100%","justifyContent": "space-between" },
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      OTPStatus: status => dispatch(OTPStatus(status)),
      SetUser: data => dispatch(SetUser(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Console);


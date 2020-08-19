import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet } from 'react-native';
import { Radio, RadioGroup, Text, Input, Button, Icon, Spinner, TopNavigation, Divider } from '@ui-kitten/components';
import { Col, Row, Grid } from "react-native-easy-grid";
import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import FootbarAction from '../../component/FootbarAction';
import { setUserName } from '../../redux/actions/user';
import  { SubmitProfile } from '../../services/api.service';
import { EventRegister } from 'react-native-event-listeners'

import Styles from '../../styles';
import { GetProfile } from '../../services/api.service';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          spinner: false,
          data: {
              name: "",
              about: "",
              id: this.props.user.id
          }
        }
    }

    componentDidMount = () => {
        this.setState( {
            spinner: true
        }, async () => {
            await GetProfile(this.props.user.id).then(res => {
                if(res && res.status === 200) {
                    this.setState({
                        data: res.data.requests,
                        spinner: false
                    })
                }
            })
        })
    }

    setData = (text,type) => {
        const { data } = this.state;
        switch(type) {
            case 'name':
            data.name = text;
            break;

            case 'about':
            data.about = text;
            break;

            default:
            console.log("Unknown type");
        }
        this.setState({data});
    }

    submitChanges = () => {
        if(this.state.data.name === "") {
            alert("Empty Profile name");
            return;
        }
        const { data } = this.state;
        data.id = this.props.user.id;
        this.setState( {
            spinner: true
        }, async () => {
            await SubmitProfile(data).then(async res => {
                if(res && res.status === 200) {
                    await this.props.setUserName(res.data.name);
                    EventRegister.emit('loadMyProfile');
                    this.props.navigation.navigate("MyProfile")
                }
            })
        })
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        let { user } = this.props;
        return (
          <View style={{flex: 1}}>
            <HeaderUser title="Connect" paddBottom={0} navigation={this.props.navigation} />
            <Wrapper bg="#f5f5f5">
                {
                    this.state.spinner ? <View style={LocalStyles.spinnerContainer}><Spinner status="giant" status="danger"/></View> :  
                    <Grid style={LocalStyles.container}>
                    <Col>
                        <Text style={LocalStyles.label}>Profile Name</Text>
                        <Input
                        textStyle={[LocalStyles.inputText, Styles.typograhy.strong]}
                        placeholder="Profile Name"
                        style={LocalStyles.input}
                        value={this.state.data.name}
                        onChangeText = { text => this.setData(text, "name") }
                        />
                    </Col>
                    <Col style={Styles.spacings.mTopSmall}>
                        <Text style={LocalStyles.label}>About</Text>
                        <Input
                            textStyle={[LocalStyles.inputText, Styles.typograhy.strong]}
                            placeholder="About you"
                            textStyle={[LocalStyles.innerTextStyle]}
                            style={LocalStyles.input}
                            value={this.state.data.about}
                            multiline={true}
                            numberOfLines={7}
                            onChangeText = { text => this.setData(text, "about") }
                        />
                    </Col>
                    <Row style={Styles.spacings.mTopSmall}>
                        <Button onPress={() => this.submitChanges()} style={[Styles.alignments.full]} status="success" size="medium">
                        <Text style={[Styles.typograhy.strong, Styles.typograhy.white]}>
                            Save Changes
                        </Text>
                        </Button>
                    </Row>
                 </Grid>
                }
            </Wrapper>
            
            <FootbarAction navigation={this.props.navigation} active="connect"/>
          </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        width: "100%",
        backgroundColor: "white"
    },
    label: {
        fontSize: 12,
        fontFamily: "nunito"
    },
    innerTextStyle: {
        fontFamily: "nunito-bold",
        textAlignVertical : 'top'
    },
    spinnerContainer: {
        width: "100%",
        minHeight: 400,
        justifyContent: "center",
        alignItems: "center"
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
        setUserName: name => dispatch(setUserName(name))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Radio, RadioGroup, Text, Input, Button, Icon, Spinner, TopNavigation, Divider } from '@ui-kitten/components';
import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { CheckIcon } from '../../component/Icons';
import Styles from '../../styles';
import { UploadRegisterData, SubmitUserProfile } from '../../services/api.service';
import { setUserName } from '../../redux/actions/user';
import { Namastey } from '../../config/Images';

import Footer from '../../component/Footer';

class RegisterScreen extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          spinner: false,
          screen: 1,
          data: {
            name: "",
            sex: 0,
            location: 0
          },
          image: {
            fileName: "",
            type: "",
            uri: ""
          }
        }
    }

    save = async () => {
      let { name, sex } = this.state.data;
      const { language } = this.props.settings;
      let error = "";
      if(name.length <= 2) {
        let error = (language === "hi" ? "अपना सही नाम बताये" : "Enter your name");
        alert(error);
        return false;
      }
      if(sex === -1) {
        let error = (language === "hi" ? "अपना लिंग बताये" : "Enter your gender");
        alert(error);
        return false;
      }
      let { data } = this.state;
      data.id = this.props.user.id;
      this.setState({
        spinner: true
      });
      await SubmitUserProfile(data).then( async (res) => {
        let response = res.data;
        if(response) {
          let name = response.name ||  "";
          let phoneNumber = response.phoneNumber ||  "";
          if(phoneNumber === this.props.user.phoneNumber) {
            await this.props.setUserName(name);
            this.props.navigation.navigate('ProfilePicture');
          } else {
            alert("Something went wrong");
            this.setState({
              spinner: false
            });
          }
        }
      });
    }

    setValue = (val,type) => {
      const { data } = this.state;
      switch(type) {
        case 'name': 
        data.name = val;
        break;

        case 'sex': 
        data.sex = val;
        break;

        case 'city':
        data.city = val;
        break;
      }
      this.setState({data})
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        let { user } = this.props;
        return (
          <Wrapper paddLeft={15} paddRight={15}>
              <Grid>
                  <Row style={[Styles.spacings.mTopLarge, Styles.alignments.horizontalCenter]}><Image style={[LocalStyles.image]} source={Namastey}/></Row>
                  <Row style={[Styles.spacings.mTopMedium, Styles.alignments.horizontalCenter]}><Text category="h1" style={[Styles.typograhy.strong, Styles.spacings.mTopSmall]}>Register for Setu</Text></Row>
                  <Row><Text style={[Styles.typograhy.label, Styles.spacings.mTopMedium]}>{Language.get("register", "name", currentLanguage)}</Text></Row>
                  <Row style={[Styles.spacings.mTopXSmall]}>
                    <Input
                      textStyle={[LocalStyles.inputText, Styles.typograhy.strong]}
                      placeholder={Language.get("register", "placeholderName", currentLanguage)}
                      onChangeText={nextValue => this.setValue(nextValue, "name")}
                      value={this.state.data.name}
                    />
                  </Row>
                  <Row style={Styles.spacings.mTopSmall}/>
                  <Text style={[Styles.typograhy.label, Styles.spacings.mTopSmall]} >{Language.get("register", "sex", currentLanguage)}</Text>
                  <Row >
                    <RadioGroup
                    style={Styles.alignments.row}
                    selectedIndex={this.state.data.sex}
                    onChange={index => this.setValue(index, "sex")}>
                      <Radio
                        ><Text style={ Styles.typograhy.nunito ,LocalStyles.radioText}>{Language.get("register", "sexFemale", currentLanguage)}</Text>
                      </Radio>
                      <Radio  style={LocalStyles.radio}
                        ><Text style={ Styles.typograhy.nunito ,LocalStyles.radioText}>{Language.get("register", "sexMale", currentLanguage)}</Text>
                      </Radio>
                      <Radio style={LocalStyles.radio}
                        ><Text style={ Styles.typograhy.nunito ,LocalStyles.radioText}>{Language.get("register", "sexOther", currentLanguage)}</Text>
                      </Radio>
                      </RadioGroup>
                  </Row>
                  <Row style={Styles.spacings.mTopSmall}/>
                  <Text style={[Styles.typograhy.label, Styles.spacings.mTopSmall]} >{Language.get("register", "location", currentLanguage)}</Text>
                  <Row >
                    <RadioGroup
                    style={Styles.alignments.row}
                    selectedIndex={this.state.data.location}
                    onChange={index => this.setValue(index, "location")}>
                      <Radio
                        ><Text style={ Styles.typograhy.nunito ,LocalStyles.radioText}>Jaipur</Text>
                      </Radio>
                      <Radio style={LocalStyles.radio} disabled={true}
                        ><Text style={ Styles.typograhy.nunito ,LocalStyles.radioText}>Delhi</Text>
                      </Radio>
                      <Radio style={LocalStyles.radio} disabled={true}
                        ><Text style={ Styles.typograhy.nunito ,LocalStyles.radioText}>Mumbai</Text>
                      </Radio>
                      </RadioGroup>
                  </Row>
                  <Row style={{minHeight: 50}}/>
                  <Row style={[Styles.alignments.row, Styles.spacings.mTopXSmall,  Styles.alignments.horizontalCenter]} >
                    {
                      !this.state.spinner ? 
                        <Button onPress={() => this.save()} style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='danger' accessoryRight={CheckIcon}>
                          {Language.get("signin","createAccount",currentLanguage)}
                        </Button> : <Spinner size="large" status="danger"/>
                    }
                  </Row>
              </Grid>
            <Footer/>
          </Wrapper>
        );   
    }
}


const LocalStyles = StyleSheet.create({
  inputText: {fontSize: 20, width: "94%"},
  radioText: { fontSize: 16 },
  radio: { margin: 12 },
  image: {
    width: 100, height: 100
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
      setUserName: name => dispatch(setUserName(name))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);


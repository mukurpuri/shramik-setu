import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Radio, RadioGroup, Text, Input, Button, Icon, Spinner, TopNavigation, Divider } from '@ui-kitten/components';
import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { CheckIcon } from '../../component/Icons';
import Styles from '../../styles';
import { UploadUserImage, UpdateUserImage } from '../../services/api.service';
import PhotoUpload from './PhotoUpload';

import Footer from '../../component/Footer';
import { setUserImage } from '../../redux/actions/user';

class ProfilePictureScreen extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          spinner: false,
          image: {
            fileName: "",
            type: "",
            uri: ""
          }
        }
    }

    setProfileImage = img => {
      let { image } = this.state;
      image.uri = img.uri;
      image.fileName = "some_random_name"
      image.type = "image"
      this.setState({ image })
    }

    saveDisplayPicture = async () => {
        const uri = this.state.image.uri;
        this.setState({
          spinner: true
        })
        if(uri) {
          const uriParts = uri.split('.');
          const fileType = uriParts[uriParts.length - 1];
          const formData = new FormData();
          formData.append('avatar', {
            uri,
            name: `photo.${fileType}`,
            type: `image/jpeg`
          });
          await UploadUserImage(formData).then( async (res) => {
            if(res.data.result === "pass") {
              await UpdateUserImage(res.data.imageID, this.props.user.phoneNumber).then( async (newRes) => {
                if(newRes && newRes.data && newRes.data.result === "pass") {
                  this.setState({
                    spinner: true
                  }, () => {
                    this.props.setUserImage(res.data.imageID)
                    this.props.navigation.navigate("Welcome")
                  })
                }
              });
            } else {
              alert("Something went wrong")
            }
          });
        }
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        let { user } = this.props;
        return (
          <Wrapper>
              <Row style={[Styles.spacings.mTopMedium, Styles.alignments.horizontalCenter]}><Text category="h3" style={[Styles.typograhy.strong, Styles.spacings.mTopSmall]}>Have a Profile Picture</Text></Row>
              <Grid  style={{minHeight: 550}}>
                  {
                    this.state.spinner ?
                    <Grid><Row style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]}><Spinner status='danger' size='giant'/></Row></Grid> : <Row>
                    <PhotoUpload skipLink={() => {this.props.navigation.navigate("Welcome")}} saveDisplayPicture={() => this.saveDisplayPicture()} uri={this.state.image.uri} setProfileImage={image => this.setProfileImage(image)} currentLanguage={currentLanguage}/>
                  </Row>
                  }
              </Grid> 
          </Wrapper>
        );   
    }
}


const LocalStyles = StyleSheet.create({
  inputText: {fontSize: 20, width: "94%"},
  radioText: { fontSize: 16 },
  radio: { margin: 12 },
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings,
    user: state.userReducer.user
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      setUserImage: id => dispatch(setUserImage(id))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePictureScreen);


import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image, TextInput, Keyboard } from 'react-native';


import { Text, Icon, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider, Avatar } from '@ui-kitten/components';
import { EventRegister } from 'react-native-event-listeners'
import { Col, Row, Grid } from "react-native-easy-grid";



import { RightIcon, ProfileIcon, BackIcon } from '../../component/Icons';
import Styles from '../../styles';

import { UploadImage } from '../../services/api.service';
import { TouchableOpacity,TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SetuTextLogo, SendIcon } from '../../config/Images';

import { getAllEmojis } from '../../utilities/helpers';
import ImageUploader from './ImageUploader';
class Footer extends React.Component {
    _isMounted = false;
    constructor(props) {
      super(props);
        this.state = {
          message: {
            text: "",
            type: 1,
            media: ""
          },
          image: {
            fileName: "",
            type: "",
            uri: ""
          },
          imageUploadSpinner: false,
          toggleImageUploader: false
        }
    }
    componentDidMount = () => {
      //getAllEmojis()
    }
    setMessage = text => {
      const { message } = this.state;
      message.text = text;
      this.setState({ message })
    }

    sendMessage = () => {
      let { message, uploadedImage } = this.state;
      if(message.type === 2 && uploadedImage) {
        message.media = uploadedImage;
      }
      this.props.setMessage(message);
      this.setState({
        toggleImageUploader: false,
        message: {
          text: "",
          type: 1,
          media: ""
        },
        image: {
          fileName: "",
          type: "",
          uri: "",
          spinner: false
        },
        uploadedImage: null,
      }, () => {
        Keyboard.dismiss();
      })
    }

    toggleImageUploaderPannel = () => {
      this.setState({
        image: {
          fileName: "",
          type: "",
          uri: "",
          spinner: false
        },
        toggleImageUploader: !this.state.toggleImageUploader
      })
    }

    saveDisplayPicture = async () => {
      const uri = this.state.image.uri;
        this.setState({
          spinner: true,
          imageUploadSpinner: true,
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
          await UploadImage(formData).then( async (res) => {
            if(res.data.result === "pass") {
              this.setState({
                spinner: false,
                imageUploadSpinner: false,
                uploadedImage: res.data.imageID
              })
            } else {
              alert("Something went wrong")
            }
          });
        }
    }

    setImage = img => {
      let { image, message } = this.state;
      image.uri = img.uri;
      message.type = 2;
      image.fileName = "some_random_name";
      image.type = "image";
      message.media = image.uri;
      this.setState({ image, message }, () => {
        this.saveDisplayPicture();
      })
    }


    render() {
        let currentLanguage = this.props.settings.language;
        return (
          <View style={[LocalStyles.footer]}>
            {
              this.state.toggleImageUploader ?
              <View>
                <View style={{ alignItems: "flex-end"}}>
                  <TouchableOpacity onPress={() => this.toggleImageUploaderPannel()} style={{top: -3, left: -10, zIndex: 10, backgroundColor: "#FFF", borderTopStartRadius: 10, borderTopEndRadius: 10, borderWidth: 1, borderStyle: "dashed" , borderColor: "#ccc" , width: 50, height: 50 }}>
                      <Icon fill="#999" name="close-outline" style={{width: 50, height: 50}}/>
                  </TouchableOpacity>
                </View>
                <ImageUploader spinner={this.state.imageUploadSpinner} minHeight={300} width={20} image={this.state.image} setImage={this.setImage} saveDisplayPicture={this.saveDisplayPicture}/>
              </View>
              : null
            }
            <Grid style={{paddingBottom: 5, paddingTop: 5}}>
              <Col style={LocalStyles.messagePart} size={this.state.spinner ? 100 : 85}>
                <Grid>
                  <Col size={85}>
                    <TextInput ref="message" value={this.state.message.text} onChangeText={ text => this.setMessage(text)} placeholderTextColor="#888" multiline={true} placeholder="Write your Message" style={[LocalStyles.messageInput]} />
                  </Col>
                  <Col size={15}>
                    <TouchableOpacity onPress={() => this.toggleImageUploaderPannel()}>
                      <Icon fill="#888" name="image-outline" style={{width: 30, height: 30, marginTop: 10}}/>  
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </Col>
              {
                this.state.spinner ?
                null:
                <Col size={15}>
                  <TouchableWithoutFeedback onPress={() => this.sendMessage()} style={LocalStyles.sendButton}>
                      <Image source={SendIcon} style={{width: 25, height: 25}}/>
                    </TouchableWithoutFeedback>
                </Col>
              }
            </Grid>
          </View>
        );   
    }
}

const LocalStyles = StyleSheet.create({
    sendButton: {
      backgroundColor: "#E91E62",
      width: 50,
      height: 50,
      borderRadius: 600,
      justifyContent: "center",
      alignItems: "center",
    },
    emojiContainer: {
      height: 250,
      top: 5,
      left: 0,
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#ececec",
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 6
    },
    messagePart: {
      borderRadius: 600,backgroundColor: "white", borderWidth: 1, borderColor: "#ececec", marginLeft: 5, marginRight: 5
    },
    disabledFooter: {
      width: "100%",
      position: "absolute",
      backgroundColor: "rgba(255,255,255,0.95)",
      height: 68,
      bottom: 6,
      left: 0,
      right: 0,
      borderRadius: 6,
      zIndex: 12,
      top: 0,
    },
    footer: {
        width: "100%",
        position: "absolute",
        minHeight: 45,
        bottom: 0,
        backgroundColor: "#f4f4f4",
        zIndex: 12
    },
    messageInput: {
        paddingLeft: 20,
        paddingTop: 0,
        fontSize: 18 ,
        color: "#444",
        maxHeight: 165,
        minHeight: 50
    },
    imageUploader: {
      bottom: 5,
      height: 350,
      backgroundColor: "white",
      borderRadius: 6,
      borderWidth: 1,
      width: "90%",
      borderColor: "#efefef"
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Footer);


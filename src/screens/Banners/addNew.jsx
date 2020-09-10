import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Text, Input, Button, Icon, Spinner, CheckBox } from '@ui-kitten/components';
import  Wrapper from '../../component/Wrapper';
import Styles from '../../styles';
import _ from 'lodash';
import { CreateBanner, UploadImage } from '../../services/api.service';
import HeaderUser from '../../component/HeaderUser';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { EventRegister } from 'react-native-event-listeners'
import ImageUploader from '../../screens/Console/ImageUploader';

class AddNewBanner extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            spinner: false,
            style: 1,
            act: true,
            imageUploadSpinner: false,
            data: {
                name: "",
                style: 1,
                imageID: ""
            },
            image: {
                fileName: "",
                type: "",
                uri: ""
              }
        }
    }

    setBannerName = name => {
        const { data } = this.state;
        data.name = name;
        this.setState({
            data
        });
    }

    activateB = type => {
        this.setState({
            style: type,
        })
    }

    setImage = img => {
        let { image } = this.state;
        image.uri = img.uri;
        image.fileName = "some_random_name";
        image.type = "image";
        this.setState({ image }, () => {
          this.saveDisplayPicture();
        })
    }

    saveDisplayPicture = async () => {
        const uri = this.state.image.uri;
        this.setState({
        imageUploadSpinner: true
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
                imageUploadSpinner: false,
                uploadedImage: res.data.imageID
            })
            } else {
            alert("Something went wrong")
            }
        });
        }
    }
    
    saveBanner = async () => {
        let data = {
            imageId: this.state.uploadedImage || "",
            text: this.state.data.name || "",
            style: this.state.style || 1,
            shopId: this.props.route.params.shopId,
            activateOnStart: this.state.act || true
        }
        this.setState({
            spinner: true,
        }, async () => {
            if(data.imageID === "" && data.text === "") {
                alert("You should atleast use text or Image for banner")
            } else {
                await CreateBanner(data).then(res=> {
                    if(res.status === 200) {
                        this.setState({
                            spinner: false
                        }, () => {
                            EventRegister.emit("loadMyBanners");
                            this.props.navigation.navigate("MyBanners");
                        })
                    }
                })
            }
        })
    }

    render() {
        return (
            <View style={{flex: 1 }}>
              <HeaderUser title="Home" paddBottom={0} navigation={this.props.navigation} />
              <Wrapper paddLeft={15} paddRight={15} bg="#f4f4f4">
              <Text style={[Styles.typograhy.strong, Styles.spacings.mTopSmall ,{fontSize: 20}]}>Create Banner</Text>
                    <View style={[Styles.UI.card, Styles.spacings.mTopXSmall]}>
                        <View style={Styles.spacings.mBottomSmall}>
                            <View>
                                <Text style={Styles.typograhy.strong}>Add Banner Text</Text>
                            </View>
                            <View>
                                <Input
                                    multiline = {true}
                                    numberOfLines = {5}
                                    textStyle={[LocalStyles.innerTextStyle]}
                                    inputStyle={[{textAlignVertical : 'top'}]}
                                    onChangeText={(val) => this.setBannerName(val)}
                                    style={[LocalStyles.iputText]}
                                    value={this.state.data.name}
                                />
                            </View>
                        </View>
                        <View>
                            <ImageUploader isEditable={true} spinner={this.state.imageUploadSpinner} minHeight={180} width={70} image={this.state.image} setImage={this.setImage} saveDisplayPicture={this.saveDisplayPicture}/>
                        </View>
                        <View style={Styles.spacings.mBottomSmall}>
                            <View>
                                <Text style={Styles.typograhy.strong}>Style</Text>
                            </View>
                            <View style={Styles.spacings.mTopXSmall}>
                                <Grid>
                                    <Col size={50}>
                                        <TouchableOpacity onPress={() => this.activateB(1)} style={[LocalStyles.linkButton, this.state.style === 1 ? LocalStyles.activated : {} ]}><Text style={[LocalStyles.linkText, this.state.style === 1 ? Styles.typograhy.white: {}]}>Image on Top</Text></TouchableOpacity>
                                    </Col>
                                    <Col size={5}></Col>
                                    <Col size={50}>
                                        <TouchableOpacity  onPress={() => this.activateB(2)} style={[LocalStyles.linkButton, this.state.style === 2 ? LocalStyles.activated : {} ]}><Text style={[LocalStyles.linkText, this.state.style === 2 ? Styles.typograhy.white: {}]}>Image on Bottom</Text></TouchableOpacity>
                                    </Col>
                                </Grid>
                            </View>
                        </View>
                        <View>
                        <CheckBox
                            checked={this.state.act}
                            onChange={(act) => this.setState({act})}>
                            <Text style={Styles.typograhy.strong}>Activate on Creation</Text>
                        </CheckBox>
                        </View>
                    </View>
                    {
                        !this.state.imageUploadSpinner ? 
                        <View style={Styles.spacings.mTopSmall}>
                            <Button onPress={() => this.saveBanner()} style={[Styles.alignments.full, LocalStyles.button]}  size='large' status='danger'>
                                Save and Create Banner
                            </Button>
                        </View> : null
                    }

                    <View style={Styles.spacings.mTopSmall}>
                    </View>
                    <View style={Styles.spacings.mTopSmall}>
                    </View>
                    <View style={Styles.spacings.mTopSmall}>
                    </View>
                    <View style={Styles.spacings.mTopSmall}>
                    </View>
                    <View style={Styles.spacings.mTopSmall}>
                    </View>
                    <View style={Styles.spacings.mTopSmall}>
                    </View>
                    <View style={Styles.spacings.mTopSmall}>
                    </View>

              </Wrapper>
          </View>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    innerTextStyle: {
        backgroundColor: "white",
        fontFamily: "nunito-bold",
        justifyContent: "center",
        textAlignVertical : 'top'
    },
    iputText: {
        backgroundColor: "white",
        marginTop: 5,
    },
    linkButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6
    },
    activated: {
        borderWidth: 1,
        borderColor: "#09F",
        borderRadius: 6,
        backgroundColor: "#09F"
    },
    linkText: {
        fontFamily: "nunito-bold",
        textAlign: "center",
        fontSize: 16
    }
});
  
export default AddNewBanner;


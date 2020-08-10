import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet,  Image, TouchableOpacity, ScrollView } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Divider, Spinner, Icon, Card, CheckBox } from '@ui-kitten/components';
import _, { map } from 'lodash';
import  Wrapper from '../../../component/Wrapper';
import Language from '../../../config/languages/Language';
import { RightIcon, AwardIcon, UserIcon, CircularCheckIconFull, LocationIcon, AddCircular } from '../../../component/Icons';
import Styles from '../../../styles';
import HeaderUser from '../../../component/HeaderUser';
import { AddressFromCurrentLocation, FetchShopCategories, SetupShop, UploadUserImage } from '../../../services/api.service';
import QaStyles from '../../../styles/QaStyles';
import FootbarAction from '../../../component/FootbarAction';
import { ECommerce, PaperNote, LocationShop } from '../../../config/Images';
import * as Location from 'expo-location';
import PhotoUpload from '../../ProfilePictureScreen/PhotoUpload';
import { getProfilePictureShop } from '../../../utilities/helpers';
import { EventRegister } from 'react-native-event-listeners'

class CreateShop extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
        questionId: 11,
        spinner: false,
        currentScreen : 0,
        data: {
            name: "",
            categories: null,
            about: "",
            address: "",
            lat: 0,
            lng: 0,
            imgageID: null
        },
      }
  }

  setValue = (val, type) => {
    let { data } = this.state;  
    switch(type) {
        case "name":
        data.name = val;
        break;

        case "about":
        data.about = val;
        break;

        case "agree":
        data.agree = val;
        break;

        case "categories":
        data.categories = val;
        break;
    }
    this.setState({data});
  }

  continue = next => {
      this.setState({
          currentScreen: next
      })
  }

  previous = previous => {
      this.setState({
          currentScreen: previous
      })
  }

  setCategory = categories => {
      this.setValue(categories, "categories")
  }

  continueCategories = () => {
    if(this.state.data.categories && this.state.data.categories.length > 0) {
        this.setState({ currentScreen: 4 });
    } else {
        alert("Select at least one category");
    }
  }

  uplodaPictureAndSave = uri => {
    if(uri) {    
        this.setState({
          currentScreen: 5
        }, async () => {
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
                    let { data } = this.state;
                    data.imageID = res.data.imageID;
                    data.userID = this.props.user.id
                    await SetupShop(data).then( async (newRes) => {
                        if(newRes && newRes.data && newRes.data.result === "pass") {
                            const { data } = this.state;
                            data.name = newRes.data.name;
                            data.imageID = newRes.data.imageID;
                            this.setState({
                                data,
                                currentScreen: 6
                            })
                        }
                    });
                } else {
                alert("Something went wrong")
                }
            });
        })
    }
  }

  setAddressData = (address, lat, lng) => {
      let { data } = this.state;
        data.address = address;
        data.lat = lat;
        data.lng = lng;
        this.setState({data});
  }

  navigateToNewAccount = () => {
    EventRegister.emit('loadOtherAccounts');
    this.props.navigation.navigate("Menu");
  }

  render() {
      let currentLanguage = this.props.settings.language;
      const { user } = this.props;
      const { currentScreen } = this.state;
      return (
        <View style={{flex: 1}}>
        <Wrapper bg="#f5f5f5">
          <HeaderUser
            leftIconCall = { () => this.navigate()}
            showBack={true}
            hideHam={true}
            showMenu={false}
            paddBottom={0}
            title="Ask Question" 
            navigation={this.props.navigation}/>
            <View style={{paddingLeft: 15, paddingRight: 15}}>
                {
                    currentScreen === 0 ? <Welcome continue={() => this.continue(1)}/> : null
                }
                {
                    currentScreen === 1 ? <BasicInformation previous={() => this.previous(0)} continue={() => this.continue(2)} data={this.state.data} setValue={this.setValue} /> : <Text></Text>
                }
                {
                    currentScreen === 2 ? <LocationInformation previous={() => this.previous(1)} setAddressData={this.setAddressData} continue={() => this.continue(3)} /> : <Text></Text>
                }
                {
                    currentScreen === 3 ? <CategoriesSelector setCategory={this.setCategory} previous={() => this.previous(2)} continue={() => this.continue(4)} /> : <Text></Text>
                }
                {
                    currentScreen === 4 ? <ProfilePictureSelector uplodaPictureAndSave={this.uplodaPictureAndSave} previous={() => this.previous(3)}  continue={() => this.continue(5)} /> : <Text></Text>
                }
                {
                    currentScreen === 5 ? <SavingShop/> : <Text></Text>
                }
                {
                    currentScreen === 6 ? <ShopCreated data={this.state.data} navigateToNewAccount={this.navigateToNewAccount} /> : <Text></Text>
                }
                   
            </View>
        </Wrapper>
        {
            currentScreen === 3 ? 
            <View style={{position: "absolute", bottom: 60, justifyContent: "center", alignContent: "center", alignItems: "center", width: "100%"}}>
            <Button onPress={() => this.continueCategories()} style={[Styles.alignments.full, LocalStyles.button, Styles.typograhy.strong, {marginLeft: "auto", marginRight: "auto", width:"90%"}]}  size='giant' status='danger' accessoryRight={RightIcon}>
                    Continue
            </Button></View> : null
        }
        <FootbarAction navigation={this.props.navigation}/>
        </View>
      );   
  }
}

class Welcome extends React.Component {
    render() {
        return (
            <React.Fragment>
                <View style={Styles.spacings.mTopMedium}>
                    <View style={Styles.alignments.horizontalCenter}>
                        <Image source={ECommerce} style={{width: 100, height: 100}} />
                    </View>
                    <View style={[Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                        <Text style={{fontSize: 22, fontFamily: "nunito-bold", color: "#444"}}>Grow your Bussiness on Setu</Text>
                    </View>
                </View>
                <Grid style={[LocalStyles.container, Styles.spacings.mTopSmall]}>
                        <Row style={[Styles.spacings.mTopSmall]}>
                        <Col size={12}>
                            <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                        </Col>
                        <Col size={88}>
                            <Text style={LocalStyles.listText, Styles.typograhy.strong}>Take your Shop or Business Online instantly</Text>
                        </Col>
                        </Row>
                        <Row style={[Styles.spacings.mTopSmall]}>
                        <Col size={12}>
                            <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                        </Col>
                        <Col size={88}>
                            <Text style={LocalStyles.listText, Styles.typograhy.strong}>Reach out to your nearest Customers easily</Text>
                        </Col>
                        </Row>
                        <Row style={[Styles.spacings.mTopSmall]}>
                        <Col size={12}>
                            <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                        </Col>
                        <Col size={88}>
                            <Text style={LocalStyles.listText, Styles.typograhy.strong}>Increase your Sales by offering attractive Deals to your Customers</Text>
                        </Col>
                        </Row>
                        <Row style={[Styles.strong, Styles.spacings.mTopXSmall]}>
                            <Button onPress={() => this.props.continue()} style={[Styles.alignments.full, LocalStyles.button, Styles.spacings.mTopMedium, Styles.typograhy.strong]}  size='giant' status='danger' accessoryRight={RightIcon}>
                                Start Setting your Business
                            </Button>
                        </Row>
                    </Grid>
            </React.Fragment>
        )
    }
}

class BasicInformation extends React.Component {
    constructor(props) {
        super(props);  
    }

    setValue = (val, type) => {
        this.props.setValue(val, type)
    }

    submitName = () => {
        if(this.props.data.name === "" || this.props.data.name.length <= 2) {
            alert("Not a valid shop name provided");
        } else {
            this.props.continue();
        }
    }

    render() {
        return (
            <React.Fragment>
                <View style={Styles.spacings.mTopMedium}>
                    <View style={Styles.alignments.horizontalCenter}>
                        <Image source={PaperNote} style={{width: 100, height: 100}} />
                    </View>
                    <View style={[Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                        <Text style={{fontSize: 22, fontFamily: "nunito-bold", color: "#444"}}>1. Add Basic Information</Text>
                    </View>
                </View>
                <Grid style={[LocalStyles.container, Styles.spacings.mTopSmall]}>
                        <Col style={[Styles.spacings.mTopSmall]}>
                        <Text style={[Styles.typograhy.nunito, {color: "#999"}]}>Name</Text>
                        <Input
                            textStyle={[LocalStyles.inputText, Styles.typograhy.strong]}
                            placeholder="Enter your Shop/Business name"
                            onChangeText={nextValue => this.setValue(nextValue, "name")}
                            value={this.props.data.name}
                        />
                        </Col>
                        <Col style={[Styles.spacings.mTopSmall]}>
                            <Text style={[Styles.typograhy.nunito, {color: "#999"}]}>About (optional)</Text>
                            <Input
                                style={{backgroundColor: "white"}}
                                multiline={true}
                                textStyle={[LocalStyles.innerTextStyle]}
                                placeholder="Description about your Business"
                                onChangeText={nextValue => this.setValue(nextValue, "about")}
                                value={this.props.data.about}
                            />
                        </Col>
                        <Row style={[Styles.spacings.mTopSmall]}>
                        
                        </Row>
                        <Row style={[Styles.strong, Styles.spacings.mTopXSmall]}>
                            <Button onPress={() => this.submitName()} style={[Styles.alignments.full, LocalStyles.button, Styles.spacings.mTopMedium, Styles.typograhy.strong]}  size='giant' status='danger' accessoryRight={RightIcon}>
                               Continue
                            </Button>
                        </Row>
                        <Row style={[Styles.strong, Styles.spacings.mTopXSmall, Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]}>
                            <TouchableOpacity onPress={() => this.props.previous()}>
                                <Text style={LocalStyles.goBackLink}>
                                « Go Back
                                </Text>
                            </TouchableOpacity>
                        </Row>
                    </Grid>
            </React.Fragment>
        )
    }
}
class LocationInformation extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
            showAdressSelector: true,
            address: null
          }
    }

    chooseCurrentLocation = async () => {
        this.setState({
            showLoader: true
        }, async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
            } else {
                let locationData = await Location.getCurrentPositionAsync({});
                let coordinates = {
                lat: locationData.coords.latitude,
                lng: locationData.coords.longitude
                }
                await AddressFromCurrentLocation(coordinates).then((res) => {
                    this.setState({
                        showLoader: false
                    }, () => {
                        if(res && res.status === 200) {
                            this.props.setAddressData(res.data.address, res.data.lat, res.data.lng);
                            this.setState({
                                address: res.data.address,
                                showAdressSelector: false
                            });
                        }
                    });
                });
            }
        })
    }
    render() {
        return (
            <React.Fragment>
                <View style={Styles.spacings.mTopMedium}>
                    <View style={Styles.alignments.horizontalCenter}>
                        <Image source={LocationShop} style={{width: 100, height: 100}} />
                    </View>
                    <View style={[Styles.alignments.horizontalCenter, Styles.spacings.mTopSmall]}>
                        <Text style={{fontSize: 22, fontFamily: "nunito-bold", color: "#444"}}>2. Set Shop/Business Address</Text>
                    </View>
                </View>
                <Grid style={[LocalStyles.container, Styles.spacings.mTopSmall]}>
                        {
                            !this.state.showLoader ? (
                                this.state.showAdressSelector ? 
                                <React.Fragment>
                                    <Col style={[Styles.spacings.mTopSmall]}>
                                        <Button onPress={() => this.chooseCurrentLocation()} style={[Styles.alignments.full, LocalStyles.button, Styles.spacings.mTopMedium, Styles.typograhy.strong]}  size='giant' status='primary' accessoryRight={LocationIcon}>
                                            Choose Current Location
                                        </Button>
                                    </Col>
                                </React.Fragment>
                                : 
                                <React.Fragment>
                                    <Row style={[Styles.spacings.mTopSmall]}>
                                        <Text style={LocalStyles.ored}>{this.state.address}</Text>
                                        
                                    </Row>
                                    <Row style={[Styles.spacings.mTopSmall]}>
                                        <Text style={LocalStyles.note}>
                                            Note: You can change the address manually later!!
                                        </Text>
                                    </Row>
                                    <Row style={[Styles.strong, Styles.spacings.mTopSmall]}>
                                        <Button onPress={() => this.props.continue()} style={[Styles.alignments.full, LocalStyles.button, Styles.typograhy.strong]}  size='giant' status='danger' accessoryRight={RightIcon}>
                                            Set and Continue
                                        </Button>
                                    </Row>
                                </React.Fragment>
                            ) : <View style={LocalStyles.spinnerContainer}><Spinner status="giant" status="danger"/></View>
                        }
                        
                        <Row style={[Styles.strong, Styles.spacings.mTopXSmall, Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]}>
                            <TouchableOpacity onPress={() => this.props.previous()}>
                                <Text style={LocalStyles.goBackLink}>
                                « Go Back
                                </Text>
                            </TouchableOpacity>
                        </Row>
                    </Grid>
            </React.Fragment>
        )
    }
}
class CategoriesSelector extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
            showLoader: true,
            categories: [],
            tempCategories: [],
            selectedCategoriesList: [],
          }
    }
    
    componentDidMount = async () => {
        await FetchShopCategories().then((res) => {
            if(res && res.status === 200) {
                // this.props.setAddressData(res.data);
                this.setState({
                    categories: res.data.categories,
                    tempCategories: res.data.categories,
                    showLoader: false
                });
            }
        });
    }

    searchCategory = (val) => {
        if(val) {
            let searchedCategories = [];
            this.setState({
                tempCategories: this.state.categories
            }, () => {
                _.each(this.state.tempCategories, category => {
                    if(category.name.indexOf(val) >= 0) {
                        searchedCategories.push(category);
                    }
                });
                this.setState({
                    tempCategories: searchedCategories
                });
            })
        } else {
            this.setState({
                tempCategories: this.state.categories
            });
        }
    }

    removeCategory = name => {
        let { selectedCategoriesList } = this.state;
        let newList = [];
        _.each(selectedCategoriesList, g => {
            if(g !== name) {
                newList.push(g);
            }
        });
        this.setState({
            selectedCategoriesList: newList
        }, () => {
            this.props.setCategory(this.state.selectedCategoriesList);
        })
    }

    selectCategory = (id, name) => {
        let { selectedCategoriesList } = this.state;
        if(selectedCategoriesList.indexOf(name) < 0) {
            selectedCategoriesList.push(name);
        }
        this.setState({ selectedCategoriesList }, () => 
        {
            this.props.setCategory(this.state.selectedCategoriesList);
        })
    }

    render() {
        let categoryPills = [];
        let selectedCategories = [];
        _.each(this.state.selectedCategoriesList, sc => {
            selectedCategories.push(<TouchableOpacity onPress={() => this.removeCategory(sc)} key={`selectedCategory-${sc}`} style={{width: "100%", position: "relative"}}><Text style={LocalStyles.selectedCatText}>{sc}</Text><Icon style={{width: 25, height: 25, position: "absolute", right: 10, top: -45}} fill="#333" name="close-outline" /></TouchableOpacity>)
        })
        _.each(this.state.tempCategories, (category, index) => {
            categoryPills.push(<TouchableOpacity onPress={() => {this.selectCategory(category._id, category.name)}} key={`cat-${category._id}`} style={LocalStyles.pills}><View><Text style={LocalStyles.pillText}>{category.name}</Text></View></TouchableOpacity>)
        })
        return (
            <React.Fragment>
                <View style={{paddingBottom: 200}}>
                    <View style={[Styles.alignments.horizontalCenter]}>
                        <Text style={{fontSize: 22, fontFamily: "nunito-bold", color: "#444"}}>3. Select Shop Categories</Text>
                    </View>
                    <View style={[LocalStyles.catContainer ,Styles.spacings.mTopSmall]}>
                        { selectedCategories }
                    </View>
                    <View style={[Styles.spacings.mTopSmall]}>
                        <Input
                            textStyle={[LocalStyles.inputText, Styles.typograhy.strong]}
                            placeholder="Search..."
                            onChangeText={value => this.searchCategory(value)}
                            //value={this.props.data.name}
                        />
                    </View>
                    <View style={[Styles.spacings.mTopSmall]}>
                        {
                            this.state.showLoader ?
                            <View style={Styles.spacings.mTopMedium}>
                                <View style={LocalStyles.spinnerContainer}><Spinner status="giant" status="danger"/></View>
                            </View> :
                            <View style={LocalStyles.pillContainer}>{categoryPills}</View>
                        }
                    </View>
                </View>
            </React.Fragment>
        )
    }
}
class ProfilePictureSelector extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
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
        this.props.uplodaPictureAndSave(this.state.image.uri);
    }

    render() {
        return (
            <React.Fragment>
                <View>
                    <View style={[Styles.alignments.horizontalCenter]}>
                        <Text style={{fontSize: 22, fontFamily: "nunito-bold", color: "#444"}}>4. Add Photo to your Business</Text>
                    </View>
                </View>
                <Grid style={[LocalStyles.container, Styles.spacings.mTopSmall]}>
                        <Row style={[Styles.spacings.mTopSmall]}>
                            <PhotoUpload buttonTitle="SAVE AND CONTINUE" notFirstTime={true} skipLink={() => {this.props.navigation.navigate("Welcome")}} saveDisplayPicture={() => this.saveDisplayPicture()} uri={this.state.image.uri} setProfileImage={image => this.setProfileImage(image)}/>
                        </Row>
                        <Row style={[Styles.strong, Styles.spacings.mTopXSmall, Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]}>
                            <TouchableOpacity onPress={() => this.props.previous()}>
                                <Text style={LocalStyles.goBackLink}>
                                « Go Back
                                </Text>
                            </TouchableOpacity>
                        </Row>
                </Grid>
            </React.Fragment>
        )
    }
}
class SavingShop extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
        }
    }

    render() {
        return (
            <React.Fragment>
                <View>
                    <View style={[Styles.alignments.horizontalCenter]}>
                        <Text style={{fontSize: 22, fontFamily: "nunito-bold", color: "#444"}}>Setting up your Business</Text>
                    </View>
                </View>
                <Grid style={[LocalStyles.container, Styles.spacings.mTopSmall]}>
                        <Row style={[Styles.strong, Styles.spacings.mTopXSmall, Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]}>
                            <Spinner status="danger" size="giant" />
                        </Row>
                </Grid>
            </React.Fragment>
        )
    }
}
class ShopCreated extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
        }
    }

    navigateToNewAccount = () => {
        this.props.navigateToNewAccount()
    }

    render() {
        const { data } = this.props;
        return (
            <React.Fragment>
                <View>
                    <View style={[Styles.alignments.horizontalCenter]}>
                        <View>
                            <Icon name="checkmark-circle-outline" fill="#27ca00" style={{width: 30, height: 30}}/>
                        </View>
                    </View>
                    <View style={[Styles.alignments.horizontalCenter]}>    
                        <View style={[Styles.spacings.mLeftSmall]}><Text style={{fontSize: 22, fontFamily: "nunito-bold", color: "#444"}}>New Account created</Text></View>
                    </View>
                </View>
                <View>
                <Grid style={[LocalStyles.container]}>
                    <Row style={[Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]}>
                        <View style={LocalStyles.imageCover}>
                            <Image style={{width: 128, height: 128}} source={getProfilePictureShop(data.imageID)} />
                        </View>
                    </Row>
                    <Row style={[Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]}>
                        <Text style={[Styles.typograhy.strong, {fontSize: 25}]}>{data.name}</Text>
                    </Row>
                    <Row style={[Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]}>
                        <Button onPress={() => this.navigateToNewAccount()} accessoryRight={RightIcon} size="giant" status="danger">Go to your New Account</Button>
                    </Row>
                </Grid>
                </View>
            </React.Fragment>
        )
    }
}

const LocalStyles = StyleSheet.create({
    icon: { width: 22, height: 22, },
    container: { width: "100%", marginLeft: "auto", "marginRight" : "auto"},
    inputText: {fontSize: 20, width: "94%"},
  radioText: { fontSize: 16 },
  radio: { margin: 12 },
  ored: {
    width: "100%",
    textAlign: "center",
    fontFamily: "nunito-bold",
    fontSize: 19,
    minHeight: 100,
    backgroundColor: "#efefef",
    padding: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#dadce0"
  },
  goBackLink: {
      fontFamily: "nunito",
      fontSize: 16,
      borderBottomColor: "#333",
      borderBottomWidth: 1,
  },
  spinnerContainer: {
      width: "100%",
      minHeight: 40,
      justifyContent: "center",
      alignItems: "center"
    },
    note: {
        fontFamily: "nunito",
        fontSize: 15,
        textAlign: "center"
    },
    pills: {
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "white",
        borderBottomColor: "#efefef",
        borderBottomWidth: 1,
        justifyContent: "center",
        width: "100%",
        paddingLeft: 15,
    },
    pillText: {
        fontFamily: "nunito-bold",
        fontSize: 16,
        color: "#444",
        width: "100%"
    },
    pillContainer: {
        borderWidth: 1,
        borderColor: "#efefef",
        width: "100%",
        backgroundColor: "#fff",
    },
    selectedCatText: {
        borderWidth: 1,
        borderColor: "#ececec",
        padding: 10,
        fontFamily: "nunito-bold",
        borderBottomColor: '#09F',
        borderBottomWidth: 2,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "white",
        width: "100%"
    },
    catContainer: {
        flexWrap: "wrap",
        flexDirection: "column"
    },
    innerTextStyle: {
        backgroundColor: "white",
        fontFamily: "nunito-bold",
        fontSize: 16,
        minHeight: 100,
        textAlignVertical : 'top'
    },
    imageCover: {
        width: 150,
        height: 150,
        backgroundColor: "#FFF",
        padding: 10,
        borderWidth: 1,
        borderColor: "#efefef",
        borderRadius: 4
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
      
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateShop);


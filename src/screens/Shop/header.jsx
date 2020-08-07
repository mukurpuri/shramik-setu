import React from 'react';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, Image } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Col, Row, Grid } from "react-native-easy-grid";
import { getProfilePictureShop, getProfilePicture } from '../../utilities/helpers';
import { MessageIcon, AddCircular, UserIcon } from '../../component/Icons';
import * as Linking from 'expo-linking';

import Styles from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabActive: 0,
            addReview: true,
            data: props.data,
            reviewMessage: "",
            stars: 0
        }
    }

    setReviewMessage = reviewMessage => {
        this.setState({
            reviewMessage
        })
    }

    setTab = type => {
        console.log(type);         
        this.setState({
            tabActive: type
        })
    }
    
    openMap = (lat, long) => {
        let url = `http://maps.google.com/maps?z=12&t=m&q=loc:38.9419+-78.3020`
        Linking.openURL(url);
    }

    call = phone => {
        let url = `tel:${phone}`;
        Linking.openURL(url);
    }

    toggleReviewAdd = () => {
        this.setState({
            addReview: !this.state.addReview
        })
    }

    addStar = stars => {
        this.setState({
            stars
        })
    }

    openConsole = () => {
        this.props.navigation.navigate("Console");
    }

    render() {
        //let currentLanguage = this.props.settings.language;
        let { editMode } = this.props;
        let { data } = this.state;
        let GoldStars = [];
        let SilverStars = [];
        for(let i = 0; i < this.state.stars; i++) {
            GoldStars.push(
                <TouchableOpacity key={`gold-${i}`} onPress={() => this.addStar(i + 1)}><View><Icon name="star" style={{width: 30, height: 30, marginLeft: (i === 0 ? -2 : 10)}} fill="gold"/></View></TouchableOpacity>
            )
        }
        for(let j = (this.state.stars); j < 5; j++) {
            SilverStars.push(
                <TouchableOpacity key={`silver-${j}`} onPress={() => this.addStar(j + 1)}><View><Icon name="star-outline" style={{width: 30, height: 30, marginLeft: (j === 0 ? -2 : 10)}} fill="#ccc"/></View></TouchableOpacity>
            )
        }

        return (
        <View style={Styles.spacings.mXSmall}>
         <Grid style={LocalStyles.header}>
             <Col size={19}>
                 <View style={LocalStyles.ppBorder}>
                    <Image style={{width: 75, height: 75, borderRadius: 10}} source={getProfilePicture(data.imageID)} />
                 </View>
             </Col>
             <Col size={5}>

             </Col>
             <Col size={70}>
                <View><Text style={LocalStyles.title}>{data.name}</Text></View>
                <View style={{marginTop: 0}}>
                    <Text style={LocalStyles.loc}>{data.range}</Text>
                </View>
                <View style={{marginTop: 3}}>
                    <View style={Styles.alignments.row}>
                        <Icon name="star" style={{width: 20, height: 20}} fill="gold"/>
                        <Icon name="star" style={{width: 20, height: 20}} fill="gold"/>
                        <Icon name="star" style={{width: 20, height: 20}} fill="gold"/>
                        <Icon name="star-outline" style={{width: 20, height: 20}} fill="#ccc"/>
                        <Icon name="star-outline" style={{width: 20, height: 20}} fill="#ccc"/>
                        <View>
                            <Text style={LocalStyles.ratings}>({data.noOfReviews} Ratings)</Text>
                        </View>
                    </View>
                </View>
                {/* {
                    !editMode ? 
                    <View style={{marginTop: 15}}>
                        <Grid>
                            <Col size={35}>
                                <Button onPress={() => this.showOTPPage()} style={[Styles.alignments.full, {backgroundColor: "white", borderColor: "#888"}]}  size='tiny'><Text style={LocalStyles.buttonTextB}>Save</Text></Button>
                            </Col>
                            <Col size={5}></Col>
                            <Col size={60}>
                                <Button onPress={() => this.showOTPPage()} style={[Styles.alignments.full]}  size='tiny' status='danger'>
                                    <Text style={LocalStyles.buttonText}>Connect </Text>
                                </Button>
                            </Col>
                        </Grid>
                    </View> : null
                } */}
             </Col>
         </Grid>
         <View style={Styles.spacings.mTopXSmall}>
            <Grid>
                <Col size={42}>
                    <View style={[Styles.UI.card, Styles.alignments.horizontalCenter, {borderRadius: 8}]}>
                        <Text style={Styles.typograhy.strong}>Save</Text>
                        <Icon name="bookmark-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill="#333"/>
                    </View>
                </Col>
                <Col size={2}>
                </Col>
                <Col size={42}>
                    <TouchableOpacity onPress={() => this.openConsole()} style={[LocalStyles.connect, Styles.alignments.horizontalCenter]}>
                        <Text style={[Styles.typograhy.strong, {color: "white"}]}>Connect</Text>
                        <Icon name="swap-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill="#fff"/>
                    </TouchableOpacity>
                </Col>
            </Grid>
         </View> 
         {/* <View style={Styles.spacings.mTopXSmall}>
            <View style={Styles.UI.card}>
                
            </View>
         </View>  */}
         {/* <View style={Styles.spacings.mTopXSmall}>
             <View>
                 <TouchableOpacity>
                     <Text>
                         Edit Profile
                     </Text>
                 </TouchableOpacity>
             </View>
         </View> */}
         <View>
            <View style={Styles.spacings.mTopXSmall}>
                <Grid>
                    {/* <Col size={10}>
                        <TouchableOpacity onPress={() => this.setTab(0)} style={[LocalStyles.tabButton, this.state.tabActive === 0 ? LocalStyles.active: {}]}>
                            <Text style={Styles.typograhy.strong}>Updates</Text>
                        </TouchableOpacity>
                    </Col> */}
                    <Col size={50}>
                        <TouchableOpacity onPress={() => this.setTab(0)} style={[LocalStyles.tabButton, this.state.tabActive === 0 ? LocalStyles.active: {}]}>
                            <Text style={Styles.typograhy.strong}>About</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col size={50}>
                        <TouchableOpacity onPress={() => this.setTab(1)} style={[LocalStyles.tabButton, this.state.tabActive === 1 ? LocalStyles.active: {}]}>
                            <Text style={Styles.typograhy.strong}>Reviews</Text>
                        </TouchableOpacity>
                    </Col>
                    {/* <Col size={50}>
                        <TouchableOpacity onPress={() => this.setTab(2)} style={[LocalStyles.tabButton, this.state.tabActive === 2 ? LocalStyles.active: {}]}>
                            <Text style={Styles.typograhy.strong}>Contact</Text>
                        </TouchableOpacity>
                    </Col> */}
                    
                </Grid>
                <View style={LocalStyles.tabContainer}>
                    {
                        this.state.tabActive === 0 ?
                        <View style={[LocalStyles.tabContent, {paddingLeft: 0, paddingRight: 0}]}>
                            {/* <View style={LocalStyles.update}>
                                <View><Text style={[Styles.typograhy.strong, {fontSize: 15}]}>
                                 60% off on all Orders above shopping of Rs. 2000
                                </Text>
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text style={[LocalStyles.dim, {fontSize: 12, fontFamily: "nunito"}]}>
                                        23rd September 2020
                                    </Text>
                                </View>
                            </View> */}
                            <View style={{paddingLeft: 20, paddingRight: 20}}>
                                <Text style={[Styles.typograhy.nunito, {fontSize: 17}]}>Departmental Store, we sell all kinds of groceeries and other houshole ditems</Text>
                                <View style={Styles.spacings.mTopSmall}>
                                    <View><Text style={Styles.typograhy.strong}>Address</Text></View>
                                    <View><Text style={[Styles.typograhy.nunito, LocalStyles.dim]}>Gurunanak Pura, Bees Dukan, Adarsh Nagar, Jaipur, Rajasthan 302004</Text></View>
                                </View>
                                <View style={Styles.spacings.mTosSmall}>
                                    <View style={{width: 150}}>
                                        <TouchableOpacity onPress={()=>this.openMap()} style={[Styles.alignments.row]}>
                                            <Text style={[Styles.typograhy.nunito, LocalStyles.direction]}>Get Directions</Text>
                                            <Icon name="corner-up-right-outline" style={{width: 20, height: 20, marginLeft: 6, marginTop: 3}} fill="#09F"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={Styles.spacings.mTopSmall}>
                                    <View><Text style={Styles.typograhy.strong}>Contacts</Text></View>
                                    <View style={{width: 150}}>
                                        <TouchableOpacity onPress={() => this.call()}><Text style={[Styles.typograhy.nunito, LocalStyles.contact]}>+7042107850</Text></TouchableOpacity>
                                    </View>
                                    <View style={{width: 150}}>
                                        <TouchableOpacity onPress={() => this.call()} ><Text style={[Styles.typograhy.nunito, LocalStyles.contact]}>+7042107850</Text></TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View> : null
                    }

                    {
                        this.state.tabActive === 1 ?
                        <View style={[LocalStyles.tabContent, {paddingLeft: 0, paddingRight: 0, paddingTop: 0}]}>
                            <View style={LocalStyles.update}>
                                {
                                    this.state.addReview ?
                                    <TouchableOpacity onPress={() => this.toggleReviewAdd()} style={[LocalStyles.addRating,Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                                            <Text style={[Styles.typograhy.strong, Styles.typograhy.center]}>Add your Review</Text>
                                        </TouchableOpacity> : 
                                    <View>
                                        <View><Text style={{fontFamily: "nunito-bold", fontSize: 15}}>Rate Stars</Text></View>
                                        <View style={[Styles.alignments.row, Styles.spacings.mBottomXSmall, {marginTop: 5}]}>
                                            { GoldStars }
                                            { SilverStars }
                                        </View>
                                        <View style={Styles.spacings.mTopXSmall}>
                                        <Input
                                                textStyle={[LocalStyles.inputText, Styles.typograhy.strong]}
                                                textStyle={[LocalStyles.innerTextStyle]}
                                                placeholder="Add your Review"
                                                style={LocalStyles.input}
                                                multiline={true}
                                                numberOfLines={7}
                                                value={this.state.reviewMessage}
                                                onChangeText = { text => this.setReviewMessage(text) }
                                            />
                                        </View>
                                        <View style={Styles.spacings.mTopXSmall}>
                                            <Grid>
                                                <Col size={100}>
                                                <TouchableOpacity onPress={() => this.toggleReviewAdd()} style={[LocalStyles.addRating,Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                                                    <Text style={[Styles.typograhy.strong, Styles.typograhy.center]}>Submit</Text>
                                                </TouchableOpacity>
                                                </Col>
                                            </Grid>
                                        </View>
                                    </View>
                                }
                            </View>
                            <View style={LocalStyles.update}>
                                <Grid>
                                    <Col size={15}>
                                        <Image style={{width: 55, height: 55, borderRadius: 5, marginTop: 5}} source={{uri: "https://content3.jdmagicbox.com/comp/jaipur/p8/0141px141.x141.121116165407.x8p8/catalogue/sada-shiv-daal-bhandar-mansarovar-jaipur-general-stores-33k8n.jpg"}} />
                                    </Col>
                                    <Col size={5}>

                                    </Col>
                                    <Col size={80}>
                                    <View><Text style={[Styles.typograhy.strong, {fontSize: 16}]}>Mukur Puri</Text></View>
                                    <View style={[Styles.alignments.row, {marginTop: 5, marginBottom: 5}]}>
                                        <Icon name="star" style={{width: 15, height: 15}} fill="gold"/>
                                        <Icon name="star" style={{width: 15, height: 15}} fill="gold"/>
                                        <Icon name="star" style={{width: 15, height: 15}} fill="gold"/>
                                        <Icon name="star-outline" style={{width: 15, height: 15}} fill="#ccc"/>
                                        <Icon name="star-outline" style={{width: 15, height: 15}} fill="#ccc"/>
                                    </View>
                                    <View><Text style={[Styles.typograhy.nunito, {fontSize: 14}]}>
                                        60% off on all Orders above shopping of Rs. 2000
                                        </Text>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={[LocalStyles.dim, {fontSize: 12, fontFamily: "nunito"}]}>
                                            23rd September 2020
                                        </Text>
                                    </View>
                                    </Col>
                                </Grid>
                            </View>
                        </View> : null
                    }
                    
                </View>
            </View>  
         </View>  
         </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    text: {
      fontSize: 15,
      fontFamily: "nunito",
    },
    tabContent: {
        padding: 20
    },
    buttonText: {
        fontFamily: "nunito-bold",
        fontSize: 15,
        color: "white"
    },
    buttonTextB: {
        fontFamily: "nunito-bold",
        fontSize: 15,
        color: "#333"
    },
    loc: {
        color: "#888",
        fontSize: 14,
        fontFamily:"nunito-bold"
    },
    ppBorder: {
        width: "100%",
        height: 75,
        borderRadius: 10,
        borderColor: "#E91E62",
        overflow: "hidden",
    },
    header: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#efefef"
    },
    title: {
        fontFamily: "nunito-bold",
        fontSize: 19
    },
    subTitle: {
        fontFamily: "nunito",
        fontSize: 14,
        color: "#888"
    },
    ratings: {
        fontSize: 13,
        fontFamily: "nunito-bold",
        marginLeft: 5,
        color: "#666"
    },
    tabButton: {
        padding: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth:0
    },
    active: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#efefef",
        borderTopLeftRadius: 8,
        borderTopRightRadius:8,
    },
    tabContainer: {
        borderWidth: 1,
        borderColor: "#efefef",
        width: "100%",
        minHeight: 350,
        paddingBottom: 30,
        backgroundColor: "white",
        top: -1,
        borderTopWidth: 0
    },
    dim: {
        fontSize: 15,
        color: "#888"
    },
    direction: {
        color: "#09F",
        fontSize: 16,
        fontFamily: "nunito-bold"
    },
    contact: {
        color: "#333",
        borderBottomColor: "#333",
        borderBottomWidth: 1,
        width: 104,
        textAlign: "center",
        marginTop: 10
    },
    update: {
        borderBottomColor: "#efefef",
        borderBottomWidth: 1,
        padding: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    addRating: {
        width: "100%",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "gold",
        backgroundColor: "white",
        padding: 5,
        backgroundColor: "gold"
    },
    connect: {
        backgroundColor: "#E91E62",
        borderColor: "#E91E62",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        height: 42
    },
    innerTextStyle: {
        fontFamily: "nunito-bold",
        textAlignVertical : 'top'
    },
  });
export default Header;

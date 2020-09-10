import React from 'react';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, Image, Alert } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Col, Row, Grid } from "react-native-easy-grid";
import { getProfilePictureShop, getProfilePicture } from '../../utilities/helpers';
import { MessageIcon, AddCircular, UserIcon, CircularCheckIconFull } from '../../component/Icons';
import * as Linking from 'expo-linking';
import _ from 'lodash';
import Styles from '../../styles';
import { AddReviewToShop } from '../../services/api.service';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabActive: props.activeTab,
            addReview: true,
            data: props.data,
            reviewMessage: "",
            reviewSentLoader: false,
            showAccountSettings: false,
            stars: 0,
            flagship: false
        }
    }

    setReviewMessage = reviewMessage => {
        this.setState({
            reviewMessage
        })
    }

    toggleAccountSettings = () => {
        this.setState({
            showAccountSettings: !this.state.showAccountSettings
        });
    }

    refreshPageWithReviews = () => {
        this.props.refreshPageWithReviews();
    }

    setTab = type => {       
        this.setState({
            tabActive: type
        })
    }
    
    openMap = (location) => {
        let url = `http://maps.google.com/maps?z=12&t=m&q=loc:${location.lat}+${location.lng}`
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

    deactivateShop = () => {
        this.props.deactivateShop();
    }

    hideShop = () => {
        this.props.hideShop();
    }

    AddReview = async () => {
        this.setState({
            reviewSentLoader: true
        }, async () => {
            if(this.state.stars && this.props.user.id) {
                let data = {
                    createdBy: this.props.user.id,
                    text: this.state.reviewMessage,
                    stars: this.state.stars,
                    parentId: this.props.shopId,
                  }
                  await AddReviewToShop(data).then( res => {
                    if(res.status === 200) {
                        this.setState({
                            addReview: true,
                            reviewMessage: "",
                            reviewSentLoader: false,
                            stars: 0
                        }
                        ) 
                    }
                    this.refreshPageWithReviews();
                  })
            } else {
                this.setState({
                    reviewSentLoader: false
                }, () => {
                    alert("Cannot add review without ratings");
                })
            }
        })
    }

    deleteShop = () => {
        this.props.deleteShop();
    }

    toggleEnitity = () => {
        if(this.state.data.isSaved) {
            this.props.unsaveEntity()
        } else {
            this.props.saveEntity()
        }
    }

    toggleFlag = () => {
        this.setState({
            flagship: !this.state.flagship
        })
    }

    reportAccount = () => {

    }

    blockAccount = () => {
        this.props.blockAccount();
    }

    navigateMyBanners = () => {
        this.props.navigation.navigate("MyBanners", { shopId: this.props.shopId });
    }

    render() {
        //let currentLanguage = this.props.settings.language;
        let { editMode } = this.props;
        let { data } = this.state;
        let GoldStars = [];
        let SilverStars = [];
        let Contacts = [];
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
        _.each(data.contacts, (contact, index) => {
            Contacts.push(
                <View key={`phone-${contact}-${index}`} style={{width: 150}}>
                    <TouchableOpacity onPress={() => this.call(contact)} ><Text style={[Styles.typograhy.nunito, LocalStyles.contact]}>+{contact}</Text></TouchableOpacity>
                </View>
            )
        });
        let shopStars = [];
        for(let i = 0; i < data.averageStars; i++) {
            shopStars.push(
                <Icon name="star" key={`shop-gold-${i}`} style={{width: 20, height: 20}} fill="gold"/>
            )
        }
        for(let j = (data.averageStars); j < 5; j++) {
            shopStars.push(
                <Icon name="star-outline" key={`shop-silver-${j}`} style={{width: 20, height: 20}} fill="#ccc"/>
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
                <View style={Styles.alignments.row}>
                    <Text style={LocalStyles.title}>{data.name}</Text>
                    {
                        data.isVerified ?
                        <View>
                            <CircularCheckIconFull style={Styles.UI.ShopTick} fill="#09F" />
                        </View> : null
                    }
                </View>
                <View style={{marginTop: 0}}>
                    <Text style={LocalStyles.loc}>{data.range}</Text>
                </View>
                <View style={{marginTop: 3}}>
                    <View style={Styles.alignments.row}>
                        {shopStars}
                        {/* <View>
                            <Text style={LocalStyles.ratings}>({data.noOfReviews} Ratings)</Text>
                        </View> */}
                    </View>
                </View>
             </Col>
         </Grid>
         <View style={Styles.spacings.mTopXSmall}>
            {
                !data.isOwner ? <Grid>
                <Col size={35}>
                    <TouchableOpacity onPress={() => this.toggleEnitity()} style={[Styles.UI.card, Styles.alignments.horizontalCenter, {borderRadius: 8}]}>
                        <Text style={[Styles.typograhy.strong, {color: data.isSaved ? "#09F" : "#000"}]}>{ data.isSaved ? "Saved" : "Add to Save"}</Text>
                        {
                            !data.isSaved ?
                            <Icon name="plus-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill="#000"/>: null
                        }
                        {
                            data.isSaved ?
                            <Icon name="checkmark-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill="#09F"/>: null
                        }
                    </TouchableOpacity>
                </Col>
                <Col size={2}>
                </Col>
                <Col size={35}>
                    <TouchableOpacity onPress={() => this.openConsole()} style={[LocalStyles.connect, Styles.alignments.horizontalCenter]}>
                        <Text style={[Styles.typograhy.strong, {color: "white"}]}>Message</Text>
                        <Icon name="message-circle-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill="#fff"/>
                    </TouchableOpacity>
                </Col>
            </Grid> : 
            <Grid>
                <Col size={32}>
                    <TouchableOpacity onPress={() => this.toggleAccountSettings()} style={[Styles.UI.card, Styles.alignments.horizontalCenter, {borderRadius: 8}]}>
                        <Text style={[Styles.typograhy.strong]}>Settings</Text>
                        <Icon name="settings-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill={"#000"}/>
                    </TouchableOpacity>
                </Col>
                <Col size={1}>
                </Col>
                {/* <Col size={32}>
                    <TouchableOpacity style={[Styles.UI.card, Styles.alignments.horizontalCenter, {borderRadius: 8}]}>
                        <Text style={[Styles.typograhy.strong]}>Edit Info</Text>
                        <Icon name="edit-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill={"#000"}/>
                    </TouchableOpacity>
                </Col> */}
                <Col size={32}>
                    <TouchableOpacity style={[Styles.UI.card, Styles.alignments.horizontalCenter, {borderRadius: 8}]}>
                        <View style={LocalStyles.shopNotification}>
                            <Text style={LocalStyles.shopNotificationText}>33</Text>
                        </View>
                        <Text style={[Styles.typograhy.strong]}>Messages</Text>
                        <Icon name="message-circle-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill={"#000"}/>
                    </TouchableOpacity>
                </Col>
            </Grid>
            }
            
         </View>



         { 
             data.isOwner ? 
             <Grid style={Styles.spacings.mTopXSmall}>
                 <Col size={50}>
                    <TouchableOpacity onPress={() => this.navigateMyBanners()} style={[Styles.UI.card, Styles.alignments.horizontalCenter, {borderRadius: 8}]}>
                        <Text style={[Styles.typograhy.strong]}>My Banners</Text>
                        <Icon name="loader-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill={"#000"}/>
                    </TouchableOpacity>
                 </Col>
                 <Col size={2}></Col>
                 <Col size={50}>
                    <TouchableOpacity onPress={() => this.toggleAccountSettings()} style={[Styles.UI.card, Styles.alignments.horizontalCenter, {borderRadius: 8}]}>
                            <Text style={[Styles.typograhy.strong]}>My Updates</Text>
                            <Icon name="color-palette-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill={"#000"}/>
                        </TouchableOpacity>
                    </Col>
             </Grid> 
            : null
         }
         

         {
            !data.isOwner && this.state.flagship ?
                <View style={Styles.spacings.mTopXSmall}>
                        <View style={[Styles.UI.card, {borderRadius: 10, position: "relative"}]}>
                            <View style={{ flexDirection: "row" ,justifyContent: "space-between"}}>
                                <View><Text style={[Styles.typograhy.strong, {fontSize: 19}]}>Flag Account</Text></View>
                                <TouchableOpacity onPress={() => this.toggleFlag()} style={LocalStyles.closeButton}>
                                    <View>
                                        <Icon name="close" style={{width: 25, height: 25}} fill="#000"/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* <TouchableOpacity onPress={this.reportAccount} style={{borderTopWidth: 1, borderTopColor: "#efefef", marginTop: 10}}>
                                <View style={{marginTop: 10, flexDirection: "row"}}>
                                    <View>
                                        <Text style={Styles.typograhy.strong}>Report this Account</Text>
                                    </View>
                                </View>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => this.blockAccount()} style={{paddingBottom: 15,borderBottomWidth: 1, borderBottomColor: "#efefef", borderTopWidth: 1, borderTopColor: "#efefef", marginTop: 10}}>
                                <View style={{marginTop: 10, flexDirection: "row"}}>
                                    <View>
                                        <Text style={Styles.typograhy.strong}>Block this Account</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                </View>
             : <Text></Text>
         }

         { 
             data.isOwner ?
             <View>
             {
                 this.state.showAccountSettings ? 
                 <View style={Styles.spacings.mTopXSmall}>
                    <View style={[Styles.UI.card, {borderRadius: 10, minHeight: 400, position: "relative"}]}>
                    <View style={{ flexDirection: "row" ,justifyContent: "space-between"}}>
                        <View><Text style={[Styles.typograhy.strong, {fontSize: 19}]}>Account Settings</Text></View>
                        <TouchableOpacity onPress={() => this.toggleAccountSettings()} style={LocalStyles.closeButton}>
                            <View>
                                <Icon name="close" style={{width: 25, height: 25}} fill="#000"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor: "#efefef", marginTop: 10}}>
                        <View style={{marginTop: 10}}>
                        <View>
                            {
                                !data.hide ? 
                                <Text style={Styles.typograhy.nunito}>
                                    Make your account <Text style={Styles.typograhy.strong}>{data.name}</Text> unavailable to Users on Setu. Users can still see and save your account but will not be available to message you on Setu.
                                </Text> : <Text  style={Styles.typograhy.nunito}>You have Hide <Text style={Styles.typograhy.strong}>{data.name}</Text></Text>
                            }
                        </View>
                        <View  style={{marginTop: 10}}>
                            <TouchableOpacity onPress={ () => this.hideShop()} style={[Styles.UI.card, Styles.alignments.horizontalCenter, {borderRadius: 8, backgroundColor: "#02BCD4", borderWidth: 0}]}>
                                <Text style={[Styles.typograhy.strong, {color: "#FFF"}]}>{ data.hide ? "Make your Account Available" : "Make your Account Unavailable"}</Text>
                                <Icon name="eye-off-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill="#FFF"/>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor: "#efefef", marginTop: 15}}>
                        <View style={{marginTop: 10}}>
                        <View>
                            {
                                !data.deactivate ?
                                <Text style={Styles.typograhy.nunito}>
                                    Deactivating your account <Text style={Styles.typograhy.strong}>{data.name}</Text> will restrict other users from searching and getting connected with you on Setu. Deactivating your account will also delete your account from the list of Saved Profile by Users of Setu. You can reactivate the account later here.
                                </Text> : <Text  style={Styles.typograhy.nunito}>You have Deactivate <Text style={Styles.typograhy.strong}>{data.name}</Text></Text>
                            }
                        </View>
                        <View  style={{marginTop: 10}}>
                            <TouchableOpacity onPress={ () => this.deactivateShop() } style={[Styles.UI.card, Styles.alignments.horizontalCenter, {borderRadius: 8, backgroundColor: "#FF9800", borderWidth: 0}]}>
                                <Text style={[Styles.typograhy.strong, {color: "#FFF"}]}>{ data.deactivate ? "Reactivate" : "Deactivate"} your Account</Text>
                                <Icon name="alert-triangle-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill="#FFF"/>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                    <View style={{borderTopWidth: 1, borderTopColor: "#efefef", marginTop: 15}}>
                        <View style={{marginTop: 10}}>
                        <View>
                            <Text style={Styles.typograhy.nunito}>
                                Deleting your account <Text style={Styles.typograhy.strong}>{data.name}</Text> completely from Setu. <Text style={Styles.typograhy.strong}>You cannot recover a deactivated account</Text>.
                            </Text>
                        </View>
                        <View  style={{marginTop: 10}}>
                            <TouchableOpacity onPress={() => this.deleteShop()} style={[Styles.UI.card, Styles.alignments.horizontalCenter, {borderRadius: 8, backgroundColor: "#E91E62", borderWidth: 0}]}>
                                <Text style={[Styles.typograhy.strong, {color: "#FFF"}]}>Delete your Account</Text>
                                <Icon name="trash-2-outline" style={{width: 18, height: 18, marginTop: 3, marginLeft: 10}} fill="#FFF"/>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </View>
                </View> : null
             }
             
             </View> : null
         }
         <View>
            <View style={Styles.spacings.mTopXSmall}>
                <Grid>
                    <Col size={50}>
                        <TouchableOpacity onPress={() => this.setTab(0)} style={[LocalStyles.tabButton, this.state.tabActive === 0 ? LocalStyles.active: {}]}>
                            <Text style={Styles.typograhy.strong}>About</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col size={50}>
                        <TouchableOpacity onPress={() => this.setTab(1)} style={[LocalStyles.tabButton, this.state.tabActive === 1 ? LocalStyles.active: {}]}>
                            <Text style={Styles.typograhy.strong}>Reviews ({data.noOfReviews})</Text>
                        </TouchableOpacity>
                    </Col>
                </Grid>
                <View style={LocalStyles.tabContainer}>
                    {
                        this.state.tabActive === 0 ?
                        <View style={[LocalStyles.tabContent, {paddingLeft: 0, paddingRight: 0}]}>
                            <View style={{paddingLeft: 20, paddingRight: 20}}>
                                <View><Text style={Styles.typograhy.strong}>About</Text></View>
                                {
                                    data.about ? <Text style={[Styles.typograhy.nunito, {fontSize: 17}]}>{data.about}</Text> : <Text style={[Styles.typograhy.nunito,Styles.spacings.mTopXSmall, {color: "#ccc", fontSize: 13}]}>Not Available</Text>
                                }
                                <View style={Styles.spacings.mTopSmall}>
                                    <View><Text style={Styles.typograhy.strong}>Address</Text></View>
                                    <View><Text style={[Styles.typograhy.nunito, LocalStyles.dim, {marginTop: 10}]}>{data.address}</Text></View>
                                </View>
                                <View style={Styles.spacings.mTosSmall}>
                                    <View style={{width: 150}}>
                                        <TouchableOpacity onPress={()=>this.openMap(data.location)} style={[Styles.alignments.row]}>
                                            <Text style={[Styles.typograhy.nunito, LocalStyles.direction]}>Get Directions</Text>
                                            <Icon name="corner-up-right-outline" style={{width: 20, height: 20, marginLeft: 6, marginTop: 3}} fill="#09F"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={Styles.spacings.mTopSmall}>
                                    <View><Text style={Styles.typograhy.strong}>Contacts</Text></View>
                                    {
                                        Contacts.length > 0 ? Contacts : <Text style={[Styles.typograhy.nunito,Styles.spacings.mTopXSmall, {color: "#ccc", fontSize: 13}]}>Not Available</Text>
                                    }
                                </View>
                            </View>
                        </View> : null
                    }

                    {
                        this.state.tabActive === 1 ?
                        <View style={[LocalStyles.tabContent, {paddingLeft: 0, paddingRight: 0, paddingTop: 0}]}>
                            {
                                !data.isOwner ? 
                                (<View style={LocalStyles.update}>
                                {
                                    this.state.addReview ?
                                    <TouchableOpacity onPress={() => this.toggleReviewAdd()} style={[LocalStyles.addRating,Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                                            <Text style={[Styles.typograhy.strong, Styles.typograhy.center]}>Add your Review</Text>
                                        </TouchableOpacity> : 
                                    <View>
                                        {
                                            this.state.reviewSentLoader ? 
                                            <View style={{minHeight: 100, justifyContent: "center", alignItems: "center"}}>
                                                <Spinner size="medium" status="danger"/>
                                            </View> :
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
                                                        <TouchableOpacity onPress={() => this.AddReview()} style={[LocalStyles.addRating,Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                                                            <Text style={[Styles.typograhy.strong, Styles.typograhy.center]}>Submit</Text>
                                                        </TouchableOpacity>
                                                        </Col>
                                                    </Grid>
                                                </View>
                                            </View>
                                        }
                                    </View>
                                }
                            </View>) : null
                            }
                            <UserReviews reviews={data.reviews}/>                          
                        </View> : null
                    }
                </View>
            </View>  
         </View>  
         </View>
        );   
    }
}
class UserReviews extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let reviews = [];
        _.each(this.props.reviews, review => {
            let shopStars = [];
            for(let i = 0; i < review.stars; i++) {
                shopStars.push(
                    <Icon name="star" key={`shop-gold-${i}`} style={{width: 20, height: 20}} fill="gold"/>
                )
            }
            for(let j = (review.stars); j < 5; j++) {
                shopStars.push(
                    <Icon name="star-outline" key={`shop-silver-${j}`} style={{width: 20, height: 20}} fill="#ccc"/>
                )
            }
            reviews.push(
                <View key={`user-review-${review.id}`} style={LocalStyles.update}>
                    <Grid>
                        <Col size={15}>
                            <Image style={{width: 55, height: 55, borderRadius: 5, marginTop: 5}} source={getProfilePicture(review.user.imageID)} />
                        </Col>
                        <Col size={5}>

                        </Col>
                        <Col size={80}>
                        <View><Text style={[Styles.typograhy.strong, {fontSize: 16}]}>{review.user.name}</Text></View>
                        <View style={[Styles.alignments.row, {marginTop: 5, marginBottom: 5}]}>
                            {shopStars}
                        </View>
                        <View><Text style={[Styles.typograhy.nunito, {fontSize: 14}]}>
                            {review.text}
                            </Text>
                        </View>
                        <View style={{marginTop: 5}}>
                            <Text style={[LocalStyles.dim, {fontSize: 12, fontFamily: "nunito"}]}>
                                {review.createdAt}
                            </Text>
                        </View>
                        </Col>
                    </Grid>
                </View>
            )
        });
        return (
            <View>
                {
                    reviews.length > 0 ? reviews : 
                        <View style={{width: "100%", height: 100, justifyContent: "center", alignItems: "center"}}>
                            <Text style={[Styles.typograhy.nunito, {color: "#777"}]}>No reviews yet</Text>
                        </View>
                }
            </View>
        )
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
    closeButton: {
        marginRight: 10,
        top: 3
    },
    shopNotification: {
      backgroundColor: "red",
      width: 17,
      height: 17,
      borderRadius: 100,
      position: "absolute",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      right: 35,
      top: 3,
      zIndex: 1
    },
    shopNotificationText: {
      color: "white",
      fontSize: 10,
      fontFamily: "nunito-bold",
    }
  });
export default Header;

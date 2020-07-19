import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet,  Image, TouchableOpacity } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Divider, Spinner, Icon, Card, CheckBox } from '@ui-kitten/components';
import _, { map } from 'lodash';
import  Wrapper from '../../../component/Wrapper';
import Language from '../../../config/languages/Language';
import { RightIcon, AwardIcon, UserIcon, CircularCheckIconFull } from '../../../component/Icons';
import Styles from '../../../styles';
import HeaderUser from '../../../component/HeaderUser';
import { SubmitQuestion } from '../../../services/api.service';
import QaStyles from '../../../styles/QaStyles';
import FootbarAction from '../../../component/FootbarAction';

class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
        questionId: 11,
        spinner: false,
        data: {
            title: "",
            area: "",
            agree: true,
            category: []
        },
        questionCategories: ["Health", "Education", "Food", "Travel", "Transport", "Social", "Places", "People", "Bussiness", "Government", "Search", "Market", "Shopping", "Sports" ]
      }
  }

  getLineNumber = threshhold => {
      let textLength = this.state.data.title.length;
      for(var i = 0; i < 100; i++) {
        if(textLength > i && textLength < threshhold*(i+1)) {
            return i+1
        }    
      }
  }

  setData = (val, type) => {
    let { data } = this.state;  
    switch(type) {
        case "title":
        data.title = val;
        break;

        case "agree":
        data.agree = val;
        break;

        case "area":
        data.area = val;
        break;
    }
    this.setState({data});
  }

  submitQueston = () => {
      let { title, area, agree, category } = this.state.data;
      if(!title || title.length === 0) {
          alert("Please enter a valid question title");
          return false;
      }
      if(!agree) {
        alert("You need to agree to our question policy");
        return false;
      }
      if(category.length === 0) {
        alert("You need to select atleas one question category");
        return false;
      }
      this.saveQuestion();
    }

  saveQuestion =  () => {
      this.setState({
          spinner: true
      }, async () => {
        let question = {
            title: this.state.data.title,
            category: this.state.data.category,
            area:this.state.data.area,
            userId: this.props.user.id,
            agree: this.state.data.agree
        }
        await SubmitQuestion(question).then( async res => {
            if(res && res.data && res.data.status === 200) {
                let questionId = res.data.content.questionId;
                this.setState({
                    data: {
                        title: "",
                        area: "",
                        agree: true,
                        category: []
                    },
                    spinner: false
                }, () => {
                    this.props.navigation.navigate('QA', {
                        id: questionId,
                        question: question.title,
                        asker: {
                            name: this.props.user.name,
                            id: this.props.user.id,
                            imageID: this.props.user.imageID
                        }
                    });
                })
            }
        });
      })
  }

  selectCurrentPill = name => {
      let { data } = this.state;
      if(data.category.indexOf(name) >= 0) {
          _.remove(data.category, function(n) {
            return n === name;
          });
      } else {
        data.category.push(name);
      }
      this.setState({data});
  }

  navigate = () => {
      let link = this.props.route && this.props.route.params ? this.props.route.params.linker : "Dashboard";
      this.props.navigation.navigate(link);
  }

  render() {
      let currentLanguage = this.props.settings.language;
      const { user } = this.props;
      let categoryPills = [];
      _.each(this.state.questionCategories, (category, index) => {
          categoryPills.push(
            <TouchableOpacity key={`category-pill-${index}`} onPress={() => this.selectCurrentPill(category)}>
                <View  style={[LocalStyles.pills, this.state.data.category.indexOf(category) >= 0 ? LocalStyles.pillActive : {} ]}>
                    <Text style={Styles.alignments.textCenter}>
                        <Text style={[Styles.typograhy.nunito, this.state.data.category.indexOf(category) >= 0 ? LocalStyles.whiteText : {}]}>{category}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
          )
      })
      return (
        <View style={{flex: 1}}>
        <Wrapper bg="#f5f5f5">
          <HeaderUser
            leftIconCall = { () => this.navigate()}
            showBack={true}
            hideHam={true}
            showMenu={false}
            title="Ask Question" 
            navigation={this.props.navigation}/>
            <Grid style={{paddingLeft: 15, paddingRight: 15}}>
                    <Row style={[Styles.spacings.mTopXSmall]}>
                        <View style={Styles.alignments.full,Styles.alignments.column}>
                            <View>
                                <Text
                                    style={[Styles.typograhy.label, Styles.spacings.mTopSmall]}
                                >Title</Text>
                            </View>
                            <View>
                            <Input
                                multiline = {true}
                                numberOfLines = {this.getLineNumber(40)}
                                textStyle={[LocalStyles.innerTextStyle]}
                                inputStyle={[LocalStyles.innerIputText]}
                                onChangeText={(val) => this.setData(val, "title")}
                                style={[LocalStyles.iputText]}
                                value={this.state.data.title}
                                placeholder="What do you want to ask ?"
                            />
                            </View>
                        </View>
                    </Row>
                    <Row>
                        <View style={Styles.alignments.full,Styles.alignments.column}>
                            <View>
                                <Text
                                    style={[Styles.typograhy.label, Styles.spacings.mTopSmall]}
                                >Question Category</Text>
                            </View>
                            <View style={LocalStyles.pillContainer}>
                            {
                                categoryPills
                            }
                            </View>
                        </View>
                    </Row>
                    <Row style={[Styles.spacings.mTopXSmall]}>
                        <View style={Styles.alignments.full,Styles.alignments.column}>
                            <View>
                                <Text
                                    style={[Styles.typograhy.label, Styles.spacings.mTopSmall]}
                                >Add your Locality or Area</Text>
                            </View>
                            <View>
                            <Input
                                textStyle={[LocalStyles.innerTextStyle]}
                                inputStyle={[LocalStyles.innerIputText]}
                                onChangeText={(val) => this.setData(val, "area")}
                                style={[LocalStyles.iputText]}
                                value={this.state.data.area}
                                placeholder="Sodala, Johari Bazar etc."
                            />
                            </View>
                        </View>
                    </Row>
                    <Row style={LocalStyles.divider}>
                    </Row>
                    <Row style={[Styles.spacings.mTopXSmall]}>
                        <Text style={LocalStyles.notes}>Ask a constructive question.
                        Avoid asking communal and violent question which can hurt sentiments of others. Setu has full right to delete or remove questions reported by others.</Text>
                    </Row>
                    <Row style={[Styles.spacings.mTopXSmall]}>
                    <CheckBox
                        checked={this.state.data.agree}
                        onChange={nextChecked => this.setData(nextChecked, "agree")}>
                        I agree to these conditions
                        </CheckBox>
                    </Row>
                    <Row style={[Styles.alignments.row, Styles.spacings.mTopMedium,  Styles.alignments.horizontalCenter]} >
                    {
                      !this.state.spinner ? 
                        <Button onPress={() => this.submitQueston()} style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='danger'>
                          Submit Question
                        </Button> : <Spinner size="large" status="danger"/>
                    }
                  </Row>
            </Grid>
        </Wrapper>
        {/* <FootbarAction navigation={this.props.navigation} active="forum"/> */}
        </View>
      );   
  }
}

const LocalStyles = StyleSheet.create({
    innerTextStyle: {
        backgroundColor: "white",
        fontFamily: "nunito-bold",
        justifyContent: "center"
    },
    pillContainer: {
        marginTop: 5,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    radioText: { fontSize: 16 },
    iputText: {
        backgroundColor: "white",
        marginTop: 5
    },
    radio: { margin: 12 },
    image: {
      width: 100, height: 100
    },
    pills: {
        minWidth: 80,
        backgroundColor: "white",
        borderRadius: 50,
        height: 30,
        padding: 5,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ececec",
        marginRight: 5,
        marginTop: 10,
        paddingLeft:  10,
        paddingRight: 10
    },
    pillActive: {
        backgroundColor: "#09F",
        borderColor: "#09F",
    },
    button: {
        fontFamily: "nunito-bold"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#e6e5e5",
        marginTop: 20
    },
    whiteText: {
        color:"white"
    },
    notes: {
        fontFamily: "nunito",
        fontSize: 12
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
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);


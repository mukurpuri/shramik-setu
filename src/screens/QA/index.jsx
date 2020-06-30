import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet,  Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Divider, Spinner, Icon, Card } from '@ui-kitten/components';
import _ from 'lodash';
import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, AwardIcon, UserIcon, CircularCheckIconFull } from '../../component/Icons';
import Styles from '../../styles';
import HeaderUser from '../../component/HeaderUser';
import { LaughEmoji64,PrayEmoji64 } from '../../config/Images';
import QaStyles from '../../styles/QaStyles';
class QA extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
        myProfileData: null,
        spinner: false,
      }
  }

  render() {
      let currentLanguage = this.props.settings.language;
      const { user } = this.props;
      let questionsData = [
        {
            askded: "",
            question: "Why are COVID Cases spiking in Jaipur from last 2 weaks?",
            primaryAnswer: "Two reasons mainly - Cancelling ban on Lockdown and more testing conducting",
            asker: {
                name: "Mukur",
                dp: "http://192.168.1.102:8080/uploads/avatars/responsive/boy.png"
            },
            answers: 4
        },
        {
            askded: "",
            question: "When are Malls and Resturants going to open in Jaipur?",
            primaryAnswer: "Government is trying to make it happend in 22nd September 2020",
            asker: {
                name: "Ramesh",
                dp: "http://192.168.1.102:8080/uploads/avatars/responsive/boy.png"
            },
            answers: 6
        },
        {
            askded: "",
            primaryAnswer: "",
            question: "Is it safe to go for a Jog in Central Park in this month?",
            asker: {
                name: "Nirbhay",
                dp: "http://192.168.1.102:8080/uploads/avatars/responsive/boy.png"
            },
            answers: 1
        },
        {
            askded: "",
            primaryAnswer: "",
            question: "Why is MI Road one way loan from 5 Batti to Ajmeri Gate",
            asker: {
                name: "Vibhashit",
                dp: "http://192.168.1.102:8080/uploads/avatars/responsive/boy.png"
            },
            answers: 1
        },
        {
            askded: "",
            primaryAnswer: "",
            question: "Where are the COVID testing centers in Jaipur",
            asker: {
                name: "Ajay",
                dp: "http://192.168.1.102:8080/uploads/avatars/responsive/boy.png"
            },
            answers: 1
        }
    ];
        let questions = [];
        _.each(questionsData, (question,index) => {
            questions.push(
                <Row key={`${index}-question-list`} style={Styles.spacings.mTopXSmall}>
                    <Col size={100}>
                        <View style={QaStyles.questionContainer}>
                            <View style={Styles.spacings.mLeftXSmall,Styles.spacings.mTopXSmall}>
                                <Grid style={Styles.spacings.mLeftXSmall}>
                                    <Col size={13}>
                                        <Image source={{uri: question.asker.dp}} style={QaStyles.questionerDP} />
                                    </Col>
                                    <Col size={85}>
                                        <Grid style={Styles.spacings.mLeftXSmall}>
                                            <Row>
                                                <Grid>
                                                <Row><Text style={Styles.typograhy.strong}>{question.asker.name}</Text></Row>
                                                <Row><Text style={Styles.typograhy.dimText}>Answered yesterday</Text></Row>
                                                </Grid>
                                            </Row>
                                        </Grid>
                                    </Col>
                                </Grid>
                            </View>
                            <View style={Styles.spacings.mXSmall}><Text style={Styles.typograhy.strong}>{question.question}</Text></View>
                                <View style={QaStyles.primaryAnswerContainer}><Text style={QaStyles.primaryAnswer}>{question.primaryAnswer}</Text>
                                <View style={QaStyles.readMore}>
                                    <Text style={QaStyles.readMoreText}>More..</Text>
                                </View>
                                </View>
                                <Divider/>
                            <View style={Styles.spacings.mXSmall}>
                            <Grid>
                                <Col size={30}>
                                    <Text style={QaStyles.questionAnswer}>{question.answers} Answers</Text>
                                </Col>
                                <Col size={10}>
                                    
                                </Col>
                                <Col style={QaStyles.actionBorder} size={12}>
                                    <Image style={QaStyles.action} source={{uri: PrayEmoji64}}/><Text style={QaStyles.actionText}>34</Text>
                                </Col>
                                <Col style={QaStyles.actionBorder} size={12}>
                                    <Image style={QaStyles.action} source={{uri: LaughEmoji64}}/><Text style={QaStyles.actionText}>11</Text>
                                </Col>
                            </Grid>
                            </View>
                        </View>
                    </Col>
                </Row>
            )
        });
      return (
        <Wrapper bg="#f5f5f5">
          <HeaderUser showBack={true} hideHam={true} title="Discussions" subTitle="QA" navigation={this.props.navigation}/>
          <Grid style={LocalStyles.qa}>
              <Row>
                <View>
                    <View>
                        <Text style={Styles.typograhy.strong} category="h5">
                            Where are the COVID testing centers in Jaipur?
                        </Text>
                    </View>
                </View>
              </Row>
          </Grid>
          <Grid style={LocalStyles.qa}>
              <Row>
                <View>
                    <View>
                        <View>
                            <Text style={[Styles.alignments.mTopXSmall, Styles.typograhy.nunito]}>Asked by <Text style={Styles.typograhy.linkText}>Mukur Puri</Text> </Text>
                        </View>
                    </View>
                </View>
              </Row>
          </Grid>
          <Grid style={LocalStyles.qa}>
              {questions}
          </Grid>
        </Wrapper>
      );   
  }
}


const LocalStyles = StyleSheet.create({
  qa: {
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 15
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
  
export default connect(mapStateToProps, mapDispatchToProps)(QA);


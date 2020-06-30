import React from 'react';
import _ from 'lodash';
import {View, StyleSheet} from 'react-native';
import { SafeAreaView, Image } from 'react-native';
import { Text , Icon, Divider} from '@ui-kitten/components';
import { Card } from '../../../component/customComponents'
import { Col, Row, Grid } from "react-native-easy-grid";
import Styles from '../../../styles';
import QaStyles from '../../../styles/QaStyles';
import { LaughEmoji64,PrayEmoji64 } from '../../../config/Images';
const ArrowUpIcon = (props) => (
    <Icon {...props} name='arrow-upward-outline'/>
);
const ArrowDownIcon = (props) => (
    <Icon {...props} name='arrow-downward-outline'/>
);
class TrendingQuestions extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let currentLanguage = this.props.currentLanguage;
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
                        <View style={LocalStyles.questionContainer}>
                            <View style={Styles.spacings.mLeftXSmall,Styles.spacings.mTopXSmall}>
                                <Grid style={Styles.spacings.mLeftXSmall}>
                                    <Col size={13}>
                                        <Image source={{uri: question.asker.dp}} style={LocalStyles.questionerDP} />
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
                                <View style={LocalStyles.primaryAnswerContainer}><Text style={LocalStyles.primaryAnswer}>{question.primaryAnswer}</Text>
                                <View style={LocalStyles.readMore}>
                                    <Text style={LocalStyles.readMoreText}>More..</Text>
                                </View>
                                </View>
                                <Divider/>
                            <View style={Styles.spacings.mXSmall}>
                            <Grid>
                                <Col size={30}>
                                    <Text style={LocalStyles.questionAnswer}>{question.answers} Answers</Text>
                                </Col>
                                <Col size={10}>
                                    
                                </Col>
                                <Col style={LocalStyles.actionBorder} size={12}>
                                    <Image style={LocalStyles.action} source={{uri: PrayEmoji64}}/><Text style={LocalStyles.actionText}>34</Text>
                                </Col>
                                <Col style={LocalStyles.actionBorder} size={12}>
                                    <Image style={LocalStyles.action} source={{uri: LaughEmoji64}}/><Text style={LocalStyles.actionText}>11</Text>
                                </Col>
                            </Grid>
                            </View>
                        </View>
                    </Col>
                </Row>
            )
        });
        return (
            <React.Fragment>
            <Card
                header={this.props.title}
                paddLeft={0}
                icon="radio-outline"
                paddRight={10}
                paddTop={10}
                noHeader={true}
                plain={true}
                paddBottom={10}>
                
            </Card>
            <View style={LocalStyles.question}>
                    <Grid>
                        {questions}
                    </Grid>
                </View>
            </React.Fragment>
        );   
    }
}
export default TrendingQuestions;

{/* <View>
                    <Grid>
                        <Row style={LocalStyles.newsContainer}>
                            <Col size={20}>
                                <Text style={Styles.typograhy.strong, Styles.alignments.textCenter}>444</Text>
                                <Text style={Styles.alignments.textCenter}><Text style={Styles.typograhy.nunito, Styles.typograhy.dimText}>Views</Text></Text>
                            </Col>
                            <Col size={80}>
                                <View>
                                    <Text style={Styles.typograhy.strong}>Why COVID cases in Jaipur spiked in past 2 weeks?</Text>
                                </View>
                            </Col>
                        </Row>
                        <Divider style={Styles.spacings.mBottomXSmall}/>
                        <Row style={LocalStyles.newsContainer}>
                            <Col size={20}>
                                <Text style={Styles.typograhy.strong, Styles.alignments.textCenter}>444</Text>
                                <Text style={Styles.alignments.textCenter}><Text style={Styles.typograhy.nunito, Styles.typograhy.dimText}>Views</Text></Text>
                            </Col>
                            <Col size={80}>
                                <View>
                                    <Text style={Styles.typograhy.strong}>When will Resturants and Malls open in Jaipur?</Text>
                                </View>
                            </Col>
                        </Row>
                        <Divider style={Styles.spacings.mBottomXSmall}/>
                        <Row style={LocalStyles.newsContainer}>
                            <Col size={20}>
                                <Text style={Styles.typograhy.strong, Styles.alignments.textCenter}>444</Text>
                                <Text style={Styles.alignments.textCenter}><Text style={Styles.typograhy.nunito, Styles.typograhy.dimText}>Views</Text></Text>
                            </Col>
                            <Col size={80}>
                                <View>
                                    <Text style={Styles.typograhy.strong}>Is Central Park safe to go for a morning Jog these days?</Text>
                                </View>
                            </Col>
                        </Row>
                    </Grid>
                </View> */}
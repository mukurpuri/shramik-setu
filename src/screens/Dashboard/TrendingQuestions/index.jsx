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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getProfilePicture } from '../../../utilities/helpers'
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

    navigateToQuestion = (id,question,asker, askedOn) => {
        this.props.navigation.navigate('QA', {
            id,
            question,
            asker,
            askedOn
        });
    }
    
    render() {
        let currentLanguage = this.props.currentLanguage;
        let questions = [];
        _.each(this.props.questionsData, (question,index) => {
            questions.push(
                <Row key={`${index}-question-list`} style={Styles.spacings.mTopXSmall}>
                    <Col>
                        <View style={QaStyles.questionContainer}>
                            <View style={Styles.spacings.mLeftXSmall,Styles.spacings.mTopXSmall}>
                                <Grid style={Styles.spacings.mLeftXSmall}>
                                    <Col size={11}>
                                        <Image style={{width: 40, height: 40, borderRadius: 5, marginTop: 3}} source={getProfilePicture(question.asker.imageId)} />
                                    </Col>
                                    <Col size={85}>
                                        <Grid style={Styles.spacings.mLeftXSmall}>
                                            <Row>
                                                <Grid>
                                                <Row><Text style={Styles.typograhy.strong}>{question.asker.name}</Text></Row>
                                                <Row><Text style={Styles.typograhy.dimText}>Asked {question.askedOn}</Text></Row>
                                                </Grid>
                                            </Row>
                                        </Grid>
                                    </Col>
                                </Grid>
                            </View>
                            <TouchableOpacity  onPress={() => this.navigateToQuestion(question.id, question.question, question.asker, question.askedOn)} size={100}>
                            <View style={[Styles.spacings.mLeftXSmall, Styles.spacings.mRightXSmall, Styles.spacings.mTopXSmall]}><Text style={Styles.typograhy.strong}>{question.question}</Text></View>   
                            
                                <View style={QaStyles.primaryAnswerContainer}><Text style={QaStyles.primaryAnswer}>{question.primaryAnswer}</Text>
                                
                                <View style={QaStyles.readMore}>
                                    
                                        <Text style={QaStyles.readMoreText}>More..</Text>
                                    
                                </View>
                                </View>
                                </TouchableOpacity>
                                <Divider/>
                            <View style={Styles.spacings.mXSmall}>
                            <Grid>
                                <Col size={30}>
                                    <Text style={QaStyles.questionAnswer}>{question.answers} Answers</Text>
                                </Col>
                                <Col size={90}>
                                    {/* <Grid style={{justifyContent: "flex-end"}}>
                                        <Image style={{width: 13, height: 13, borderRadius: 4, marginTop: 2}} source={getProfilePicture(question.asker.dp)} />
                                        <Text style={[Styles.typograhy.strong,{marginLeft: 4,fontSize: 12}]}>{question.asker.name}</Text>
                                    </Grid> */}
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
                paddBottom={310}
                noHeader={true}
                plain={true}
                paddBottom={0}>
            </Card>
            <View>
                    <Grid>
                        {questions}
                    </Grid>
                </View>
            </React.Fragment>
        );   
    }
}
export default TrendingQuestions;
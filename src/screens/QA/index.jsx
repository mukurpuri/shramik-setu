import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet,  Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Divider, Icon, Card, CheckBox } from '@ui-kitten/components';
import _ from 'lodash';
import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, AwardIcon, UserIcon, CircularCheckIconFull, CheckIcon } from '../../component/Icons';
import Styles from '../../styles';
import HeaderUser from '../../component/HeaderUser';
import { LaughEmoji64,PrayEmoji64 } from '../../config/Images';
import QaStyles from '../../styles/QaStyles';
import { GetQuestion, SetQuestionReaction } from '../../services/api.service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getProfilePicture } from '../../utilities/helpers';
class QA extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
        questionId: 11,
        answerData: null,
        showAnswerGiver: false,
        myAnswer: "",
        voteIncrement: true,
        freezeQuestionActions: false,
        actions: {
            votes: 0,
            upvote: false,
            downvote: false,
            bookmark: false,
            flag: false,
        }
      }
  }

  componentDidMount = () => {
    this.setState({
        freezeQuestionActions: true,
        questionId: this.props.route.params.id && this.props.route.params && this.props.route.params.id ? this.props.route.params.id  : ""
    }, async () => {
        await GetQuestion(this.props.route.params.id, this.props.user.id).then( async res => {
            if(res && res.data && res.data.status === 200) {
                let { actions } = this.state;
                let { votes, upvote, downvote, bookmark  } = res.data;
                actions.votes =  votes;
                this.setState({
                    actions: actions,
                    freezeQuestionActions: false,
                    answerData: []
                });     
            }
        });
    })
  }

  updateQuestionActions = inc => {
      this.setState({
        freezeQuestionActions: true
      }, async () => {
          let data = {
            reaction: {
              upVote: this.state.actions.upvote,
              downVote: this.state.actions.downvote,
              bookmark: this.state.actions.bookmark,
              flag: this.state.actions.flag,
              voteIncrement: inc
            },
            questionId: this.props.route.params.id,
            userId: this.props.user.id
          };
          await SetQuestionReaction(data).then( res => {
              console.log(res.data);
              this.setState({
                  freezeQuestionActions: false
              });
          });
      })
  }

  navigate = () => {
      this.props.navigation.navigate("Dashboard")
  }

  toggleCommentContaniner = answerId => {
      const { answerData } = this.state;
      let selectedAnswer = _.find(answerData, answer => {
          return answer.id === answerId
      });
      selectedAnswer.showComment = !selectedAnswer.showComment;
      this.setState({answerData})
  }

  getLineNumber = threshhold => {
      let textLength = this.state.myAnswer.length;
      for(var i = 0; i < 100; i++) {
        if(textLength > i && textLength < threshhold*(i+1)) {
            return i+1
        }    
      }
  }

  showAnswerGiver = () => {
      this.setState({
          showAnswerGiver: !this.state.showAnswerGiver
      })
  }

  fetchComments = comments => {
      let commentsContainer = [];
      _.each(comments, comment => {
        commentsContainer.push(
            <View style={LocalStyles.comment} key={`comment-${comment.id}`}>
                <Text style={LocalStyles.commentText}>
                    {comment.text}  <Text style={LocalStyles.commentatorLink}>{comment.commentor.name}</Text>
                </Text>
            </View>
          )
      })
      return commentsContainer
  }

  upVoteQuestion = () => {
      let { actions } = this.state;
      let { votes } = actions;
      if(!actions.upvote) {
        actions.upvote = true;
        actions.downvote = false;
        votes++;
        actions.votes = votes;
        this.setState({
          actions
          }, () => {
              this.updateQuestionActions(true)
        });
      }
  }

  downVoteQuestion = () => {
    let { actions } = this.state;
    let { votes } = actions;
    if(!actions.downvote) {
        actions.downvote = true;
        actions.upvote = false;
        votes--;
        actions.votes = votes;
        this.setState({
            actions
        }, () => {
            this.updateQuestionActions(false)
        });
    }
  }

  bookmarkQuestion = () => {
    let { actions } = this.state;
    actions.bookmark = !actions.bookmark;
    this.setState({
        actions
    }, () => {
        this.updateQuestionActions()
    });
  }
  
  flagQuestion = () => {
    let { actions } = this.state;
    actions.flag = !actions.flag;
    this.setState({
        actions
    });
  }

  render() {
      let currentLanguage = this.props.settings.language;
      let { actions, freezeQuestionActions } = this.state;
      const { user } = this.props;
        let answers = [];
        if(this.state.answerData) {
            _.each(this.state.answerData, (answer,index) => {
                answers.push(
                    <Row key={`${answer.id}-question-list`}>
                        <Col size={100} style={Styles.spacings.mBottomXSmall}>
                            <View style={[QaStyles.questionContainer]}>
                                <View style={Styles.spacings.mLeftXSmall,Styles.spacings.mTopXSmall}>
                                    <Grid style={Styles.spacings.mLeftXSmall}>
                                        <Col size={13}>
                                            <Image source={{uri: answer.answerer.dp}} style={QaStyles.questionerDP} />
                                        </Col>
                                        <Col size={85}>
                                            <Grid style={Styles.spacings.mLeftXSmall}>
                                                <Row>
                                                    <Grid>
                                                    <Row><Text style={Styles.typograhy.strong}>{answer.answerer.name}</Text></Row>
                                                    <Row><Text style={Styles.typograhy.dimText}>Answered yesterday</Text></Row>
                                                    </Grid>
                                                </Row>
                                            </Grid>
                                        </Col>
                                    </Grid>
                                </View>
                                <View style={QaStyles.answerContainer}>
                                    <Text style={QaStyles.answer}>
                                        {answer.primaryAnswer}
                                    </Text>
                                </View>
                                <Divider/>
                                <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                                    <View>
                                        <TouchableOpacity  onPress={() => {this.toggleCommentContaniner(answer.id)}}>
                                        <Text style={LocalStyles.commentLink}>
                                            {answer.showComment ? "Hide" : "Show"} Comments(83)
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <View style={[QaStyles.answerReactionButton, QaStyles.prayEmojiIcon]}>
                                            <Image style={QaStyles.answerAction} source={{uri: PrayEmoji64}}/><Text style={[QaStyles.answerActionText]}>34</Text>
                                        </View>
                                        <View style={[QaStyles.answerReactionButton]}>
                                            <Image style={QaStyles.answerAction} source={{uri: LaughEmoji64}}/><Text style={[QaStyles.answerActionText]}>22</Text>
                                        </View>
                                    </View>
                                </View>
                                {
                                    answer.showComment ?
                                    <React.Fragment>
                                        <Divider/>
                                        <View style={LocalStyles.commentContainer}>
                                            <View style={LocalStyles.addComment}>
                                                <View>
                                                    <Input
                                                        textStyle={Styles.typograhy.nunito}
                                                        placeholder="Add your comment.."
                                                    />
                                                </View>
                                                <View>
                                                    <Grid>
                                                        <Row>
                                                            <Col size={51}></Col>
                                                            <Col size={24}>
                                                            <Button status="basic" style={LocalStyles.commentButton} size='tiny'>
                                                                Cancel
                                                            </Button>
                                                            </Col>
                                                            <Col size={1}></Col>
                                                            <Col size={24}>
                                                            <Button status="danger" style={LocalStyles.commentButton} size='tiny'>
                                                                Submit
                                                            </Button>
                                                            </Col>
                                                        </Row>
                                                    </Grid>
                                                </View>
                                            </View>
                                        </View>
                                        <Divider/>
                                        <View>
                                            {this.fetchComments(answer.comments)}
                                        </View>
                                    </React.Fragment> : null
                                }
                            </View>
                        </Col>
                    </Row>
                )
            });
        }
      return (
        <Wrapper bg="#f5f5f5">
           {
            freezeQuestionActions ? <View style={LocalStyles.freeze}></View> : null
           }
            <HeaderUser leftIconCall = { () => this.navigate()} showBack={true} hideHam={true} title="" subTitle="QA" navigation={this.props.navigation}/>
          <Grid style={[Styles.spacings.mLeftSmall, Styles.spacings.mRightSmall, Styles.spacings.mTopSmall]}> 
              <Row>
                <View>
                    <View>
                        <Text style={Styles.typograhy.strong} category="h6">
                            {this.props.route.params.question}
                        </Text>
                    </View>
                </View>
              </Row>
              <Row>
                <View style={QaStyles.postParams}>
                    <Grid>
                        <Col style={{width: "56%", flexDirection: "column"}}>
                            <View>
                                <Grid>
                                    <Col size={25}>
                                        <Image style={{width: 40, height: 40, borderRadius: 5, marginTop: 3}} source={getProfilePicture(this.props.route.params.asker.imageID)} />
                                    </Col>
                                    <Col  size={75} style={[Styles.alignments.mTopXSmall, Styles.typograhy.nunito]}>
                                        <Text style={[Styles.typograhy.linkText,{fontSize: 18}]}>{this.props.route.params.asker.name}</Text>
                                        <Text style={Styles.typograhy.dimText}>Asked {this.props.route.params.askedOn}</Text>
                                    </Col>
                                </Grid>
                            </View>
                        </Col>
                        <Col>
                        <Row>
                            <Grid>
                                <Col style={[QaStyles.actionBorder, actions.upvote ? QaStyles.up : {}]} size={12}>
                                    <TouchableOpacity style={LocalStyles.touchFull} onPress={() => this.upVoteQuestion()}>
                                        <Icon style={LocalStyles.actionIcons} name="arrow-upward-outline" fill={!actions.upvote ? QaStyles.upColor.color : "white"}/>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={QaStyles.voteMetric} size={12}>
                                    <Text style={[Styles.typograhy.strong, Styles.spacings.mTopXSmall]}>{this.state.actions.votes}</Text>
                                </Col>
                                <Col style={[QaStyles.actionBorder, actions.downvote ? QaStyles.down : {}]} size={12}>
                                    <TouchableOpacity style={LocalStyles.touchFull} onPress={() => this.downVoteQuestion()}>
                                        <Icon style={LocalStyles.actionIcons} name="arrow-downward-outline" fill={!actions.downvote ? QaStyles.downColor.color : "white"}/>
                                    </TouchableOpacity>
                                </Col>
                            </Grid>
                            </Row>
                        </Col>
                    </Grid>
                 </View>
              </Row>
          </Grid>
          <Grid style={{paddingLeft: 15, paddingRight: 15, marginTop: 5}}>
            <Col style={[QaStyles.actionBorder, actions.flag ? QaStyles.flag : {}]} size={13}>
                <TouchableOpacity style={LocalStyles.touchFull} onPress={() => this.flagQuestion()}>
                    <Icon style={LocalStyles.actionIcons} name="flag" fill={!actions.flag ? QaStyles.flagColor.color : "white"}/>
                </TouchableOpacity>
            </Col>
            <Col size={2}></Col>
            <Col style={[QaStyles.actionBorder, actions.bookmark ? QaStyles.bookmark : {}]} size={13}>
                <TouchableOpacity style={LocalStyles.touchFull}  onPress={() => this.bookmarkQuestion()}>
                    <Icon style={LocalStyles.actionIcons} name="star" fill={!actions.bookmark ? QaStyles.bookmarkColor.color : "white"}/>
                </TouchableOpacity>
            </Col>
            <Col size={12}>
                
            </Col>
            <Col style={[QaStyles.giveAnswerButton]} size={60}>
                <TouchableOpacity onPress={() => this.showAnswerGiver()} >
                    <View style={[Styles.alignments.row, {justifyContent: "center"}]}>
                        <Text style={[QaStyles.giveAnswerButtonText]}>Write your Answer</Text>
                        <View>
                            <Icon name="edit-outline" style={LocalStyles.addAnswer} fill="#333"/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Col>
          </Grid>
          {
              this.state.showAnswerGiver ?
              <Grid style={LocalStyles.qa}>
                <View style={[QaStyles.questionContainer, Styles.spacings.pTopXSmall, Styles.spacings.pLeftXSmall, Styles.spacings.pBottomXSmall, Styles.spacings.pRightXSmall]}>
                    <Grid>
                        <Row style={Styles.alignments.full}>
                            <Text style={Styles.typograhy.strong}>Write down your answer here</Text>
                        </Row>
                        <Row style={Styles.alignments.full}>
                            <Input
                                multiline = {true}
                                textStyle={[LocalStyles.innerTextStyle]}
                                onChangeText={(val) => this.setState({myAnswer: val})}
                                style={[LocalStyles.inputText]}
                                value={this.state.myAnswer}
                            />
                        </Row>
                        <Row>
                            <Button style={[Styles.alignments.full]} status="success" size="medium">
                            <Text style={[Styles.typograhy.strong, Styles.typograhy.white]}>
                                Submit Answer
                            </Text>
                            </Button>
                        </Row>
                    </Grid>
                </View>
              </Grid> : null
          }
          <Grid style={LocalStyles.qa}>
            <View style={{ width: "100%", minHeight:  1000}}>
             {
                answers.length > 0 ? answers : <Noanswer />
             }
             </View>
          </Grid>
        </Wrapper>
      );   
  }
}
 const Noanswer = () => {
     return <View style={LocalStyles.noAnswerSection}>
        <Text style={{color: "#838080", fontFamily: "nunito-bold",  textAlign: "center"}}>No answers found</Text>
    </View>
 }

const LocalStyles = StyleSheet.create({
  qa: {
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 15,
  },
  commentLink: {
      paddingLeft: 10,
      paddingTop: 4,
      color: "#888",
      fontSize: 13,
      fontFamily: "nunito"
  },
  freeze: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 100,
      top: 60,
      left: 0,
      backgroundColor: "rgba(255, 255, 255, 0.52)"
  },
  commentatorLink: {
      color: "#09F",
      fontFamily: "nunito-bold"
  },
  comment: {
      borderBottomWidth: 1,
      borderBottomColor: "#ecebeb"
  },
  commentText: {
      fontFamily: "nunito",
      fontSize: 15,
      padding: 15,
  },
  commentContainer: {
      overflow: "hidden"
  },
  addComment: {
      minHeight: 60,
      margin: 10
  },
  addAnswer: {
    width: 15, height: 15,
    top: 5, left: 3
  },
  innerTextStyle: {
    backgroundColor: "white",
    fontFamily: "nunito",
    fontSize: 19,
    minHeight: 200,
    textAlignVertical : 'top'
},
inputText: {
    backgroundColor: "white",
    marginTop: 5,
    width: "100%",
},
noAnswerSection: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
},
actionIcons: {
    width: 20,
    height: 20,
    marginTop: 10  
},
touchFull: {
    width: 50,
    height: 50,
    paddingLeft:15
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


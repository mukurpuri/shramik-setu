import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet,  Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";
import DEVICE from '../../../constants/device';
import { Text, Input, Button, Divider, Icon, Card, CheckBox } from '@ui-kitten/components';
import _ from 'lodash';
import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { RightIcon, AwardIcon, UserIcon, CircularCheckIconFull, CheckIcon } from '../../component/Icons';
import Styles from '../../styles';
import HeaderUser from '../../component/HeaderUser';
import { LaughEmoji64,PrayEmoji64 } from '../../config/Images';
import QaStyles from '../../styles/QaStyles';
import { GetQuestion,
    SetQuestionReaction,
    SubmitAnswerToQuestion,
    SaveComment,
    SetAnswerReaction } from '../../services/api.service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getProfilePicture } from '../../utilities/helpers';
class QA extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
        loadingText: "Loading...",
        questionId: null,
        answerData: null,
        showAnswerGiver: false,
        myAnswer: "",
        voteIncrement: true,
        freezeQuestionActions: false,
        question: {
            title: "",
            createdOn: "",
            questioner: {
                name: "",
                dp: ""
            },
        },
        actions: {
            votes: null,
            upvote: false,
            downvote: false,
            bookmark: false,
            flag: false,
            categories: []
        }
      }
  }

  componentDidMount = () => {
      this.refreshPage();
  }

  refreshPage = () => {
    this.setState({
        freezeQuestionActions: true,
        questionId: this.props.route.params.id && this.props.route.params && this.props.route.params.id ? this.props.route.params.id  : ""
    }, async () => {
        await GetQuestion(this.props.route.params.id, this.props.user.id, DEVICE.clientId).then( async res => {
            if(res && res.data && res.data.status === 200) {
                let { actions } = this.state;
                let { createdOn, views ,votes, upvote, downvote, bookmark , categories, answerSet, questioner, title } = res.data.content;
                actions.votes =  votes;
                actions.downvote = downvote;
                actions.upvote = upvote;
                actions.bookmark = bookmark;
                actions.categories = categories;
                this.setState({
                    actions: actions,
                    question: {
                        views,
                        title,
                        createdOn,
                        questioner: {
                            name: questioner.name,
                            dp: questioner.imageID
                        }
                    },
                    freezeQuestionActions: false,
                    answerData: answerSet,
                    loadingText: answerSet.length === 0 ? "No answers found" : "Loading..."
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
              this.updateQuestionActions("up")
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
            this.updateQuestionActions("down")
        });
    }
  }

  bookmarkQuestion = () => {
    let { actions } = this.state;
    actions.bookmark = !actions.bookmark;
    this.setState({
        actions
    }, () => {
        this.updateQuestionActions(null)
    });
  }
  
  flagQuestion = () => {
    let { actions } = this.state;
    actions.flag = !actions.flag;
    this.setState({
        actions
    });
  }

  submitAnswer = () => {
      if(this.state.myAnswer) {
        
        this.setState({
            freezeQuestionActions: true
          }, async () => {
              let data = {
                answer: {
                  title: this.state.myAnswer
                },
                questionId: this.props.route.params.id,
                userId: this.props.user.id
              };
              await SubmitAnswerToQuestion(data).then( res => {
                  this.setState({
                      myAnswer: "",
                      showAnswerGiver: false
                  }, () => {
                    this.refreshPage();
                  });
              });
          })
      } else {
          alert("Cannot submit empty answer.")
      }
  }


  voteAnswer = (answerId, userId, type) => {
      let { answerData } = this.state;
      let voteType = "";
      let selectedAnswer = _.find(answerData, answer => {
          return answer.id === answerId;
      });
      let selectedAnswerIndex = _.findIndex(answerData, answer => {
        return answer.id === answerId;
      });
      switch(type) {
          case "up":
          if(!selectedAnswer.reaction.upVote) {
              selectedAnswer.reaction.upVote = true;
              selectedAnswer.reaction.downVote = false;
              selectedAnswer.reaction.votes++;
              answerData[selectedAnswerIndex] = selectedAnswer;
              this.setState({answerData}, () => {
                  this.updateAnswerReaction("up", selectedAnswer)
                })
          }
          break;

          case "down":
            if(!selectedAnswer.reaction.downVote) {
                selectedAnswer.reaction.downVote = true;
                selectedAnswer.reaction.upVote = false;
                selectedAnswer.reaction.votes--;
                this.setState({answerData}, () => {
                    this.updateAnswerReaction("down", selectedAnswer)
                  })
            }
          break;

          default:
          console.log("unkown type");
      }
  }

  updateAnswerReaction = async(type, selectedAnswer) => {
    this.setState({
        freezeQuestionActions: true
      }, async () => {
          let data = {
            reaction: {
              upVote: selectedAnswer.reaction.upVote,
              downVote: selectedAnswer.reaction.downVote,
              bookmark: selectedAnswer.reaction.bookmark,
              flag: selectedAnswer.reaction.flag,
              voteIncrement: type
            },
            answerId: selectedAnswer.id,
            userId: this.props.user.id
          };
          await SetAnswerReaction(data).then( res => {
              this.setState({
                  freezeQuestionActions: false
              });
          });
      }) 
  }

  saveCommentMethod = (postId, val) => {
    this.setState({
        freezeQuestionActions: true
      }, async () => {
        let data = {
            text,
            postId,
            userId: this.props.userId
        }
        await SaveComment(data).then( res => {
            this.setState({
                freezeQuestionActions: false
            });
        });
      })
  }

  render() {
      let currentLanguage = this.props.settings.language;
      let { actions, freezeQuestionActions, question } = this.state;
      const { user } = this.props;
        let answers = [];
        if(this.state.answerData) { 
            _.each(this.state.answerData, (answer,index) => {
                answers.push(
                    <Row key={`${answer.id}-${Date.now()}-question-list`}>
                        <Col size={100} style={Styles.spacings.mBottomXSmall}>
                            <View style={[QaStyles.questionContainer]}>
                                <View style={Styles.spacings.mLeftXSmall,Styles.spacings.mTopXSmall}>
                                    <Grid style={Styles.spacings.mLeftXSmall}>
                                        <Col size={11}>
                                            <Image source={getProfilePicture(answer.answerer.dp)} style={QaStyles.questionerDP} />
                                        </Col>
                                        <Col size={83}>
                                            <Grid style={Styles.spacings.mLeftXSmall}>
                                                <Row>
                                                    <Grid>
                                                    <Row><Text style={Styles.typograhy.strong}>{answer.answerer.name}</Text></Row>
                                                    <Row><Text style={Styles.typograhy.dimText}>Answered {answer.createdOn}</Text></Row>
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
                                        {/* <TouchableOpacity  onPress={() => {this.toggleCommentContaniner(answer.id)}}>
                                        <Text style={LocalStyles.commentLink}>
                                            Add / {answer.showComment ? "Hide" : "Show"} Comments({answer.comments.length})
                                        </Text>
                                        </TouchableOpacity> */}
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <View style={[QaStyles.answerReactionButton, QaStyles.prayEmojiIcon, answer.reaction.upVote ? QaStyles.up : {}]}>
                                            <TouchableOpacity style={{width: 48, height: 30, justifyContent: "center", alignContent: "center", "alignItems": "center"}} onPress={() => this.voteAnswer(answer.id, this.props.user.id, "up")}>
                                                <Icon style={{width: 20, height: 20}} name="arrow-upward-outline" fill={!answer.reaction.upVote ? QaStyles.upColor.color : "white"}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[QaStyles.answerReactionButton]}>
                                            <Text style={[Styles.typograhy.strong, {marginTop: 4}]}>{answer.reaction.votes}</Text>
                                        </View>
                                        <View style={[QaStyles.answerReactionButton, QaStyles.prayEmojiIcon, answer.reaction.downVote ? QaStyles.down : {}, {borderRightWidth: 0}]}>
                                            <TouchableOpacity style={{width: 48, height: 30, justifyContent: "center", alignContent: "center", "alignItems": "center"}} onPress={() => this.voteAnswer(answer.id, this.props.user.id, "down")}>
                                                <Icon style={{width: 20, height: 20}} name="arrow-downward-outline" fill={!answer.reaction.downVote ? QaStyles.downColor.color : "white"}/>
                                            </TouchableOpacity>
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
                                                        // onChange={val => this.saveCommentMethod(answer.id,  val)}
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
      let questionCategories = [];
      _.each(actions.categories, category => {
          questionCategories.push(<View key={`${category}-category`} style={LocalStyles.category}><Text style={LocalStyles.categoryText}>{category}</Text></View>);
      });
      questionCategories.push(
        <View style={LocalStyles.views} key="views"><Text style={LocalStyles.viewsText}> {question.views || 0} Views </Text></View>
      )

      return (
        <Wrapper bg="#f5f5f5">
           {
            freezeQuestionActions ? <View style={LocalStyles.freeze}></View> : null
           }
            <HeaderUser leftIconCall = { () => this.navigate()} showBack={true} hideHam={true} title="" subTitle="QA" navigation={this.props.navigation}/>
          {
            this.state.answerData === null ? <Text></Text> : 
            (
                <React.Fragment>
                    <Grid style={[Styles.spacings.mLeftSmall, Styles.spacings.mRightSmall, Styles.spacings.mTopSmall]}> 
                        <Row>
                            <View>
                                <View>
                                    <Text style={Styles.typograhy.strong} category="h6">
                                        {question.title}
                                    </Text>
                                </View>
                            </View>
                        </Row>
                        <Row>
                            <View style={QaStyles.postParams}>
                                <Grid>
                                    <Col style={{width: "66%", flexDirection: "column"}}>
                                        <View>
                                            <Grid>
                                                <Col size={18}>
                                                    <Image style={{width: 28, height: 28, borderRadius: 5, marginTop: 3}} source={getProfilePicture(question.questioner.dp)} />
                                                </Col>
                                                <Col  size={80} style={[Styles.typograhy.nunito]}>
                                                    <Text style={[Styles.typograhy.linkText,{fontSize: 14}]}>{question.questioner.name}</Text>
                                                    <Text style={Styles.typograhy.dimText}>Asked {this.state.question.createdOn}</Text>
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
                    <Grid style={{paddingLeft: 15, paddingRight: 15, marginTop: 0}}>
                        {/* <Col style={[QaStyles.actionBorder, actions.flag ? QaStyles.flag : {}]} size={13}>
                            <TouchableOpacity style={LocalStyles.touchFull} onPress={() => this.flagQuestion()}>
                                <Icon style={LocalStyles.actionIcons} name="flag" fill={!actions.flag ? QaStyles.flagColor.color : "white"}/>
                            </TouchableOpacity>
                        </Col>
                        <Col size={2}></Col>
                        <Col style={[QaStyles.actionBorder, actions.bookmark ? QaStyles.bookmark : {}]} size={13}>
                            <TouchableOpacity style={LocalStyles.touchFull}  onPress={() => this.bookmarkQuestion()}>
                                <Icon style={LocalStyles.actionIcons} name="star" fill={!actions.bookmark ? QaStyles.bookmarkColor.color : "white"}/>
                            </TouchableOpacity>
                        </Col> */}
                        
                        <Col style={[QaStyles.giveAnswerButton]} size={60}>
                            <TouchableOpacity style={{width: "100%", alignContent: "center", alignItems: "center", paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, height: 40}} onPress={() => this.showAnswerGiver()} >
                                <View style={[Styles.alignments.row, {justifyContent: "center"}]}>
                                    <Text style={[QaStyles.giveAnswerButtonText]}>Write your Answer</Text>
                                    <View>
                                        <Icon name="edit-outline" style={LocalStyles.addAnswer} fill="#333"/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Col>
                    </Grid>
                    <View style={[LocalStyles.categoryContainer,Styles.spacings.mLeftSmall, Styles.spacings.mRightSmall, Styles.spacings.mTopXSmall]}>
                        {questionCategories}
                    </View>
                    {
                        this.state.showAnswerGiver ?
                        <Grid style={LocalStyles.qa}>
                            <View style={[QaStyles.questionContainer, Styles.spacings.pTopXSmall, Styles.spacings.pLeftXSmall, Styles.spacings.pBottomXSmall, Styles.spacings.pRightXSmall]}>
                                <Grid>
                                    <Row style={Styles.alignments.full}>
                                        <Input
                                            multiline = {true}
                                            textStyle={[LocalStyles.innerTextStyle]}
                                            onChangeText={(val) => this.setState({myAnswer: val})}
                                            style={[LocalStyles.inputText]}
                                            value={this.state.myAnswer}
                                            placeholder="Write down your answer here"
                                        />
                                    </Row>
                                    <Row>
                                        <Button onPress={() => this.submitAnswer()} style={[Styles.alignments.full]} status="success" size="medium">
                                            <Text style={[Styles.typograhy.strong, Styles.typograhy.white]}>
                                                Submit Answer
                                            </Text>
                                        </Button>
                                    </Row>
                                </Grid>
                            </View>
                        </Grid> : null
                    }
                </React.Fragment>
            )
          }
          
          <Grid style={LocalStyles.qa}>
            <View style={{ width: "100%", minHeight: answers.length > 0 ? 0 : 1000}}>
             {
                answers.length > 0 ? answers : <View style={LocalStyles.noAnswerSection}><Text style={{color: "#838080", fontFamily: "nunito-bold",  textAlign: "center"}}>{this.state.loadingText}</Text></View> 
             }
             </View>
          </Grid>
        </Wrapper>
      );   
  }
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
      backgroundColor: "rgba(255, 255, 255, 0.42)"
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
    fontSize: 16,
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
views: {
    position: "absolute",
    right: 0,
},
actionIcons: {
    width: 15,
    height: 15
},
touchFull: {
    width: 40,
    height: 33,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
},
categoryText: {
    minWidth: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    fontFamily: "nunito-bold",
    fontSize: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ecebeb",
    backgroundColor: "white",
    color: "#333",
    borderRadius: 50,
    textAlign: "center"
},
viewsText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "nunito"
},
category: {
    minWidth: 50,
    marginRight: 10
},
categoryContainer: {
    flexDirection: "row",
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


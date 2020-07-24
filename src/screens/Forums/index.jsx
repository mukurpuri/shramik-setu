import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import Styles from '../../styles';
import { Col, Row, Grid } from "react-native-easy-grid";
import FootbarAction from '../../component/FootbarAction';
import  Wrapper from '../../component/Wrapper';
import HeaderUser from '../../component/HeaderUser';
import _ from 'lodash'
import { QuestionMarkCircleOutline } from '../../../src/component/Icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetQuestionsByType } from '../../services/api.service';
class Forums extends React.Component {
  _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          active: "unanswered",
          spinner: true,
          questions: []
        }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    askQuestion = () => {
      this.props.navigation.navigate("CreateQuestion")
    }

    navigate = () => {
      this.props.navigation.navigate("Dashboard");
    }

    componentDidMount = () => {
      this.setTab("top");
    }

    navigateTo = id => {
      this.props.navigation.navigate('QA', {
        id
      });
    }

    setTab = tabName => {
      this._isMounted = true;
      this.setState({
        active: tabName,
        spinner: true
      }, async () => {
        await GetQuestionsByType(tabName).then( res => {
          if(res && res.data && res.status === 200) {
            let questions = res.data.questionsSet;
            if (this._isMounted) {
              this.setState({
                spinner: false,
                questions
              });
            }
          }
        });
      });
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        let questionSet = [];
        _.each(this.state.questions, question => {
          let tags = [];
          _.each(question.tags, tag => {
            tags.push(
              <Text key={`${tag}-tags`} style={LocalStyles.tag}>
                {tag}
              </Text>
            )
          });
          
          if(question.area) {
            tags.push(
              <Text key="area" style={LocalStyles.tag}>
                {question.area}
              </Text>
            )
          }
          questionSet.push(
            <View key={`${question.id}-question`} style={LocalStyles.cardItems}>
              <TouchableOpacity onPress={() => this.navigateTo(question.id)}>
                <Text style={[Styles.typograhy.strong,LocalStyles.question]}>{question.title}</Text>
                <View style={LocalStyles.infoContainer}>
                  <Text style={{fontFamily: "nunito", fontSize: 11, marginLeft: 5, marginTop: 5, color: "#9199a1"}}>Asked {question.askedOn}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                  <View style={LocalStyles.tagContainer}> 
                    {tags}
                  </View>
                </View>
                <View style={LocalStyles.infoContainer, {justifyContent: "space-between", flexDirection: "row"}}>
                  <View style={Styles.alignments.row}>
                    <Text style={[LocalStyles.info, {color: "#48a868"}]}>{question.answers} Answers</Text>
                    <Text style={[LocalStyles.info, {color: "#09F"}]}>{question.votes} Votes</Text>
                  </View>
                  <View>
                    <Text style={[LocalStyles.info, Styles.typograhy.strong,  {color: "#555"}]}>{question.views} Views</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        })
        return (
            <View style={{flex: 1}}>
            <HeaderUser showBack={true} leftIconCall = { () => this.navigate()} title="Ask / Answer" paddBottom={0} navigation={this.props.navigation} />
            <Wrapper bg="#f5f5f5">
              <View style={LocalStyles.container}>
                <View style={LocalStyles.categories}>
                      <View style={LocalStyles.category}>
                          <TouchableOpacity style={{justifyContent: "center", alignContent: "center", alignItems: "center", width: 120}} onPress={() => this.setTab("top")}>
                          <Text style={[Styles.typograhy.strong, this.state.active === "top" ? LocalStyles.active : { color: "#333" }]}>
                              Top Voted
                          </Text>
                          </TouchableOpacity>
                      </View>
                      <View style={LocalStyles.divider}></View>
                      <View style={LocalStyles.category}>
                          <TouchableOpacity style={{justifyContent: "center", alignContent: "center", alignItems: "center", width: 120}} onPress={() => this.setTab("unanswered")}>
                          <Text style={[Styles.typograhy.strong, this.state.active === "unanswered" ? LocalStyles.active : { color: "#333" }]}>
                              Unanswered
                          </Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                <View style={[Styles.spacings.mLeftXSmall, Styles.spacings.mRightXSmall ,Styles.spacings.mBottomSmall,Styles.spacings.mTopXSmall]}>
                    {
                      this.state.spinner ? <View style={{width: "100%", height: 400, justifyContent: "center", alignItems: "center" }}><Spinner status="danger" size="giant"/></View> : <View style={LocalStyles.card}>{questionSet}</View>
                    }
                </View>
              </View>
            </Wrapper>
            <Button  onPress={() => this.askQuestion()} style={[LocalStyles.button, Styles.spacings.mTopMedium]}  size='giant' status='danger'>
                Ask a Question
              </Button>
            <FootbarAction navigation={this.props.navigation} active="forum"/>
          </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
  container: {
      minHeight: 700,
      paddingBottom: 200,
  },
  inputText: {
    backgroundColor: "white",
    textAlignVertical : 'top',
    fontFamily: "nunito-bold",
    fontSize: 17,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  title: {
    paddingBottom: 5,
    fontSize: 15,
    color: "#999"
  },
  button: {
    borderRadius: 0,
    position: "absolute",
    width: "100%",
    bottom: 50,
    left: 0,
  },
  card: {
    width: "100%",
    minHeight: 160,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#efefef",
    position: "relative"
  },
  cardItems: {
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    minHeight: 40,
    padding: 10
  },
  tag: {
    textAlign: "center",
    color: "#333",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#dedede",
    paddingBottom: 3,
    backgroundColor: "#fdfdfd",
    fontSize: 13,
    fontFamily: "nunito",
    marginTop: 10,
    paddingTop: 3,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tagContainer: {
    flexDirection: "row"
  },
  infoContainer: {
    flexDirection: "row",
    paddingTop: 4
  },
  info: {
    paddingBottom: 3,
    fontSize: 13,
    fontFamily: "nunito",
    marginTop: 10,
    marginRight: 10,
  },
  question: {
    fontSize: 15
  },
  categories: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    minHeight: 50,
    borderRadius: 4,
    borderColor: "#efefef",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopWidth: 0
},
category: {
    minWidth: 100,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
},
divider: {
    width: 1,
    height: 50,
    borderLeftWidth: 0.5,
    borderLeftColor: "#efefef",
    borderRightWidth: 0.5,
    borderRightColor: "#efefef",
},
active: {
    color: "#09F"
}
});
const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Forums);

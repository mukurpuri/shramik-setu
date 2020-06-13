import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Icon, Radio,  TopNavigation, TopNavigationAction, Divider } from '@ui-kitten/components';

import  Wrapper from '../../component/Wrapper';
import Language from '../../config/languages/Language';
import { PinIcon, BackIcon, PlaneIcon } from '../../component/Icons';
import Styles from '../../styles';

import Footer from '../../component/Footer';
import { Otp } from '../../config/Images';

class PostAdScreen extends React.Component {
    constructor(props) {
        super(props);
    }


    renderBackAction = () => (
      <TopNavigationAction onPress={() => {console.log("fewfw")}} icon={BackIcon}/>
    );
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
          <Wrapper>
          <TopNavigation
                title={Language.get("postjob", "title", currentLanguage)}
                subtitle={Language.get("postjob","subtitle", currentLanguage)}
                accessoryLeft={this.renderBackAction}
            />
            <Divider/>
            <View>
              <Grid>
                <Row style={Styles.spacings.mTopSmall}>
                <Input
                  label="Title"
                  style={LocalStyles.input}
                  placeholder='Example: I need a female cook for breakfast'
                />
                </Row>
                {/* <Row style={Styles.spacings.mTopSmall}>
                <Input
                  style={LocalStyles.input}
                  label="Description"
                  multiline={true}
                  textStyle={{ minHeight: 70 }}
                  placeholder='I need to have a good and healthy breakfast before my way to office'
                />
                </Row> */}
                <Divider style={Styles.spacings.mTopXSmall}/>
                <View style={Styles.spacings.mTopXSmall}>
                  <Grid>
                  <Col size={30}>
                    <Button style={Styles.spacings.d} size="tiny">SELECT TAGS</Button>
                  </Col>
                  <Col size={70}>

                  </Col>
                  </Grid>
                </View>
                <Divider style={Styles.spacings.mTopXSmall}/>
                <View style={Styles.spacings.mTopXSmall}>
                  <Text style={LocalStyles.label} category="c1">Preferences</Text>
                  <Row  style={Styles.spacings.mTopXSmall}>
                    <Radio
                      style={LocalStyles.radio}
                      checked
                      >Any
                    </Radio>
                    <Radio
                      style={LocalStyles.radio}
                      >Female
                    </Radio>
                    <Radio
                      style={LocalStyles.radio}
                      >Male
                    </Radio>
                  </Row>
                </View>
                <Divider style={Styles.spacings.mTopXSmall}/>
                <View style={Styles.spacings.mTopXSmall}>
                  <Text style={LocalStyles.label} category="c1">Period of work</Text>
                  <Row  style={Styles.spacings.mTopXSmall}>
                    <Radio
                      style={LocalStyles.radio}
                      >One Time
                    </Radio>
                    <Radio
                      style={LocalStyles.radio}
                      checked
                      >Monthly
                    </Radio>
                    <Radio
                      style={LocalStyles.radio}
                      >Yearly
                    </Radio>
                  </Row>
                </View>
                <Divider style={Styles.spacings.mTopXSmall}/>
                <View style={Styles.spacings.mTopXSmall}>
                  <Text style={LocalStyles.label} category="c1">Amount/Salary in INR</Text>
                  <Row  style={Styles.spacings.mTopXSmall}>
                    <Grid>
                      <Col size={40}>
                      <Input
                        label="Minimum (₹)"
                        placeholder="₹ 3000"
                        keyboardType="numeric"
                        style={LocalStyles.input}
                      />
                      </Col>
                      <Col size={10}>

                      </Col>
                      <Col size={40}>
                      <Input
                        label="Maximum (₹)"
                        placeholder="₹ 5000"
                        keyboardType="numeric"
                        style={LocalStyles.input}
                      />
                      </Col>
                      <Col size={10}>
                      </Col>
                    </Grid>
                  </Row>
                </View>
                <Divider style={Styles.spacings.mTopXSmall}/>
                <View style={Styles.spacings.mTopXSmall}>
                  <Text style={LocalStyles.label} category="c1">Set Location of Job</Text>
                  <Row style={Styles.spacings.mTopXSmall}>
                    <Col size={50}>
                      <Button accessoryRight={PinIcon} size='tiny'>SET CURRENT LOCATION</Button>
                    </Col>
                    <Col size={10}>
                      <View style={Styles.alignments.verticalCenter}>
                        <Text>or</Text>
                      </View>
                    </Col>
                    <Col size={40} style={[Styles.alignments.textCenter]}>
                      <Text style={[Styles.alignments.textCenter, Styles.typograhy.linkText]}>Specify Address +</Text>
                    </Col>
                  </Row>
                </View>
                <Divider style={Styles.spacings.mTopSmall}></Divider>
                <Row style={Styles.spacings.mTopSmall}>
                <Button onPress={() => this.openSearchWorkerPage()} style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='danger' accessoryRight={PlaneIcon}>
                  Post This Ad For FREE
                </Button>
                </Row>
              </Grid>
            </View>
            <Footer/>
          </Wrapper>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    gridContainer: {width: "100%"},
    otpInput: { textAlign: "center", fontSize: 30, fontWeight: "bold" },
    input: { width: "100%"},
    container: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    label: {
      fontSize: 12,
      color: '#a9a9a9'
    },
    radio: {
      margin: 1,
      marginRight: 20
    },
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
  
export default connect(mapStateToProps, mapDispatchToProps)(PostAdScreen);


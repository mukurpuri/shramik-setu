import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button } from '@ui-kitten/components';

import  Wrapper from '../../../component/Wrapper';
import Language from '../../../config/languages/Language';
import { RightIcon, SearchIcon } from '../../../component/Icons';
import Styles from '../../../styles';

import Footer from '../../../component/Footer';

class SearcWorkersScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
          <Wrapper>
            <View>
            <Grid>
              <Col>
                  <Text>Fixed width</Text>
              </Col>
              <Col>
                  <Text>Fluid width</Text>
              </Col>
            </Grid>
            </View>
            <Footer/>
          </Wrapper>
        );   
    }
}


const LocalStyles = StyleSheet.create({
  
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
  
export default connect(mapStateToProps, mapDispatchToProps)(SearcWorkersScreen);


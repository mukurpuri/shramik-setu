import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Styles from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

class FootbarAction extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
         <View style={LocalStyles.FootbarAction}>
          <View style={LocalStyles.addUpdate}>
          
          </View>
          <Grid>
            <Col>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Dashboard")}>
              <View style={Styles.alignments.row, Styles.alignments.horizontalCenter}>
                <View style={{marginTop: 8}}>
                  <View style={Styles.alignments.row, Styles.alignments.horizontalCenter}><Icon fill={ this.props.active === "home" ? "#000" : "#6e6e6e"} name="home-outline" style={LocalStyles.icon} /></View>
                  <View>
                    <Text style={[LocalStyles.iconText, { color: this.props.active === "home" ? "#000" : "#6e6e6e" }]}>Home</Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Connect")}>
              <View style={[LocalStyles.centralFooterButton,Styles.alignments.row, Styles.alignments.horizontalCenter]}>
                <View style={{marginTop: 8}}>
                  <View style={Styles.alignments.row, Styles.alignments.horizontalCenter}><Icon fill={ this.props.active === "connect" ? "#000" : "#6e6e6e"} name="swap-outline" style={LocalStyles.icon} /></View>
                  <View>
                    <Text style={[LocalStyles.iconText, { color: this.props.active === "connect" ? "#000" : "#6e6e6e" }]}>Connect</Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Add")}>
              <View style={Styles.alignments.row, Styles.alignments.horizontalCenter}>
                <View style={{marginTop: 8}}>
                  <View style={Styles.alignments.row, Styles.alignments.horizontalCenter}><Icon fill={ this.props.active === "add" ? "#000" : "#6e6e6e"} name="plus-circle-outline" style={LocalStyles.icon} /></View>
                  <View>
                    <Text style={[LocalStyles.iconText, { color: this.props.active === "forum" ? "#000" : "#6e6e6e" }]}>Add New</Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            </Col>
            
          </Grid>
         </View>
        );   
    }
}
const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
  const LocalStyles = StyleSheet.create({
    centralFooterButton: {
       height: 52
    },
    icon: {
      width: 23,
      height: 23,
      marginTop: 3    },
    iconText: {
      fontFamily: "nunito",
      fontSize: 11
    },
    FootbarAction: {
        width: "100%",
        position: "absolute",
        backgroundColor: "white",
        height: 58,
        bottom: 0,
        left: 0,
        borderTopWidth: 1,
        borderTopColor: "#ecebeb"
    },
    addUpdate: {

    }
});
export default connect(mapStateToProps, mapDispatchToProps)(FootbarAction);

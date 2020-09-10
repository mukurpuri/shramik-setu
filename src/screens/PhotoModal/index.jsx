import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet,Dimensions } from 'react-native';
import { Text, Input, Button, Icon, Spinner } from '@ui-kitten/components';
import Image from 'react-native-scalable-image';
import Styles from '../../styles';
import { Col, Row, Grid } from "react-native-easy-grid";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getProfilePicture } from '../../utilities/helpers'
class PhotoModal extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
          spinner: false
        }
    }
    
    render() {
        return (
          <View style={LocalStyles.modal}>
            <View style={LocalStyles.header}>
              <Grid>
              <Col style={{ justifyContent: "center",alignItems: "center", paddingTop: 10}} size={10}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Console")}>
                  <Icon name="arrow-back-outline" fill="#FFF" style={{width: 30, height: 30}}/>
                </TouchableOpacity>
              </Col>
              <Col style={{justifyContent: "center",alignItems: "center", paddingTop: 10}} size={10}>
                <Image style={{borderRadius:500}} source={getProfilePicture(this.props.route.params.pic)} width={30} />
              </Col>
              <Col style={{justifyContent: "center",paddingTop: 10}}  size={60}>
                <Text style={{fontFamily: "nunito-bold", fontSize: 20, color: "#fff"}}>{this.props.route.params.name}</Text>
              </Col>
              </Grid>
            </View>
            <Image source={this.props.route.params.imageSource} width={Dimensions.get('window').width - 0} />
          </View>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    header: {
      width: "100%",
      position: "absolute",
      height: 70,
      backgroundColor: "#000",
      top: 0,
    },
    modal: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000"
    }
});
  
export default PhotoModal;


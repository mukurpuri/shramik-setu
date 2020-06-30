import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

class Pill extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={[LocalStyles.pill, this.props.active ? LocalStyles.active : {} ]}><Text style={this.props.active ? { color: "white"} : {color: "#333"}} category="h6">{this.props.text}</Text></View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    pill: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 5,
      paddingBottom: 5,
      borderRadius: 50,
      marginBottom: 15,
      borderColor: "#ccc",
      borderStyle: "solid",
      borderWidth: 1,
      marginRight: 20,
    },
    active: {
        color: "white",
        backgroundColor: "#09F",
        borderColor: "#09F",
    }
  });
export default Pill;

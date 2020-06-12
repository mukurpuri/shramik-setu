import React from 'react';
import { SafeAreaView, View, KeyboardAvoidingView, ScrollView  } from 'react-native';

class Wrapper extends React.Component {
    render() {
        //this.props.navigation.navigate('Details');
        return (
          <KeyboardAvoidingView  style={Styles.wrapper}>
          <ScrollView>
            <SafeAreaView>
              <View>
                {this.props.children}
              </View>
            </SafeAreaView>
          </ScrollView>
          </KeyboardAvoidingView>
        );   
    }
}
const Styles = { 
  wrapper: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 30,
        backgroundColor: "white",
        height: "100%",
        flex: 1
    }
}
export default Wrapper;


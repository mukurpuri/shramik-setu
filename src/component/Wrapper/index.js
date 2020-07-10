import React from 'react';
import { SafeAreaView, View, KeyboardAvoidingView, ScrollView  } from 'react-native';

export default function Wrapper(props) {
  return (
    <KeyboardAvoidingView  style={Styles.wrapper, {
      position: "relative",
      minHeight: "100%",
      paddingLeft: props.paddLeft || 0,  
      paddingRight: props.paddRight || 0,
      backgroundColor: props.bg || "white"}}>
    <ScrollView>
      <SafeAreaView>
        <View>
          {props.children}
        </View>
      </SafeAreaView>
    </ScrollView>
    </KeyboardAvoidingView>
  );   
}

const Styles = { 
  wrapper: {
        paddingTop: 30,
        flex: 1
    }
}


import React, { useState, useEffect } from 'react';
import { StyleSheet,SafeAreaView, View, TouchableOpacity } from 'react-native';
import Language from '../config/languages/Language'
import { IndexPath, Layout, Select, SelectItem, Menu, MenuItem, Input, Icon, Text, Button } from '@ui-kitten/components';
import _ from 'lodash';
import Styles from '../styles';

const CardContainer = props => {
  return (
    <View style={{
      paddingLeft: props.paddLeft || 0,  
      paddingBottom: props.paddBottom || 0,  
      paddingRight: props.paddRight || 0,
      marginTop: props.MarginTop || 0,  
      marginBottom: props.MarginBottom || 0 }
      }>
      {props.children}
    </View>
  );
};

const Card = props => {
  return (
  <View style={{
    width: "100%",
    backgroundColor: props.plain ? "transparent" : "white",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: props.plain ? "transparent" : "#ecebeb" ,
    paddingBottom: props.paddBottom  || 0
    }
    }>
    <View style={{
      flexDirection: "row",
      paddingLeft: props.paddLeft || 0,  
      paddingRight: props.paddRight || 0,
      paddingTop: props.paddTop || 0,  
      paddingBottom: props.paddBottom || 0}}>
      <View>
        <Icon style={{width: 15, height: 15, top:2}} fill="#444" name={props.icon}/>
      </View>
      <Text style={Styles.typograhy.cardHeaderTitle}>{props.header}</Text>
    </View>
    {
      !props.noHeader ?
      <React.Fragment>
      <View style={{backgroundColor: "#ecebeb", height: 1, width: "100%"}}></View>
      <View style={{
        paddingLeft: props.paddLeft || 0,  
        paddingRight: props.paddRight || 0,
        paddingTop: props.paddTop || 0,  
        paddingBottom: props.paddBottom || 0}}>
        {props.children}
        </View></React.Fragment> : null
    }
    
  </View>)
}

export { CardContainer, Card }
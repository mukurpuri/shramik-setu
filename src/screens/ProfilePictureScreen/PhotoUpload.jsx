import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Radio, RadioGroup, Text, Input, Button, Icon, Spinner, TopNavigation, Divider } from '@ui-kitten/components';

import { Col, Row, Grid } from "react-native-easy-grid";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import Styles from '../../styles';
import { Camera } from 'expo-camera';
import { RightIcon } from '../../component/Icons';

import Language from '../../config/languages/Language';
import { CheckIcon } from '../../component/Icons';

export default function PhotoUpload(props) {
    const [image, setImage] = useState(null);
  
    useEffect(() => {
      (async () => {
        if (Constants.platform.ios) {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    const submitImage = () => {
      props.saveDisplayPicture();
    }
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        if(result.type === "image") {
          props.setProfileImage(result)
        }
      }
    };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={LocalStyles.profilePicture}>
          {
            props.uri ?
            <React.Fragment>
              <TouchableOpacity onPress={pickImage} >
                <Image source={{ uri: props.uri}} style={LocalStyles.innerCanvas}></Image>
              </TouchableOpacity>
            </React.Fragment>
            :
            <React.Fragment>
            <TouchableOpacity onPress={pickImage} >
              <View style={LocalStyles.innerCanvas}>
                <Icon style={LocalStyles.icon} fill='#8F9BB3' name='person-add-outline'/>
              </View>
              </TouchableOpacity>
            </React.Fragment>
          }
        </View>
        <View style={[Styles.alignments.row,  Styles.alignments.horizontalCenter,Styles.spacings.mTopSmall, {width: 240}]}>
          {
            props.uri ?
            <Button onPress={submitImage}  style={Styles.alignments.full} size="large" status="danger">SET AS PROFILE PICTURE</Button>
            : 
            <Button onPress={pickImage} style={Styles.alignments.full} onPress={pickImage} size="large" status="danger">CHOOSE FROM PHONE</Button>
          }
        </View>
        {/* {
          <Button onPress={submitImage} style={Styles.spacings.mTopMedium} size="large" status="danger">SET AS PROFILE PICTURE</Button>
          !props.uri ? 
           : null
        } */}
        <View style={[Styles.alignments.row,  Styles.alignments.horizontalCenter, {marginTop: 120}]} >
          <TouchableOpacity onPress={() => props.skipLink()}>
            <Text style={{color: "#09F"}}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const LocalStyles = StyleSheet.create({
    profilePicture: {
      width: 240,
      height: 240,
      borderWidth: 1,
      borderColor: "#e2e2e2",
      borderRadius: 6,
      overflow: "hidden"
    },
    innerCanvas : {
      width: 220,
      height: 220,
      borderWidth: 1,
      borderColor: "#f1efef",
      top: 8.8,
      left: 8.8,
      backgroundColor: "#f3f3f3",
      justifyContent: "center",
      alignItems: "center"
    },
    icon: {
      width: 80,
      height: 80
    }
  });
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Icon, MenuItem, OverflowMenu,Spinner, TopNavigation, TopNavigationAction, Divider, Avatar } from '@ui-kitten/components';
import Image from 'react-native-scalable-image';


import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


import { TouchableOpacity } from 'react-native-gesture-handler';
import { getProfilePicture } from '../../utilities/helpers';



export default function ImageUploader(props) {

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
        quality: 1,
        allowsEditing: props.isEditable,
        aspect: props.isEditable ? [1, 1] : [0,0],
      });
      if (!result.cancelled) {
        if(result.type === "image") {
          props.setImage(result)
        }
      }
    };
    return (
    <View style={{justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity onPress={pickImage} style={[LocalStyles.imageUploader, { minHeight: props.minHeight, width: Dimensions.get("screen").width - props.width, backgroundColor: props.image.uri ? "#000" : "#fff"} ]}>
                    {
                      props.spinner ?
                      <Spinner
                        size="medium"
                        status="danger"
                      /> :
                      <View>
                        {
                            props.image.uri ? 
                            <Image source={{uri: props.image.uri }} width={Dimensions.get('window').width - 160} />: 
                            <React.Fragment>
                                <View style={{justifyContent: "center", alignItems: "center"}}>
                                    <Icon name="image-outline" style={{width: 60, height: 60}} fill="#999"/>
                                </View>
                                <View><Text style={LocalStyles.text}>Upload an Image</Text></View>
                            </React.Fragment>
                        }
                      </View>
                    }
                </TouchableOpacity>
        </View>
    );
}

const LocalStyles = StyleSheet.create({
   
    imageUploader: {
        bottom: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#efefef",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1, borderColor: "#ccc", borderStyle: "dashed", 
        borderRadius: 10,
        overflow: "hidden"
      },
      text:{
          fontSize: 19,
          fontFamily: "nunito-bold",
          color: "#999"
      }
});



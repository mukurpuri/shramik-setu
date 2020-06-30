import { Image }  from  'react-native';
import { getBackendAPI } from '../config/config';
import {DefaultPP} from '../config/Images';

export const isValidEmail = email => {
    let bool = false
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    bool = re.test(String(email).toLowerCase());
    return bool;
}

export const createFormData = (photo, body, name) => {
    const data = new FormData();
  
    data.append(name, {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    return data;
  };

  export const getProfilePicture = (id, size="lg") => {
    if(id) {
      let primaryLink = getBackendAPI() + "/uploads/avatars/responsive/" + id + "_" + size + ".png";
      console.log(primaryLink);
      return { uri: primaryLink };
    }  else {
      return DefaultPP;
    }
  };
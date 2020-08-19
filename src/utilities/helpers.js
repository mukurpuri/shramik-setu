import { Image }  from  'react-native';
import { getBackendAPI } from '../config/config';
import { DefaultPP, DefaultPPShop } from '../config/Images';

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
      return { uri: primaryLink };
    }  else {
      return DefaultPP;
    }
  };

  export const getProfilePictureShop = (id, size="lg") => {
    if(id) {
      let primaryLink = getBackendAPI() + "/uploads/avatars/responsive/" + id + "_" + size + ".png";
      return { uri: primaryLink };
    }  else {
      return DefaultPPShop;
    }
  };

  export const optimizeName = (name) => {
    let nameArray = name.split(" ");
        switch(nameArray.length) {
            case 1:
            return name;

            case 2:
            if(nameArray[0].length > 10)  {
                return nameArray[0]
            }
            return name;

            case 3:
            return nameArray[0]
        }
      return name;
  };

  export const HTMLizer = (str) => {
      return str;
  };

  
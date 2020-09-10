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

  export const getAllEmojis = () => {
    return{
      "smiles": ["🤝","🙏","👎","👍","👌","👋","😀","🤣","😂","🙂","🙃","😉","😊","😇","🤩","😘","😗","😚","😛","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","😵","🤯","🤠","😎","🤓","🧐","😕","😟","🙁","😮","😯","😲","😳","😦","😧","😨","😰","😥","😢","😭","😱","😖","😫","😠"]
    }
  }

  export const HTMLizer = (str) => {
      return str;
  };

  export const getTimeAMPMFormat = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours; // appending zero in the start if hours less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  };

  
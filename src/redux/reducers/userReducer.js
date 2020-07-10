import _ from 'lodash';
import { userService  } from '../../config/authentications';
;
const initialState = {
    user: {
      name: null,
      phoneNumber: null,
      token: null,
      isRegistered: null,
      id: null,
      imageID: null
    }
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'OTP_STATUS': {
          return {
            ...state,
          }
        }

        case 'SEND_OTP_STATUS': {
          return {
            ...state,
            user: setUserMobileNumber(state.user, action.phoneNumber),
          }
        }

        case 'SET_USER': {
          return {
            ...state,
            user: setUser(state.user, action.data),
          }
        }

        case 'SET_USER_LOGOUT': {
          return {
            ...state,
            user: setUserLogout(state.user),
          }
        }

        case 'SET_USER_NAME': {
          return {
            ...state,
            user: setUserName(state.user, action.name)
          }
        }

        case 'SET_USER_IMAGE': {
          return {
            ...state,
            user: setUserImage(state.user, action.id)
          }
        }

        default: {
            return state;
        }
    }
}
function setUserMobileNumber(data, phoneNumber) {
  const newData = Object.assign({}, data);
  newData.phoneNumber = phoneNumber;
  return newData;
}
function setUser(user, data) {
  const newUser = Object.assign({}, user);
  newUser.name = data?.name;
  newUser.phoneNumber = data?.phoneNumber;
  newUser.token = data?.token;
  newUser.id = data?.id;
  newUser.isRegistered = data?.isRegistered;
  return newUser;
}

function setUserLogout(user) {
  const newUser = Object.assign({}, user);
    newUser.name = null;
    newUser.phoneNumber = null;
    newUser.token = null;
    newUser.isRegistered = null;
  return newUser;
}
function setUserName(user,name) {
  const newUser = Object.assign({}, user);
  newUser.name = name;
  newUser.isRegistered = true;
  return newUser;
}
function setUserImage(user, id) {
  const newUser = Object.assign({}, user);
  newUser.imageID = id;
  return newUser;
}
export default userReducer;
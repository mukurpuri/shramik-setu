import axios from 'axios';
import { getBackendAPI } from '../config/config';
import { userService } from '../config/authentications';

export const SendOTPToLogin = phoneNumber => {
    return axios.post( getBackendAPI() +'/user/login',{ 
      "phoneNumber": phoneNumber
    })
    .then(function (response) {
      // handle success
      return response;
    })
    .catch(function (error) {
      // handle error
      return error;
    })
    .then(function (status) {
      return status;
    })
}

export const SubmitOTPToLogin = (OTP, phoneNumber) => {
  return axios.post( getBackendAPI() +'/user/otp-submit',{ 
    "OTP": OTP,
    "phoneNumber": phoneNumber
  })
  .then(function (response) {
    // handle success
    return response;
  })
  .catch(function (error) {
    // handle error
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const SubmitUserProfile = (profile) => {
  return axios.post( getBackendAPI() +'/user/submit-profile',{ profile })
  .then(function (response) {
    // handle success
    return response;
  })
  .catch(function (error) {
    // handle error
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const GetMyData = (OTP, phoneNumber) => {
  var config = {
    headers: { 'Authorization': userService.getToken() }
  }
  return axios.get( getBackendAPI() +'/user/c/get-me', config)
  .then(function (response) {
    // handle success
    return response;
  })
  .catch(function (error) {
    // handle error
    return error;
  })
  .then(function (status) {
    return status;
  })
}
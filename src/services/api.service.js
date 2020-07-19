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
      return error;
    })
    .then(function (status) {
      return status;
    })
    return null;
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

export const CreateCompany = data => {
  return axios.post( getBackendAPI() + '/company/register', { data })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const CreateLocal = data => {
  return axios.post( getBackendAPI() + '/user/local/register', { data })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
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

export const UploadUserImage = (formData) => {
  return axios.post( 
      getBackendAPI() + '/user/upload-profile-picture', 
      formData,
      { 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      }
  )
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const UpdateUserImage = (imageID, phoneNumber) => {
  return axios.post( 
      getBackendAPI() + '/user/save-user-image', 
      {imageID, phoneNumber},
      { 
        headers: {
          Accept: 'application/json',
        }
      }
  )
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}
export const GetDashboardData = data => {
  return axios.get( 
      getBackendAPI() + '/user/dashboard', 
      {
        params: data
      },
      { 
        headers: {
          Accept: 'application/json',
        }
      }
  )
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}
export const GetProfileData = phoneNumber => {
  let data = {
    phoneNumber
  }
  return axios.get( 
    getBackendAPI() + '/user/profile', 
    {
      params: data
    },
    { 
      headers: {
        Accept: 'application/json',
      }
    }
)
.then(function (response) {
  return response;
})
.catch(function (error) {
  console.log(error)
  return error;
})
.then(function (status) {
  return status;
})
}
export const SubmitQuestion = question => {
  return axios.post( getBackendAPI() + '/qa/create-question', { question })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const GetQuestion = (id, userId, clientId) => {
  return axios.get( getBackendAPI() + '/qa/question', {
    params: { id, userId, clientId }
  })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const SetQuestionReaction = data => {
  return axios.post( getBackendAPI() + '/qa/question-reaction', data)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const SetAnswerReaction = data => {
  return axios.post( getBackendAPI() + '/qa/answer-reaction', data)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const SubmitAnswerToQuestion = data => {
  return axios.post( getBackendAPI() + '/qa/submit-answer', data)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const SaveComment = data => {
  return axios.post( getBackendAPI() + '/qa/comment', data)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const GetNotifications = (userId) => {
  return axios.get( getBackendAPI() + '/user/notifications', {
    params: { userId }
  })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}
export const GetUpdates = (userId) => {
  return axios.get( getBackendAPI() + '/user/getUpdates', {
    params: { userId }
  })
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}

export const GetQuestionsByType = (type) => {
  return axios.post( getBackendAPI() + '/qa/getQuestions', {type})
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    return error;
  })
  .then(function (status) {
    return status;
  })
}


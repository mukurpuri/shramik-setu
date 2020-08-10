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

export const UpdateUserImage = (imageID, id) => {
  return axios.post( 
      getBackendAPI() + '/user/save-user-image', 
      {imageID, id},
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
export const GetProfileData = id => {
  let data = {
    id
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

export const GetProfile = id => {
  console.log(id)
  return axios.get( getBackendAPI() + '/user/getProfile', { params: { id }})
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

export const SubmitProfile = data => {
  return axios.post( getBackendAPI() + '/user/submit-edited-profile', data)
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

export const AddressFromCurrentLocation = coordinates => {
  return axios.post( getBackendAPI() + '/user/get-address-from-coordinates', coordinates)
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
export const FetchShopCategories = () => {
  return axios.get( getBackendAPI() + '/shop/categories')
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


export const SetupShop = data => {
  return axios.post( 
      getBackendAPI() + '/shop/set-up-shop', 
      {data},
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

export const getOtherAccounts = userID => {
  return axios.get( getBackendAPI() + '/user/get-acccounts', { params: userID})
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

export const getShop = params => {
  return axios.get( getBackendAPI() + '/shop/get', { params: params})
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
export const AddReviewToShop = data => {
  return axios.post( getBackendAPI() + '/shop/add-review', data)
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

export const EntityToSave = data => {
  return axios.post( getBackendAPI() + '/user/save-node', data)
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

export const EntityToDelete = data => {
  return axios.post( getBackendAPI() + '/user/delete-node', data)
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

export const HideShop = data => {
  return axios.post( getBackendAPI() + '/shop/hide-shop', data)
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

export const DeactivateShop = data => {
  return axios.post( getBackendAPI() + '/shop/deactivate-shop', data)
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

export const DeleteShop = data => {
  return axios.post( getBackendAPI() + '/shop/delete-shop', data)
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


export const BlockShop = (data) => {
  return axios.post( getBackendAPI() +'/shop/block',{ data })
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

export const UnblockShop = (data) => {
  return axios.post( getBackendAPI() +'/shop/unblock',{ data })
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

export const ReportShop = (data) => {
  return axios.post( getBackendAPI() +'/shop/report',{ data })
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
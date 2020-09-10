import axios from 'axios';
import { getBackendAPI, EXPO_PUSH_API } from '../config/config';
import { userService } from '../config/authentications';

export const SEND_NOTIFICATIOIN = async data => {
        return await fetch(EXPO_PUSH_API(), {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
}

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

export const KillNotification = id => {
  return axios.post( getBackendAPI() + '/user/kill-notification', {id})
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

export const GetPeopleData = (data) => {
  return axios.post( getBackendAPI() +'/user/connect/people',{ data })
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

export const SetUpUserLocation = data => {
  return axios.post( getBackendAPI() +'/user/set-location',{ data })
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

export const GetShopData = (data) => {
  return axios.post( getBackendAPI() +'/user/connect/shops',{ data })
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

export const GetAllAccounts = (id) => {
  return axios.post( getBackendAPI() +'/user/getAllAccounts',{ id })
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

export const SaveToList = data => {
  return axios.post( getBackendAPI() +'/user/save-to-list', {data})
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

export const GetSaveInfo = data => {
  return axios.post( getBackendAPI() +'/user/get-save-info', data)
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


export const HideUser = data => {
  return axios.post( getBackendAPI() +'/user/hide', data)
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

export const UnHideUser = id => {
  return axios.post( getBackendAPI() +'/user/unHide', {id})
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

export const BlockUser = data => {
  return axios.post( getBackendAPI() +'/user/block', data)
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

export const UnBlockUser = id => {
  return axios.post( getBackendAPI() +'/user/unBlock', {id})
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

export const MuteUser = data => {
  return axios.post( getBackendAPI() +'/user/mute', data)
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

export const UnMuteUser = data => {
  return axios.post( getBackendAPI() +'/user/unMute', data)
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

export const ReportUser = data => {
  return axios.post( getBackendAPI() +'/user/report', data)
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

export const GetMyList = id => {
  return axios.post( getBackendAPI() +'/user/myList', { id })
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

export const GetSaveData = id => {
  return axios.post( getBackendAPI() +'/user/mySave', { id })
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

export const RemoveSave = id => {
  return axios.post( getBackendAPI() +'/user/remove-save', { id })
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


export const SetSaveRequest = data => {
  return axios.post( getBackendAPI() +'/user/set-save-request', { data })
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



export const GetAllMessages = id => {
  return axios.post( getBackendAPI() +'/user/messages', { id })
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

export const AllowSave = id => {
  return axios.post( getBackendAPI() +'/user/allow-save', { id })
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

export const CancelSave = id => {
  return axios.post( getBackendAPI() +'/user/remove-save', { id })
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

export const SendMessage = data => {
  return axios.post( getBackendAPI() +'/user/create-message', { data })
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

export const GetMessages = data => {
  return axios.post( getBackendAPI() +'/user/get-messages', { data })
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

export const GetLatestMessage = data => {
  return axios.post( getBackendAPI() +'/user/get-latest-message', { data })
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

export const SeenMessage = id => {
  return axios.post( getBackendAPI() +'/user/seen-message', {id})
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

export const UploadImage = (formData) => {
  return axios.post( 
      getBackendAPI() + '/user/upload-image', 
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

export const CreateBanner = data => {
  return axios.post( getBackendAPI() +'/shop/create-banner', {data})
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

export const GetMyBanners = data => {
  return axios.post( getBackendAPI() +'/shop/get-banners', {data})
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

export const RemoveBanner = id => {
  return axios.post( getBackendAPI() +'/shop/remove-banner', { id })
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

export const HideBanner = data => {
  return axios.post( getBackendAPI() +'/shop/hide-banner', { data })
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


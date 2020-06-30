import axios from 'axios';
import { getBackendAPI } from '../../config/config';
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const OTPStatus = status => ({
    type: 'OTP_STATUS',
    status: status
});


export const SubmitMobileNumberStatus = phoneNumber => ({
    type: 'SEND_OTP_STATUS',
    phoneNumber: phoneNumber
});

export const SetUser = data => ({
    type: 'SET_USER',
    data: data
});

export const setUserName = name => {
    return ({
        type: 'SET_USER_NAME',
        name: name
    })
}

export const setUserImage = id => {
    return ({
        type: 'SET_USER_IMAGE',
        id: id
    })
}

export const UserLogout = () => {
    return ({
        type: 'SET_USER_LOGOUT'
    })
    
}


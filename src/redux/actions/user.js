import axios from 'axios';
import { getBackendAPI } from '../../config/config';
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const OTPStatus = status => ({
    type: 'OTP_STATUS',
    status: status
});


export const SubmitMobileNumberStatus = (status, phoneNumber) => ({
    type: 'SEND_OTP_STATUS',
    status: status,
    phoneNumber: phoneNumber
});

export const SetUser = (token, id, isRegistered) => ({
    type: 'SET_USER',
    params: {
        token,
        id,
        isRegistered
    }
});


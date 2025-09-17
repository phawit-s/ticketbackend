"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsmsOTP = requestsmsOTP;
exports.checksmsOTP = checksmsOTP;
const otp = require('otp-generator');
const axios = require('axios');
const sms_api_key = process.env.SMS_APIKEY;
const sms_secret_key = process.env.SMS_APISECRET;
const sms_otp_project_key = process.env.SMS_PROJECTKEY;
async function generateOTP(range) {
    return otp.generate(range, {
        digits: true,
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
    });
}
async function generateREF(range) {
    return otp.generate(range, {
        digits: false,
        specialChars: false,
        lowerCaseAlphabets: true,
        upperCaseAlphabets: true,
    });
}
async function requestsmsOTP(phone) {
    try {
        const config = {
            method: 'post',
            url: 'https://portal-otp.smsmkt.com/api/otp-send',
            headers: {
                'Content-Type': 'application/json',
                api_key: sms_api_key,
                secret_key: sms_secret_key,
            },
            data: JSON.stringify({
                project_key: sms_otp_project_key,
                phone: phone,
            }),
        };
        const getOtp = await axios(config);
        const res = await getOtp.data;
        if (res.code === '000') {
            return res.result;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log('error at sms send otp');
        return null;
    }
}
async function checksmsOTP(otp, otpkey, refcode) {
    try {
        const config = {
            method: 'post',
            url: 'https://portal-otp.smsmkt.com/api/otp-validate',
            headers: {
                'Content-Type': 'application/json',
                api_key: sms_api_key,
                secret_key: sms_secret_key,
            },
            data: JSON.stringify({
                token: otpkey,
                otp_code: otp,
                ref_code: refcode,
            }),
        };
        const valid = await axios(config);
        const resvalid = valid.data;
        console.log(resvalid, 'resvalid');
        if (resvalid.code === '000' && resvalid.result.status === true) {
            return true;
        }
        if (resvalid.code === '000' && resvalid.result.status === false) {
            return false;
        }
        else {
            return resvalid.code;
        }
    }
    catch (error) {
        console.log('error at valid otp');
        return false;
    }
}
//# sourceMappingURL=sms.js.map
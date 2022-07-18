import { mergeNameSpace } from '@/utils/utils';
import {
  NS_AUTH,
  DO_LOGIN,
  SAVE_AUTH_DATA,
  GET_USER_PROFILE,
  SAVE_USER_PROFILE,
  REFRESH_TOKEN,
  LOGOUT,
  GET_QR_CODE,
  SET_QR_CODE,
  VERIFY_2FA_CODE,
  CLEAR_AUTH_DATA,
  DISABLE_2FA,
  FORGOT_PASSWORD,
  RESET_FORGOT_PASSWORD,
  SET_FILL_USERNAME,
  RESET_FILL_USERNAME,
  CHANGE_PASSWORD,
  GET_USER_IP_ADDRESS,
  DO_REGISTER,
  VERIFY_MAIL,
  SET_TOKEN_REGISTER,
  SET_MESSAGE_VERIFY_MAIL,
  GET_AVAILABLE_BALANCE,
  SET_AVAILABLE_BALANCE,
  TRANSFER_BET_TO_ANOTHTER,
  GET_DEPOSIT_ADDRESS,
  SET_DEPOSIT_ADDRESS,
  WITHDRAW_ACTION,
} from './constants';

const merge = mergeNameSpace(NS_AUTH);

export const doLoginAction = (payload) => {
  return ({
    type: merge(DO_LOGIN),
    payload,
  })
};

export const saveAuthData = (payload) => ({
  type: merge(SAVE_AUTH_DATA),
  payload,
});

export const getUserProfile = (payload) => ({
  type: merge(GET_USER_PROFILE),
  payload,
});

export const saveUserProfile = (payload) => ({
  type: merge(SAVE_USER_PROFILE),
  payload,
});

export const refreshToken = (payload) => ({ type: merge(REFRESH_TOKEN), payload });
export const logOutAction = (payload) => ({ type: merge(LOGOUT), payload });

export const getQrCodeAction = (payload) => ({
  type: merge(GET_QR_CODE),
  payload,
});

export const setQrCodeAction = (payload) => ({
  type: merge(SET_QR_CODE),
  payload,
});

export const verify2FACodeAction = (payload) => ({
  type: merge(VERIFY_2FA_CODE),
  payload,
});

export const clearAllAuthDataAction = () => ({
  type: merge(CLEAR_AUTH_DATA),
});

export const disableTFAAction = (payload) => ({
  type: merge(DISABLE_2FA),
  payload,
});

export const forgotPasswordAction = (payload) => ({
  type: merge(FORGOT_PASSWORD),
  payload,
});

export const resetForgotPasswordAction = (payload) => ({
  type: merge(RESET_FORGOT_PASSWORD),
  payload,
});

export const changePasswordAction = (payload) => ({
  type: merge(CHANGE_PASSWORD),
  payload,
});

export const setFillUsername = (payload) => ({
  type: merge(SET_FILL_USERNAME),
  payload,
});

export const resetFillUsername = () => ({
  type: merge(RESET_FILL_USERNAME),
});

export const getUserIpAddress = () => ({
  type: merge(GET_USER_IP_ADDRESS),
});

export const doRegisterAction = (payload) => ({
  type: merge(DO_REGISTER),
  payload,
});

export const doVerifyMailAction = (payload) => ({
  type: merge(VERIFY_MAIL),
  payload,
});

export const setTokenRegisterAction = (payload) => ({
  type: merge(SET_TOKEN_REGISTER),
  payload,
});

export const setMessageVerifyMailAction = (payload) => ({
  type: merge(SET_MESSAGE_VERIFY_MAIL),
  payload,
});

export const setAvailableBalance = (payload) => ({
  type: merge(SET_AVAILABLE_BALANCE),
  payload,
});

export const getAvailableBalance = (payload) => ({
  type: merge(GET_AVAILABLE_BALANCE),
  payload,
});

export const transferBetToAnother = (payload) => ({
  type: merge(TRANSFER_BET_TO_ANOTHTER),
  payload,
});

export const getDepositAddressAction = (payload) => ({
  type: merge(GET_DEPOSIT_ADDRESS),
  payload,
});

export const setDepositAddressAction = (payload) => ({
  type: merge(SET_DEPOSIT_ADDRESS),
  payload,
});

export const withdrawAction = (payload) => ({
  type: merge(WITHDRAW_ACTION),
  payload,
});

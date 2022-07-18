import { history, getDvaApp } from 'umi';
import {
  hasResponseError,
  setCookie,
  getCookie,
  delay,
  deleteAllCookies,
  isIpAddressValid,
} from '@/utils/utils';
import Logger from '@/utils/Logger';
import {
  authenticateService,
  getProfileService,
  refreshTokenService,
  forgotPasswordService,
  resetForgotPasswordService,
  getIPAddress,
  registerService,
  verifyMailService,
  getAvailableBalanceService,
  transferBetToAnotherService,
  getUserWalletService,
  withdrawService,
} from '@/services/auth';
import {
  getQrCodeServices,
  verifyTwoAuthTokenService,
  disableTwoAuthTokenService,
} from '@/services/twoAuth';

import { handleNotification } from '@/models/global';
import { batchNotification, notifyInstant } from '@/utils/notification';

import {
  DO_LOGIN,
  GET_USER_PROFILE,
  REFRESH_TOKEN,
  LOGOUT,
  GET_QR_CODE,
  VERIFY_2FA_CODE,
  DISABLE_2FA,
  FORGOT_PASSWORD,
  RESET_FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  GET_USER_IP_ADDRESS,
  DO_REGISTER,
  VERIFY_MAIL,
  GET_AVAILABLE_BALANCE,
  TRANSFER_BET_TO_ANOTHTER,
  GET_DEPOSIT_ADDRESS,
  WITHDRAW_ACTION,
} from './constants';
import { COOKIE_NAMES, EVENT_EMITTER_NAMES } from '@/utils/constants';
import {
  saveUserProfile,
  getUserProfile,
  setQrCodeAction,
  logOutAction,
  clearAllAuthDataAction,
  setFillUsername,
  resetFillUsername,
  setMessageVerifyMailAction,
  setAvailableBalance,
  setDepositAddressAction,
} from './actions';
import { selCurrentAvailableBalance } from './selectors';
import { notification } from 'antd';
import { isEmpty } from 'underscore';
import { useModel } from 'umi';
const saveToken = (payload) => {
  const { access_token, refresh_token, userName } = payload;
  if (access_token) {
    setCookie(COOKIE_NAMES.ID_TOKEN, access_token, 1);
  }
  if (refresh_token) {
    setCookie(COOKIE_NAMES.REFRESH_TOKEN, refresh_token, 1);
  }
  // if (role) {
  //   setCookie(COOKIE_NAMES.USER_ROLE, role, 1);
  // }
  if (userName) {
    setCookie(COOKIE_NAMES.USERNAME, userName, 1);
  }
};

const saveInfoUser = (payload) => {
  const { email, fullName, userName, role } = payload;
  if (role) {
    setCookie(COOKIE_NAMES.USER_ROLE, role, 1);
  }
  if (userName) {
    setCookie(COOKIE_NAMES.USERNAME, userName, 1);
  }
  if (userName) {
    setCookie(COOKIE_NAMES.FULLNAME, fullName, 1);
  }
  if (userName) {
    setCookie(COOKIE_NAMES.EMAIL, email, 1);
  }
}

export const handleGetProfile = async () => {
  const idToken = getCookie(COOKIE_NAMES.ID_TOKEN);
  const userName = getCookie(COOKIE_NAMES.USERNAME);
  const role = getCookie(COOKIE_NAMES.USER_ROLE);
  const email = getCookie(COOKIE_NAMES.EMAIL);
  if (!idToken) return null;

  //TODO: Have token before. Need to check expired token and user role for phase 2.

  const responseProfile = await getProfileService();
  const hasError = hasResponseError(responseProfile, handleNotification, responseProfile);
  if (hasError) {
    //TODO: need to show notification to tell user login again
    return null;
  }
  else {
    return { userName, role, email };
  }
};

// export const getCurrentUserIpAddress = async () => {
//   const ipAddressLocal = getCookie(COOKIE_NAMES.IP_ADDRESS);
//   if (ipAddressLocal) {
//     return ipAddressLocal;
//   } else {
//     const ipAddress = await getIPAddress();
//     if (isIpAddressValid(ipAddress)) {
//       setCookie(COOKIE_NAMES.IP_ADDRESS, ipAddress, 24);
//       return ipAddress;
//     }
//   }
// };

export const handleRefreshToken = async () => {
  try {
    if (!getCookie(COOKIE_NAMES.REFRESH_TOKEN)) return;

    const response = await refreshTokenService();
    const hasError = hasResponseError(response, handleNotification, response);

    if (hasError) {
      const dva = getDvaApp();
      if (dva && dva?._store) {
        const { dispatch } = getDvaApp()?._store;
        dispatch(logOutAction());
      } else {
        deleteAllCookies();
        window.location.href = '/';
      }
      return;
    }
    const userName = getCookie(COOKIE_NAMES.USERNAME);
    saveToken({ ...response, userName });
    EventEmitter.dispatch(EVENT_EMITTER_NAMES.REFRESH_TOKEN);
  } catch (error) {
    EventEmitter.dispatch(EVENT_EMITTER_NAMES.REFRESH_TOKEN);
    Logger.error(`AUTH/REFRESH_TOKEN`, error);
  } finally {
    window.isTokenRefreshing = false;
  }
};

const effects = {
  *[DO_LOGIN]({ payload }, { call, put, all }) {
    try {
      console.log(payload);
      // const { values } = payload;
      const params = {
        password: 'P@ssw0rd',
        userName: 'admin',
      };

      const response = yield call(authenticateService, params);
      const hasError = hasResponseError(response, handleNotification, response);
      if (hasError) return;
      const { access_token } = response;
      if (isEmpty(access_token)) {
        return;
      } else {
        saveToken({ ...response, userName: payload.userName })
        yield put(saveUserProfile(response));
        yield put(getUserProfile());
      }
    } catch (error) {
      console.log(error);
      Logger.error('auth/DO_LOGIN', error);
    } finally {
    }
  },

  *[GET_USER_PROFILE]({ payload }, { call, put }) {
    try {
      console.log(1)
      const response = yield call(getProfileService);
      if (hasResponseError(response)) return;
      saveInfoUser(response.result)
      yield put(saveUserProfile(response.result));
      history.push('/');
    } catch (error) {
      Logger.error('auth/GET_USER_PROFILE', error);
    } finally {
    }
  },

  *[REFRESH_TOKEN]() {
    yield handleRefreshToken();
  },

  // *[GET_USER_IP_ADDRESS]() {
  //   yield getCurrentUserIpAddress();
  // },

  *[LOGOUT]({ payload = {} }, { put }) {
    yield delay(0);
    yield put(clearAllAuthDataAction());
    deleteAllCookies();
    window.location.href = '/user/login';
    // const { callbackRedirect } = payload;
    // if (callbackRedirect) {
    //   callbackRedirect();
    // } else {
    //   window.location.href = '/user/login';
    // }
  },

  *[GET_QR_CODE]({ payload }, { call, put }) {
    try {
      const response = yield call(getQrCodeServices);
      const hasError = hasResponseError(response, handleNotification, response);
      if (hasError) return;
      yield put(setQrCodeAction(response || {}));
    } catch (error) {
      Logger.error('auth/GET_QR_CODE', error);
    } finally {
    }
  },

  *[DISABLE_2FA]({ payload }, { call, put }) {
    try {
      const { values, callback } = payload;
      const body = {
        code: values.twoFactorCode,
      };
      const response = yield call(disableTwoAuthTokenService, body);
      const hasError = hasResponseError(response, handleNotification, response);
      if (hasError) return;
      if (response === false) {
        notification.error({ message: 'Authentication code is incorect! Please try again' });
        return;
      } else {
        notification.success({
          message: 'Two-factor authentication has been disabled!',
        });
        setCookie(COOKIE_NAMES.USING_2FA, false);
        callback && callback();
      }
    } catch (error) {
      Logger.error('auth/GET_QR_CODE', error);
    } finally {
    }
  },

  *[VERIFY_2FA_CODE]({ payload }, { call, put }) {
    try {
      const body = {
        code: payload.twoFactorCode,
      };
      const response = yield call(verifyTwoAuthTokenService, body);
      const hasError = hasResponseError(response, handleNotification, response);
      if (hasError) return;
      if (response === false) {
        notification.error({ message: 'Authentication code is incorect! Please try again' });
        return;
      } else {
        notification.success({
          message: 'Enable Two-factor authentication successfully! Please try login again',
        });
        yield put(logOutAction({ callbackRedirect: () => history.replace('/user/login') }));
      }
    } catch (error) {
      Logger.error('auth/GET_QR_CODE', error);
    } finally {
    }
  },

  *[FORGOT_PASSWORD]({ payload }, { call, put }) {
    try {
      const { callback, values } = payload;
      const response = yield call(forgotPasswordService, values);
      const hasError = hasResponseError(response, handleNotification, response);
      if (hasError) return;
      callback && callback();
    } catch (error) {
      Logger.error('auth/FORGOT_PASSWORD', error);
    } finally {
    }
  },

  *[RESET_FORGOT_PASSWORD]({ payload }, { call, put }) {
    try {
      const { values } = payload;
      const response = yield call(resetForgotPasswordService, values);
      const hasError = hasResponseError(response, handleNotification, response);
      if (hasError) return;
      notification.success({
        message: 'Reset password successfully! Please try to login again.',
        duration: 5,
      });
      yield put(setFillUsername(response.userName));
      history.push('/user/login');
    } catch (error) {
      Logger.error('auth/FORGOT_PASSWORD', error);
    } finally {
    }
  },

  *[CHANGE_PASSWORD]({ payload }, { call, put }) {
    try {
      const { values, callback } = payload;
      const response = yield call(resetForgotPasswordService, values);
      const hasError = hasResponseError(response, handleNotification, {
        ...response,
        hideNotify: true,
      });
      if (hasError) {
        notifyInstant.error('Current information is incorrect');
        return;
      }
      notifyInstant.success('Change password successfully!');
      callback && callback();
    } catch (error) {
      Logger.error('auth/FORGOT_PASSWORD', error);
    } finally {
    }
  },

  // *[DO_REGISTER]({ payload }, { call, put }) {
  //   try {
  //     const ipAddress = yield getCurrentUserIpAddress();
  //     const { values, callback } = payload;
  //     const response = yield call(registerService, { ...values, ip: ipAddress });
  //     const hasError = hasResponseError(response, handleNotification, response);
  //     if (hasError) {
  //       const {
  //         errors: { status, errors },
  //       } = response;
  //       if (status === 400 && !isEmpty(errors)) {
  //         return batchNotification([{ message: errors[Object.keys(errors)][0], level: 'error' }]);
  //       }
  //       return;
  //     }
  //     const { data, message } = response;
  //     if (isEmpty(data)) {
  //       batchNotification([{ message: message, level: 'error' }]);
  //     } else {
  //       callback && callback();
  //       yield put(setFillUsername(values.userName));
  //       batchNotification([{ message: data, level: 'success' }], false, true, 0);
  //     }
  //   } catch (error) {
  //     Logger.error('register', error);
  //   } finally {
  //   }
  // },
  *[VERIFY_MAIL]({ payload }, { call, put }) {
    try {
      const response = yield call(verifyMailService, payload);
      const hasError = hasResponseError(response, handleNotification, response);
      if (hasError) {
        const {
          errors: { message },
        } = response;
        yield put(setMessageVerifyMailAction(message));
      } else {
        const { userName, message } = response;
        if (!isEmpty(userName)) {
          yield put(setFillUsername(userName));
        }
        yield put(setMessageVerifyMailAction(message));
      }
    } catch (error) {
      Logger.error('verify email', error);
    } finally {
    }
  },

  *[GET_AVAILABLE_BALANCE]({ payload }, { call, put, select }) {
    try {
      const response = yield call(getAvailableBalanceService);
      const hasError = hasResponseError(response, handleNotification, response);
      if (hasError || isEmpty(response?.data)) return;
      const availableBalance = yield select(selCurrentAvailableBalance);
      if (availableBalance.balance !== response.data?.balance) {
        yield put(setAvailableBalance(response.data));
      }
    } catch (error) {
      Logger.error('verify email', error);
    } finally {
    }
  },

  // *[TRANSFER_BET_TO_ANOTHTER]({ payload }, { call, put }) {
  //   try {
  //     const { values, callback } = payload;
  //     const ip = yield getCurrentUserIpAddress();
  //     const body = { ...values, ip, blockchain: 'bet' };
  //     const response = yield call(transferBetToAnotherService, body);
  //     const hasError = hasResponseError(response, handleNotification, response);
  //     if (hasError) return;

  //     notifyInstant.success('Transfer successfully!');
  //     callback && callback();
  //   } catch (error) {
  //     Logger.error('verify email', error);
  //   } finally {
  //   }
  // },

  // *[WITHDRAW_ACTION]({ payload }, { call, put }) {
  //   try {
  //     const { values, callback } = payload;
  //     const ip = yield getCurrentUserIpAddress();
  //     const body = { ...values, ip };
  //     const response = yield call(withdrawService, body);
  //     const hasError = hasResponseError(response, handleNotification, response);
  //     if (hasError) return;

  //     notifyInstant.success('Withdraw successfully!');
  //     callback && callback();
  //   } catch (error) {
  //     Logger.error('WITHDRAW_ACTION error', error);
  //   } finally {
  //   }
  // },

  *[GET_DEPOSIT_ADDRESS]({ }, { call, put }) {
    try {
      const response = yield call(getUserWalletService);
      const hasError = hasResponseError(response, handleNotification, response);
      if (hasError) return;

      yield put(setDepositAddressAction(response.data));
    } catch (error) {
      Logger.error('verify email', error);
    } finally {
    }
  },
};

export default effects;

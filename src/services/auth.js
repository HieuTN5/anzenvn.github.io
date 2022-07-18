import { request } from 'umi';

import { getCookie } from '@/utils/utils';
import { COOKIE_NAMES } from '@/utils/constants';

export function authenticateService(params) {
  return request(`${AUTH_API}/api/Account/login`, {
    method: 'POST',
    data: params,
  });
}

export function refreshTokenService() {
  return request(`${AUTH_API}/Accounts/refresh-token`, {
    method: 'POST',
    data: {
      token: getCookie(COOKIE_NAMES.REFRESH_TOKEN),
    },
    refreshToken: true,
  });
}

export function getProfileService(data) {
  return request(`${AUTH_API}/api/Account/get-user-profile`, {
    method: 'GET',
    data,
  });
}

export function forgotPasswordService(data) {
  return request(`${AUTH_API}/Accounts/forgot-password`, {
    method: 'POST',
    data,
  });
}

export function resetForgotPasswordService(data) {
  return request(`${AUTH_API}/Accounts/reset-password`, {
    method: 'POST',
    data,
  });
}

// export function getIPAddress() {
//   return request(PING_IP_SERVICE, {
//     method: 'GET',
//   });
// }

export function registerService(params) {
  return request(`${AUTH_API}/Accounts/register`, {
    method: 'POST',
    data: params,
  });
}

export function verifyMailService(params) {
  return request(`${AUTH_API}/Accounts/verify-email`, {
    method: 'POST',
    data: params,
  });
}

export function getAvailableBalanceService(params) {
  return request(`${APP_API}/user/available-balance`, {
    method: 'POST',
    data: params,
  });
}

export function transferBetToAnotherService(params) {
  return request(`${APP_API}/user/transaction/transfer`, {
    method: 'POST',
    data: params,
  });
}

export function withdrawService(params) {
  return request(`${APP_API}/user/transaction/withdraw`, {
    method: 'POST',
    data: params,
  });
}

export function getUserWalletService() {
  return request(`${APP_API}/user/wallet`, {
    method: 'POST',
  });
}

import { request } from 'umi';

export function getAllHistory(params) {
  return request(`${APP_API}/user/transaction/history`, {
    method: 'POST',
    data: params,
  });
}

export function getResendHistoryWithdraw(params) {
  return request(`${APP_API}/user/transaction/resend-mail`, {
    method: 'POST',
    data: params,
  });
}

export function cancelHistoryWithdraw(params) {
  return request(`${APP_API}/user/transaction/cancel`, {
    method: 'POST',
    data: params,
  });
}

export function getAllHistoryCommission(params) {
  return request(`http://ANZEN-portal-api-dev.azurewebsites.net/api/user/commisison`, {
    method: 'POST',
    data: params,
  });
}

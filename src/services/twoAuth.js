import { request } from 'umi';

export function getQrCodeServices() {
  return request(`${AUTH_API}/two-authen/qr-code`, {
    method: 'GET',
  });
}

export function verifyTwoAuthTokenService(params) {
  return request(`${AUTH_API}/two-authen/enable`, {
    method: 'POST',
    data: params,
  });
}

export function disableTwoAuthTokenService(params) {
  return request(`${AUTH_API}/two-authen/disable`, {
    method: 'POST',
    data: params,
  });
}

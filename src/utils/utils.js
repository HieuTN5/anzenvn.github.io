import { parse } from 'qs';
import { getDvaApp } from 'umi';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import numeral from 'numeral';
import { COOKIE_NAMES } from './constants';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { notification } from 'antd';


export const openNotificationError = (content) => {
  notification.open({
    message: "Thông báo",
    description: content,
    icon: <CloseOutlined style={{ color: 'red' }} />,
  });
};

export const openNotificationSuccess = (content) => {
  notification.open({
    message: "Thông báo",
    description: content,
    icon: <CheckOutlined style={{ color: 'green' }} />,
  });
};

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function computePaging({ pageSize, pageIndex, currentIndex }) {
  return (pageIndex - 1) * pageSize + 1 + currentIndex;
}

export const setCookie = (cookieName, cookieValue, expiresHour) => {
  const d = new Date();
  d.setTime(d.getTime() + expiresHour * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

export const getCookie = (cookieName) => {
  const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
  if (match) return match[2];
  return '';
};

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];

    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    if (name === COOKIE_NAMES.IP_ADDRESS) {
      continue;
    }
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

export const getStore = () => getDvaApp()?._store;

export function dispatchAction(action, ...params) {
  const store = getStore();
  store?.dispatch(action.call(null, ...params));
}

export function hasResponseError(response, action, ...params) {
  if (action) {
    dispatchAction(action, ...params);
  }
  const statusCode = _get(response, 'statusCode', null);
  const errors = _get(response, 'errors', []);

  const isHaveError = errors.length > 0;
  if (!statusCode && !isHaveError) {
    return false;
  }

  const isValidStatus = statusCode >= 200 && statusCode < 300;

  return !isValidStatus;
}

export const mergeNameSpace = (nameSpace) => (type) => `${nameSpace}/${type}`;

export const isEmpty = (value) => {
  if (typeof value === 'number') {
    return false;
  }
  return _isEmpty(value);
};

export const getSystemUserInfo = () => {
  return {
    userName: getCookie(COOKIE_NAMES.USERNAME),
    role: getCookie(COOKIE_NAMES.role),
  };
};

export const delay = (time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, time),
  );

export const addCommaThousand = (number = 0) => {
  if (isEmpty(number) || number === 0) return '0.00';
  // const result = number.toLocaleString();
  return number.toFixed(2);
};

export const isIpAddressValid = (ipAddress = '') => {
  // const regexIPv4 = '\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b';
  const splitDot = ipAddress.split('.');
  return splitDot.length > 2;
};

export const convertToTreesData = (data = []) => {
  const tree = [];
  const childOf = {};
  data.forEach((item) => {
    const { id, nodeLevel } = item;
    childOf[id] = childOf[id] || [];
    // eslint-disable-next-line no-param-reassign
    item.children = childOf[id];
    nodeLevel !== '0'
      ? (childOf[nodeLevel] = childOf[nodeLevel] || []).push(item)
      : tree.push(item);
  });
  return tree;
};

export const formatDecimal = (value, option) => {
  const option_ = option || {};
  option_.symbolThousand = ',';
  option_.symbolDigit = '.';
  if ([null, undefined].includes(option_.isShowDigit)) {
    option_.isShowDigit = false;
  }
  if ([null, undefined].includes(option_.digit)) {
    option_.digit = 2;
  }

  const { symbolThousand, symbolDigit, digit, isShowDigit } = option_;
  const optinalDigit = isShowDigit ? `${symbolDigit}` : `[${symbolDigit}]`; // [] : [.]
  const numDigit = ''.padStart(digit, '0'); // 00

  return numeral(value).format(`0${symbolThousand}0${optinalDigit}${numDigit}`); // 0,0[.]00
}

export const formatDecimal2 = (value, option) => {
  const option_ = option || {};
  option_.symbolThousand = ',';
  option_.symbolDigit = '.';
  if ([null, undefined].includes(option_.isShowDigit)) {
    option_.isShowDigit = false;
  }
  if ([null, undefined].includes(option_.digit)) {
    option_.digit = 2;
  }

  const { symbolThousand, symbolDigit, digit, isShowDigit } = option_;
  const optinalDigit = isShowDigit ? `${symbolDigit}` : `[${symbolDigit}]`; // [] : [.]
  const numDigit = ''.padStart(digit, '0'); // 00
  const numberFormat = numeral(value).format(`0${symbolThousand}0${optinalDigit}${numDigit}`);
  const stringNumber = numberFormat.toString();
  const number = stringNumber.substring(0, stringNumber.length - 1);
  return (value % 1 !== 0) ? number : numberFormat; // 0,0[.]00
}

export function formatNumber(value, option) {
  const option_ = option || {};
  option_.symbolThousand = ',';

  const { symbolThousand } = option_;
  return numeral(value).format(`0${symbolThousand}0`);
}

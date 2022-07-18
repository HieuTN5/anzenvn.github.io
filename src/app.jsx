import { history, getDvaApp, formatMessage } from 'umi';
import { notification, message } from 'antd';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import MenuItem from '@/components/MenuItem';
import LoadingPage from '@/components/LoadingPage';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import _get from 'lodash/get';

import { handleGetProfile, handleRefreshToken } from '@/stores/auth/effects';
import { saveUserProfile, logOutAction, getUserIpAddress } from '@/stores/auth/actions';
import { getCookie, dispatchAction, isEmpty, getSystemUserInfo } from '@/utils/utils';

import EventEmitter from '@/utils/eventEmitter';
import { REQUEST_TYPE_FORM, COOKIE_NAMES, EVENT_EMITTER_NAMES } from '@/utils/constants';

import LogoSrc from '@/assets/images/logo.png';

import defaultSettings from '../config/defaultSettings';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <LoadingPage />,
  settings: {
    collapsed: false,
  },
};

export async function getInitialState() {
  try {
    let settings = {};
    const idToken = getCookie(COOKIE_NAMES.ID_TOKEN);
    const userName = getCookie(COOKIE_NAMES.USERNAME);
    if (isEmpty(idToken) || isEmpty(userName)) {
      return {
        settings: { ...defaultSettings },
        currentUser: null,
      };
    }
    const currentUser = await handleGetProfile();
    if (currentUser?.userName) {
      setTimeout(() => {
        const { dispatch } = getDvaApp()?._store;
        dispatch(saveUserProfile(currentUser));
      });
    }
  } catch (error) {
    console.log(error);
    return {
      settings: { ...defaultSettings },
      currentUser: null,
    };
  }
  return {
    settings: { ...defaultSettings },
    currentUser: { ...getSystemUserInfo() },
  };
}

export const layout = (props) => {
  const { initialState } = props;
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: () => <Footer />,
    headerHeight: 80,
    onPageChange: (location) => {
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
      const el = document.scrollingElement || document.documentElement;
      if (el.scrollTop !== 0) {
        el.scrollTop = 0;
      }
    },
    menuHeaderRender: undefined,
    logo: LogoSrc,
    ...initialState?.settings,
    fixedHeader: true,
    fixSiderbar: true,
    collapsedButtonRender: false,
    headerContentRender: (props) => {
      return (
        <div
          style={{
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {props.collapsed ? (
            <MenuUnfoldOutlined className="collapse-menu" onClick={() => props.onCollapse(false)} />
          ) : (
            <MenuFoldOutlined className="collapse-menu" onClick={() => props.onCollapse(true)} />
          )}
        </div>
      );
    },
    menuItemRender: (props, defaultDom) => <MenuItem {...props} defaultDom={defaultDom} />,
  };
};

const codeMessage = {
  400: 'A Bad Request Was Sent.',
  401: 'Unauthorized.',
  403: 'Access Forbidden.',
  404: 'Not Found.',
  405: 'The request method is not allowed.',
  406: 'The requested format is not available.',
  410: 'The requested resource is permanently deleted and will no longer be available.',
  422: 'When creating an object, a validation error occurred.',
  500: 'Internal Server Error.',
  502: 'Bad Gateway.',
  503: 'The Service Is Unavailable.',
  504: 'Gateway Timeout.',
};

const errorHandler = (error) => {
  // throw error;
  const response = _get(error, 'response') || {};
  const { status, body } = response;
  if (status) {
    const message = formatMessage({ id: 'app.exception.title' });
    const description = formatMessage({
      id: `app.exception.${status}.description`,
      defaultMessage: 'hide',
    });
    description !== 'hide' && notification.error({ message, description });
  }

  if (status === 401) {
    dispatchAction(logOutAction);
  } else if (status === 403) {
    history.replace(ROUTE_PATH.EXCEPTION_403);
  }
  if (status === 400) {
    const errorsData = _get(error, 'data') || {};
    return { statusCode: status, errors: errorsData };
  }

  const statusCode = status || 503;

  if (statusCode === 503) {
    notification.error({ message: 'Ops! Some thing went wrong.', duration: 0 });
  }

  return { statusCode: status || 503 };
};

window.isTokenRefreshing = false;
const requestInterceptor = async (originUrl, originOptions) => {
  let url = originUrl || '';
  const options = originOptions || {};

  if (options.requestType === REQUEST_TYPE_FORM) {
    delete options.headers['Content-Type'];
  }

  if (options.refreshToken || options.skip) {
    return { url, options };
  }

  let idToken = await getCookie(COOKIE_NAMES.ID_TOKEN);
  if (idToken) {
    const tokenInfo = jwtDecode(idToken);
    const tokenExpired = moment(tokenInfo.exp * 1000);
    const todayTime = moment();

    if (todayTime.isAfter(tokenExpired)) {
      if (!window.isTokenRefreshing) {
        window.isTokenRefreshing = true;
        handleRefreshToken();
      }
      await new Promise((resolve) =>
        EventEmitter.subscribeOnce(EVENT_EMITTER_NAMES.REFRESH_TOKEN, () => resolve()),
      );
    }

    idToken = await getCookie(COOKIE_NAMES.ID_TOKEN);
    options.headers = { ...options.headers, Authorization: `Bearer ${idToken}` };
  }
  return { url, options };
};

export const request = {
  errorHandler,
  requestInterceptors: [requestInterceptor],
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  timeout: 60000,
};

const errorLog = console.error;
console.error = (...rest) => {
  const messageError = rest[0] || '';
  if (
    typeof messageError === 'string' &&
    messageError.indexOf('prefixed with namespace') === -1 &&
    messageError.indexOf('antd-compatible') === -1
  ) {
    errorLog.call(console, ...rest);
  }
};

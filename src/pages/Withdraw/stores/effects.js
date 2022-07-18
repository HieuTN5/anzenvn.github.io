import { message } from 'antd';
import _take from 'lodash/take';
import _takeRight from 'lodash/takeRight';
import _reduce from 'lodash/reduce';
import {
  PI_GET_ALL_HISTORY_WITHDRAW,
  PI_RESEND_HISTORY_WITHDRAW,
  PI_CANCEL_HISTORY_WITHDRAW,
} from './constants';
import { getAllHistory, getResendHistoryWithdraw, cancelHistoryWithdraw } from '@/services/history';
import { piSaveAllHistoryWithdraw, piLoadingRequest, piLoadingSuccess } from './actions';
import { hasResponseError } from '@/utils/utils';
const effects = {
  *[PI_GET_ALL_HISTORY_WITHDRAW]({ payload }, { call, put, all }) {
    yield put(piLoadingRequest('page'));
    const response = yield call(getAllHistory, payload);
    if (hasResponseError(response)) {
      yield put(piLoadingSuccess('page'));
      return;
    }
    yield all([put(piSaveAllHistoryWithdraw(response)), put(piLoadingSuccess('page'))]);
  },

  *[PI_RESEND_HISTORY_WITHDRAW]({ payload, resolve }, { call, put, all, select }) {
    yield put(piLoadingRequest('page'));
    const response = yield call(getResendHistoryWithdraw, { id: payload });
    if (hasResponseError(response)) {
      resolve({ response: null });
      yield put(piLoadingSuccess('page'));
      return;
    }
    resolve({ response: response.data });
    yield put(piLoadingSuccess('page'));
  },

  *[PI_CANCEL_HISTORY_WITHDRAW]({ payload, resolve }, { call, put, all, select }) {
    yield put(piLoadingRequest('page'));
    const response = yield call(cancelHistoryWithdraw, { transId: payload });
    if (hasResponseError(response)) {
      resolve({ response: null });
      yield put(piLoadingSuccess('page'));
      return;
    }

    resolve({ response: response.data });
    yield put(piLoadingSuccess('page'));
  },
};

export default effects;

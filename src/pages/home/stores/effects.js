import { hasResponseError } from '@/utils/utils';
import { getDetailOrderService, getAllOrdersService, creteOrderService, deleteOrderService, getInfomationOrderService } from '@/services/home';

import { GET_ALL_ORDERS, GET_DETAIL_ORDER, CREATE_ORDER, DELETE_ORDER, GET_INFO_ORDER } from './constants';
import { saveAllOrdersAction, piLoadingRequestAction, piLoadingSuccessAction, saveInfOrderAction } from './actions';

const effects = {
  *[GET_ALL_ORDERS]({ payload }, { call, put }) {
    yield put(piLoadingRequestAction('page'));
    const response = yield call(getAllOrdersService, payload);
    const hasError = hasResponseError(response);
    if (!hasError) {
      yield put(saveAllOrdersAction(response.result));
      yield put(piLoadingSuccessAction('page'));
    }
    yield put(piLoadingSuccessAction('page'))
  },
  *[GET_DETAIL_ORDER]({ payload, resolve }, { call, put, all, select }) {
    yield put(piLoadingRequestAction('detail'));
    const response = yield call(getDetailOrderService, payload);
    if (hasResponseError(response)) {
      resolve(null);
      yield put(piLoadingSuccessAction('detail'))
      return;
    }
    resolve(response.result);
    yield put(piLoadingSuccessAction('detail'))
  },

  *[CREATE_ORDER]({ payload, resolve }, { call, put, all, select }) {
    yield put(piLoadingRequestAction('page'));
    const response = yield call(creteOrderService, payload);
    if (hasResponseError(response)) {
      resolve(null);
      yield put(piLoadingSuccessAction('page'));
      return;
    }
    resolve(response.result);
    yield put(piLoadingSuccessAction('page'));
  },

  *[DELETE_ORDER]({ payload, resolve }, { call, put, all, select }) {
    yield put(piLoadingRequestAction('page'));
    const response = yield call(deleteOrderService, payload);
    if (hasResponseError(response)) {
      resolve(null);
      yield put(piLoadingSuccessAction('page'));
      return;
    }
    resolve(response.result);
    yield put(piLoadingSuccessAction('page'));
  },
  *[GET_INFO_ORDER]({ payload }, { call, put }) {
    yield put(piLoadingRequestAction('page'));
    const response = yield call(getInfomationOrderService, payload);
    const hasError = hasResponseError(response);
    if (!hasError) {
      yield put(saveInfOrderAction(response.result));
      yield put(piLoadingSuccessAction('page'));
    }
    yield put(piLoadingSuccessAction('page'))
  },
};

export default effects;

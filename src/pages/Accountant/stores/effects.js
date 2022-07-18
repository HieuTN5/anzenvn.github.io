import { hasResponseError } from '@/utils/utils';
import { getAllBillOfLadingsService, deleteBillService, editDetailBillService, creteAndUpdateBillService, getListOrderReadyService } from '@/services/billOfLandings';
import { GET_ALL_BILLS, GET_DETAIL_Bill, CREATE_UPDATE_BILL, DELETE_BILL, GET_LIST_ORDER_READY } from './constants';
import { saveAllBillsAction, piLoadingRequestAction, piLoadingSuccessAction, saveListOrderReadyAction } from './actions';

const effects = {
  *[GET_ALL_BILLS]({ payload }, { call, put }) {
    yield put(piLoadingRequestAction('page'));
    const response = yield call(getAllBillOfLadingsService, payload);
    const hasError = hasResponseError(response);
    if (!hasError) {
      yield put(saveAllBillsAction(response.result));
      yield put(piLoadingSuccessAction('page'));
    }
    yield put(piLoadingSuccessAction('page'))
  },
  *[GET_DETAIL_Bill]({ payload, resolve }, { call, put, all, select }) {
    yield put(piLoadingRequestAction('page'));
    const response = yield call(editDetailBillService, payload);
    if (hasResponseError(response)) {
      resolve(null);
      yield put(piLoadingSuccessAction('page'))
      return;
    }
    resolve(response.result);
    yield put(piLoadingSuccessAction('page'))
  },

  *[CREATE_UPDATE_BILL]({ payload, resolve }, { call, put, all, select }) {
    yield put(piLoadingRequestAction('page'));
    const response = yield call(creteAndUpdateBillService, payload);
    if (hasResponseError(response)) {
      resolve(null);
      yield put(piLoadingSuccessAction('page'));
      return;
    }
    resolve(response.result);
    yield put(piLoadingSuccessAction('page'));
  },

  *[DELETE_BILL]({ payload, resolve }, { call, put, all, select }) {
    yield put(piLoadingRequestAction('page'));
    const response = yield call(deleteBillService, payload);
    if (hasResponseError(response)) {
      resolve(null);
      yield put(piLoadingSuccessAction('page'));
      return;
    }
    resolve(response.result);
    yield put(piLoadingSuccessAction('page'));
  },
  *[GET_LIST_ORDER_READY]({ payload, resolve }, { call, put, all, select }) {
    yield put(piLoadingRequestAction('page'));
    const response = yield call(getListOrderReadyService, payload);
    if (hasResponseError(response)) {
      resolve(null);
      yield put(piLoadingSuccessAction('page'));
      return;
    }
    resolve(response.result);
    yield put(saveListOrderReadyAction(response.result));
    yield put(piLoadingSuccessAction('page'));
  },
};

export default effects;

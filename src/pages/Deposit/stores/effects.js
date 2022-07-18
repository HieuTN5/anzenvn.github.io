import { message } from 'antd';
import _take from 'lodash/take';
import _takeRight from 'lodash/takeRight';
import _reduce from 'lodash/reduce';
import { PI_GET_ALL_HISTORY_DEPOSIT } from './constants';
import { getAllHistory } from '@/services/history';
import { piSaveAllHistoryDeposit, piLoadingRequest, piLoadingSuccess } from './actions';
import { hasResponseError } from '@/utils/utils';
const effects = {
  *[PI_GET_ALL_HISTORY_DEPOSIT]({ payload }, { call, put, all }) {
    yield put(piLoadingRequest('page'));
    const response = yield call(getAllHistory, payload);
    if (hasResponseError(response)) return;
    yield all([put(piSaveAllHistoryDeposit(response)), put(piLoadingSuccess('page'))]);
  },
};

export default effects;

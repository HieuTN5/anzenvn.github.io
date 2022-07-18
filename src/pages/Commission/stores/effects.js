import { message } from 'antd';
import _take from 'lodash/take';
import _takeRight from 'lodash/takeRight';
import _reduce from 'lodash/reduce';
import { PI_GET_ALL_HISTORY_COMMISSION } from './constants';
import { getAllHistoryCommission } from '@/services/history';
import { piSaveAllHistoryCommission, piLoadingRequest, piLoadingSuccess } from './actions';
import { hasResponseError } from '@/utils/utils';
const effects = {
  *[PI_GET_ALL_HISTORY_COMMISSION]({ payload }, { call, put, all }) {
    yield put(piLoadingRequest('page'));
    const response = yield call(getAllHistoryCommission, payload);
    if (hasResponseError(response)) {
      yield put(piLoadingSuccess('page'));
      return;
    }
    yield all([put(piSaveAllHistoryCommission(response)), put(piLoadingSuccess('page'))]);
  },
};

export default effects;

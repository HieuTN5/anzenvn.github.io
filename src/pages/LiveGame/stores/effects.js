import { hasResponseError, getCookie } from '@/utils/utils';
import { COOKIE_NAMES } from '@/utils/constants';

import { getListGame, playGame } from '@/services/liveGame';
// import { getCurrentUserIpAddress } from '@/stores/auth/effects';

import { GET_LIST_GAME, CLICK_PLAY_GAME } from './constants';
import { saveListGameAction, saveSrcPlayGameAction } from './actions';

const effects = {
  *[GET_LIST_GAME]({ payload }, { call, put }) {
    const response = yield call(getListGame, payload);
    const hasError = hasResponseError(response);
    if (!hasError) {
      yield put(saveListGameAction(response.games));
    }
  },
  // *[CLICK_PLAY_GAME]({ payload }, { call, put }) {
  //   const userName = getCookie(COOKIE_NAMES.USERNAME);
  //   const ipAddress = yield getCurrentUserIpAddress();
  //   const { pageCode } = payload;
  //   const response = yield call(playGame, { userName, clientIp: ipAddress, pageCode });
  //   const hasError = hasResponseError(response);
  //   if (hasError) return;
  //   yield put(saveSrcPlayGameAction(JSON.parse(response)));
  // },
};

export default effects;

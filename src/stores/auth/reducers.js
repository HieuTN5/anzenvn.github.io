import {
  SAVE_USER_PROFILE,
  SET_QR_CODE,
  CLEAR_AUTH_DATA,
  SET_FILL_USERNAME,
  RESET_FORGOT_PASSWORD,
  SET_MESSAGE_VERIFY_MAIL,
  SET_AVAILABLE_BALANCE,
  SET_DEPOSIT_ADDRESS,
} from './constants';
import inintialState from './state';
const reducers = {
  [SAVE_USER_PROFILE](state, { payload }) {
    state.currentUser = payload;
  },
  [SET_QR_CODE](state, { payload }) {
    const { twoAuth: curState } = state;
    curState.sharedKey = payload.sharedKey;
    curState.authenticatorUri = payload.authenticatorUri;
  },
  [CLEAR_AUTH_DATA](state) {
    state.twoAuth = inintialState.twoAuth;
    state.currentUser = inintialState.currentUser;
  },

  // Handle auto fill
  [SET_FILL_USERNAME](state, { payload }) {
    const { dynamicFillData: currentState } = state;
    currentState.userName = payload;
  },
  [RESET_FORGOT_PASSWORD](state) {
    const { dynamicFillData: currentState } = state;
    currentState.userName = inintialState.dynamicFillData.userName;
  },

  [SET_MESSAGE_VERIFY_MAIL](state, { payload }) {
    const { verifyMail: currentState } = state;
    currentState.messageVerifyMail = payload;
  },
  [SET_AVAILABLE_BALANCE](state, { payload }) {
    const { availableBalance: currentState } = state;
    currentState.balance = payload.balance;
    currentState.maxWeek = payload.maxWeek;
    currentState.maxTrans = payload.maxTrans;
    currentState.lastDeposit = payload.lastDeposit;
  },
  [SET_DEPOSIT_ADDRESS](state, { payload }) {
    const { userWallet: currentState } = state;
    currentState.erc20 = payload.erc20;
    currentState.trc20 = payload.trc20;
  },
};

export default reducers;

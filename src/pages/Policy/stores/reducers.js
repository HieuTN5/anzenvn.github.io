import { SAVE_ALL_BILLS, PI_LOADING_REQUEST, PI_LOADING_SUCCESS, SAVE_LIST_ORDER_READY } from './constants';
import initialState from './state';

const reducers = {
  [SAVE_ALL_BILLS](state, { payload }) {
    const { data: currentState } = state;
    // const newPayload = payload.map((item, index) => ({ ...item, key: index + 1 })) || [];
    currentState.dataBills = payload;
  },
  [PI_LOADING_REQUEST](state, { payload: name }) {
    const { data: curState } = state;
    curState.isLoading[name] = true;
  },
  [PI_LOADING_SUCCESS](state, { payload: name }) {
    const { data: curState } = state;
    curState.isLoading[name] = false;
  },
  [SAVE_LIST_ORDER_READY](state, { payload }) {
    const { data: currentState } = state;
    currentState.listOrderReady = payload;
  },
};

export default reducers;

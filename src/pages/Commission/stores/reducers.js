import {
  PI_RESET_STATE,
  PI_LOADING_REQUEST,
  PI_LOADING_SUCCESS,
  PI_SAVE_ALL_HISTORY_COMMISSION,
} from './constants';
import initialState from './state';

const reducers = {
  [PI_RESET_STATE](state) {
    console.log(state);
    let { pi: curState } = state;
    const { results, totalRecords } = curState;
    curState = { ...initialState.pi, results, totalRecords };
  },
  [PI_LOADING_REQUEST](state, { payload: name }) {
    const { pi: curState } = state;
    curState.loading[name] = true;
  },
  [PI_LOADING_SUCCESS](state, { payload: name }) {
    const { pi: curState } = state;
    curState.loading[name] = false;
  },
  [PI_SAVE_ALL_HISTORY_COMMISSION](state, { payload: { data, additionalData } }) {
    const { pi: curState } = state;
    curState.historyCommission = data;
    curState.total = additionalData.total;
  },
};

export default reducers;

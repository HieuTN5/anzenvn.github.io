import { SAVE_LIST_GAME, SAVE_SRC_PLAY_GAME, RESET_STATE } from './constants';
import initialState from './state';

const reducers = {
  [SAVE_LIST_GAME](state, { payload }) {
    const { data: currentState } = state;
    currentState.listGame = payload;
  },
  [SAVE_SRC_PLAY_GAME](state, { payload }) {
    const { data: currentState } = state;
    currentState.srcPlayGame = payload;
  },
  [RESET_STATE](state) {
    const { data: currentState } = state;
    currentState.listGame = initialState.data.listGame;
  },
};

export default reducers;

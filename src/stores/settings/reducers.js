import { SAVE_DEFAULT_COLLAPSED } from './constants';

const reducers = {
  [SAVE_DEFAULT_COLLAPSED](state, { payload }) {
    state.collapsed = payload;
  },
};

export default reducers;

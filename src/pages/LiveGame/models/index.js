import { NS_LIVE_GAME } from '../stores/constants';
import state from '../stores/state';
import reducers from '../stores/reducers';
import effects from '../stores/effects';

export default {
  namespace: NS_LIVE_GAME,
  state,
  reducers,
  effects,
};

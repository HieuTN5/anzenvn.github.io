import { NS_ACCOUNTANT } from '../stores/constants';
import state from '../stores/state';
import reducers from '../stores/reducers';
import effects from '../stores/effects';

export default {
  namespace: NS_ACCOUNTANT,
  state,
  reducers,
  effects,
};

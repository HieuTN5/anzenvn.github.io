import { NS_AUTH } from '@/stores/auth/constants';
import effects from '@/stores/auth/effects';
import reducers from '@/stores/auth/reducers';
import state from '@/stores/auth/state';

const model = {
  namespace: NS_AUTH,
  effects,
  state,
  reducers,
};

export default model;

import { NS_SETTINGS } from '@/stores/settings/constants';
import reducers from '@/stores/settings/reducers';
import state from '@/stores/settings/state';

const model = {
  namespace: NS_SETTINGS,
  state,
  reducers,
};

export default model;

import { mergeNameSpace } from '@/utils/utils';

import { NS_SETTINGS, CHANGE_DEFAULT_COLLAPSED } from './constants';

const merge = mergeNameSpace(NS_SETTINGS);

export const changeDefaultCollapsed = (payload) => ({
  type: merge(CHANGE_DEFAULT_COLLAPSED),
  payload,
});

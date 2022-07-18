import { createSelector } from 'reselect';

import { NS_SETTINGS } from './constants';

const currentState = (state) => state[NS_SETTINGS];

export const selCollapsed = createSelector(currentState, (state) => state.collapsed);

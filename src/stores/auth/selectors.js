import { createSelector } from 'reselect';

import { NS_AUTH } from './constants';

const currentState = (state) => state[NS_AUTH];

export const selCurrentUser = createSelector(currentState, (state) => state.currentUser);
export const selCurrentBetInfo = createSelector(selCurrentUser, (state) => state.betInfo);
export const seltwoAuthData = createSelector(currentState, (state) => state.twoAuth);

export const selectAutoFillData = createSelector(currentState, (state) => state.dynamicFillData);
export const selAutoFillUsername = createSelector(selectAutoFillData, (state) => state.userName);

export const selVerifyMail = createSelector(currentState, (state) => state.verifyMail);
export const selCurrentAvailableBalance = createSelector(
  currentState,
  (state) => state.availableBalance,
);

export const selMessageVerifyMail = createSelector(
  selVerifyMail,
  (state) => state.messageVerifyMail,
);

export const selUserWallet = createSelector(currentState, (state) => state.userWallet);

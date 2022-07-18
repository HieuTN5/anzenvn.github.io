import {
  NS_LIVE_GAME,
  GET_LIST_GAME,
  SAVE_LIST_GAME,
  CLICK_PLAY_GAME,
  SAVE_SRC_PLAY_GAME,
  RESET_STATE,
} from './constants';

export const getListGameAction = (payload) => ({
  type: `${NS_LIVE_GAME}/${GET_LIST_GAME}`,
  payload,
});

export const saveListGameAction = (payload) => ({
  type: `${NS_LIVE_GAME}/${SAVE_LIST_GAME}`,
  payload,
});

export const clickPlayGameAction = (payload) => ({
  type: `${NS_LIVE_GAME}/${CLICK_PLAY_GAME}`,
  payload,
});

export const saveSrcPlayGameAction = (payload) => ({
  type: `${NS_LIVE_GAME}/${SAVE_SRC_PLAY_GAME}`,
  payload,
});

export const resetStateAction = () => ({
  type: `${NS_LIVE_GAME}/${RESET_STATE}`,
});

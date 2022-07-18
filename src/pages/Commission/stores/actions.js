import {
  NS_COMMISSION,
  PI_RESET_STATE,
  PI_LOADING_REQUEST,
  PI_LOADING_SUCCESS,
  PI_GET_ALL_HISTORY_COMMISSION,
  PI_SAVE_ALL_HISTORY_COMMISSION,
} from './constants';

export const piResetState = () => ({ type: `${NS_COMMISSION}/${PI_RESET_STATE}` });
export const piLoadingRequest = (payload) => ({
  type: `${NS_COMMISSION}/${PI_LOADING_REQUEST}`,
  payload,
});
export const piLoadingSuccess = (payload) => ({
  type: `${NS_COMMISSION}/${PI_LOADING_SUCCESS}`,
  payload,
});
export const piGetAllHistoryCommission = (payload) => ({
  type: `${NS_COMMISSION}/${PI_GET_ALL_HISTORY_COMMISSION}`,
  payload,
});
export const piSaveAllHistoryCommission = (payload) => ({
  type: `${NS_COMMISSION}/${PI_SAVE_ALL_HISTORY_COMMISSION}`,
  payload,
});

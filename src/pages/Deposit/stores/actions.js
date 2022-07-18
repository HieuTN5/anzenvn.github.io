import {
  NS_DEPOSIT,
  PI_RESET_STATE,
  PI_LOADING_REQUEST,
  PI_LOADING_SUCCESS,
  PI_GET_ALL_HISTORY_DEPOSIT,
  PI_SAVE_ALL_HISTORY_DEPOSIT,
} from './constants';

export const piResetState = () => ({ type: `${NS_DEPOSIT}/${PI_RESET_STATE}` });
export const piLoadingRequest = (payload) => ({
  type: `${NS_DEPOSIT}/${PI_LOADING_REQUEST}`,
  payload,
});
export const piLoadingSuccess = (payload) => ({
  type: `${NS_DEPOSIT}/${PI_LOADING_SUCCESS}`,
  payload,
});
export const piGetAllHistoryDeposit = (payload) => ({
  type: `${NS_DEPOSIT}/${PI_GET_ALL_HISTORY_DEPOSIT}`,
  payload,
});
export const piSaveAllHistoryDeposit = (payload) => ({
  type: `${NS_DEPOSIT}/${PI_SAVE_ALL_HISTORY_DEPOSIT}`,
  payload,
});

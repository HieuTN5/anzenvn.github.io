import {
  NS_WITHDRAW,
  PI_RESET_STATE,
  PI_LOADING_REQUEST,
  PI_LOADING_SUCCESS,
  PI_GET_ALL_HISTORY_WITHDRAW,
  PI_SAVE_ALL_HISTORY_WITHDRAW,
  PI_RESEND_HISTORY_WITHDRAW,
  PI_CANCEL_HISTORY_WITHDRAW,
} from './constants';

export const piResetState = () => ({ type: `${NS_WITHDRAW}/${PI_RESET_STATE}` });
export const piLoadingRequest = (payload) => ({
  type: `${NS_WITHDRAW}/${PI_LOADING_REQUEST}`,
  payload,
});
export const piLoadingSuccess = (payload) => ({
  type: `${NS_WITHDRAW}/${PI_LOADING_SUCCESS}`,
  payload,
});
export const piGetAllHistoryWithdraw = (payload) => ({
  type: `${NS_WITHDRAW}/${PI_GET_ALL_HISTORY_WITHDRAW}`,
  payload,
});
export const piSaveAllHistoryWithdraw = (payload) => ({
  type: `${NS_WITHDRAW}/${PI_SAVE_ALL_HISTORY_WITHDRAW}`,
  payload,
});
export const piResendHistoryWithdraw = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: `${NS_WITHDRAW}/${PI_RESEND_HISTORY_WITHDRAW}`, payload, resolve }),
  );

export const piCancelHistoryWithdraw = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: `${NS_WITHDRAW}/${PI_CANCEL_HISTORY_WITHDRAW}`, payload, resolve }),
  );

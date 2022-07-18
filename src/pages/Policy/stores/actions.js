import { NS_LIST, GET_ALL_BILLS, SAVE_ALL_BILLS, GET_DETAIL_Bill, CREATE_UPDATE_BILL, PI_LOADING_SUCCESS, PI_LOADING_REQUEST, DELETE_BILL, GET_LIST_ORDER_READY, SAVE_LIST_ORDER_READY } from './constants';

export const getAllBillsAction = (payload) => ({
  type: `${NS_LIST}/${GET_ALL_BILLS}`,
  payload,
});
export const saveAllBillsAction = (payload) => ({
  type: `${NS_LIST}/${SAVE_ALL_BILLS}`,
  payload,
});
export const piLoadingRequestAction = (payload) => ({ type: `${NS_LIST}/${PI_LOADING_REQUEST}`, payload });
export const piLoadingSuccessAction = (payload) => ({ type: `${NS_LIST}/${PI_LOADING_SUCCESS}`, payload });


export const asyncGetDetailBillAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: `${NS_LIST}/${GET_DETAIL_Bill}`, payload, resolve }),
  );

export const asyncCreateAndUpdateBillAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: `${NS_LIST}/${CREATE_UPDATE_BILL}`, payload, resolve }),
  );

export const asyncDeleteBillAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: `${NS_LIST}/${DELETE_BILL}`, payload, resolve }),
  );

export const getListOrderReadyAction = (payload) => ({
  type: `${NS_LIST}/${GET_LIST_ORDER_READY}`,
  payload,
});
export const saveListOrderReadyAction = (payload) => ({
  type: `${NS_LIST}/${SAVE_LIST_ORDER_READY}`,
  payload,
});

export const asyncGetListOrderReadyAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: `${NS_LIST}/${GET_LIST_ORDER_READY}`, payload, resolve }),
  );
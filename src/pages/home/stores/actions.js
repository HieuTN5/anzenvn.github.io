import { NS_HOME, GET_ALL_ORDERS, SAVE_ALL_ORDERS, GET_DETAIL_ORDER, CREATE_ORDER, PI_LOADING_SUCCESS, PI_LOADING_REQUEST, DELETE_ORDER, GET_INFO_ORDER, SAVE_INFO_ORDER } from './constants';

export const getAllOrdersAction = (payload) => ({
  type: `${NS_HOME}/${GET_ALL_ORDERS}`,
  payload,
});

export const piLoadingRequestAction = (payload) => ({ type: `${NS_HOME}/${PI_LOADING_REQUEST}`, payload });
export const piLoadingSuccessAction = (payload) => ({ type: `${NS_HOME}/${PI_LOADING_SUCCESS}`, payload });
export const saveAllOrdersAction = (payload) => ({
  type: `${NS_HOME}/${SAVE_ALL_ORDERS}`,
  payload,
});

export const getDetailOrderAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: `${NS_HOME}/${GET_DETAIL_ORDER}`, payload, resolve }),
  );

export const asyncCreateOrderAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: `${NS_HOME}/${CREATE_ORDER}`, payload, resolve }),
  );

export const asyncDeleteOrderAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: `${NS_HOME}/${DELETE_ORDER}`, payload, resolve }),
  );

export const getInfOrderAction = (payload) => ({
  type: `${NS_HOME}/${GET_INFO_ORDER}`,
  payload,
});

export const saveInfOrderAction = (payload) => ({
  type: `${NS_HOME}/${SAVE_INFO_ORDER}`,
  payload,
});

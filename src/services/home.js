import { request } from 'umi';
import { stringify } from 'query-string';

export function getAllOrdersService(params) {
  return request(`${AUTH_API}/api/DeliveryOrders?${stringify(params)}`, {
    method: 'GET',
    data: params,
  });
}

export function getDetailOrderService(params) {
  return request(`${AUTH_API}/api/DeliveryOrders/${params}`, {
    method: 'GET',
  });
}

export function creteOrderService(params) {
  return request(`${AUTH_API}/api/DeliveryOrders`, {
    method: 'POST',
    data: params
  });
}

export function deleteOrderService(id) {
  return request(`${AUTH_API}/api/DeliveryOrders/${id}`, {
    method: 'DELETE',
  });
}

export function getInfomationOrderService(params) {
  return request(`${AUTH_API}/api/DeliveryOrders/aggregate/${params}`, {
    method: 'GET',
  });
}
import { request } from 'umi';
import { stringify } from 'query-string';

export function getAllBillOfLadingsService(params) {
    return request(`${AUTH_API}/api/BillOfLadings?${stringify(params)}`, {
        method: 'GET',
        data: params,
    });
}

export function deleteBillService(id) {
    return request(`${AUTH_API}/api/BillOfLadings/${id}`, {
        method: 'DELETE',
    });
}

export function editDetailBillService(id) {
    return request(`${AUTH_API}/api/BillOfLadings/${id}`, {
        method: 'GET',
    });
}

export function creteAndUpdateBillService(params) {
    return request(`${AUTH_API}/api/BillOfLadings`, {
        method: 'POST',
        data: params
    });
}

export function getListOrderReadyService(params) {
    return request(`${AUTH_API}/api/DeliveryOrders/getforbl?${stringify(params)}`, {
        method: 'GET',
        data: params
    });
}
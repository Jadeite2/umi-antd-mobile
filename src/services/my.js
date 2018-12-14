import proxyRequest from 'utils/request';
import { baseUrl } from '@/utils/baseServer';

export async function reg(params) {
  return proxyRequest.get(`${baseUrl}recycleapi/order/user/orderCount`, params);
}
export async function orderCount(params) {
  return proxyRequest.get(`${baseUrl}recycleapi/order/user/orderCount`, params);
}

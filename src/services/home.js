import proxyRequest from 'utils/request';
import { baseUrl } from '@/utils/baseServer';

export async function reg(params) {
  return proxyRequest.get('/api/home', params);
}

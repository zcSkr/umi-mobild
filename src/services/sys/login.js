import request from '@/utils/request';
import qs from 'qs';

export async function login(params, data) {
  return request(`/userApi/login.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}

export async function getSysTimestamp(params, data) {
  return request(`/userApi/getCurSysTimestamp.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getMsgCode(params, data) {
  return request(`/userApi/getMsgCode.app?${qs.stringify(params)}`, { mode: 'cors' });
}
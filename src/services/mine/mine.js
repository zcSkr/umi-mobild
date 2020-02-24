import request from '@/utils/request';
import qs from 'qs';

export async function queryUserInfo(params, data) {
  return request(`/userApi/auth/findUserInfo.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function updateUserInfo(params, data) {
  return request(`/userApi/auth/updateUserInfo.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}

export async function updateFile(params, data) {
  return request(`/commonApi/updateFile?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: data });
}

export async function feedBack(params, data) {
  return request(`/feedbackApi/auth/saveFeedback.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}

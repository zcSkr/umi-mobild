import request from '@/utils/request';
import qs from 'qs';

export async function query(params, data) {
  return request(`/userApi/findHome.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function queryArticleList(params, data) {
  return request(`/articleApi/findArticleList.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function queryRichInfo(params, data) {
  return request(`/advertisApi/findAdvertisDetail.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}



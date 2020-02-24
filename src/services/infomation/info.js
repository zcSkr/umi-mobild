import request from '@/utils/request';
import qs from 'qs';

export async function queryInfo(params, data) {
  return request(`/articleApi/findEntityInfo.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function zan(params, data) {
  return request(`/articleApi/updateLikeDo.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}

export async function queryCommentList(params, data) {
  return request(`/commentApi/findArticleCommentList.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}

export async function comment(params, data) {
  return request(`/commentApi/auth/saveComment.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}

import request from '@/utils/request';
import qs from 'qs';


export async function querySysParams(params, data) {
  return request(`/codeApi/findCode.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function queryBusinessParams(params, data) {
  return request(`/businessCodeApi/findCode.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}

export async function pay(params, data) {
  return request(`/payLogApi/savePayLog.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function queryPayStatus(params, data) {
  return request(`/payLogApi/findPayLogState.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function recharge(params, data) {
  return request(`/payLogApi/auth/savePayLogBalance.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function queryPayMoney(params, data) {
  return request(`/configInterfaceApi/findConfigInterface.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}

export async function getWxSdkConfigInfoWeb(params, data) {
  return request(`/weiXinApi/getWxSdkConfigInfoWeb.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}
export async function getUserOpenIdByCodeWeb(params, data) {
  return request(`/weiXinApi/getUserOpenIdByCodeWeb.app?${qs.stringify(params)}`, { mode: 'cors', method: 'post', body: JSON.stringify(data) });
}



export async function getAppleActivitiLock(params) {
  return request(`/commonApi/getAppleActivitiLock.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getAppleIMEIbyNum(params) {
  return request(`/commonApi/getAppleIMEIbyNum.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getAppleBlacklist(params) {
  return request(`/commonApi/getAppleBlacklist.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getPhoneByIMEI(params) {
  return request(`/commonApi/getPhoneByIMEI.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getOppoGuarantee(params) {
  return request(`/commonApi/getOppoGuarantee.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getMiGuarantee(params) {
  return request(`/commonApi/getMiGuarantee.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getHUAWEIGuarantee(params) {
  return request(`/commonApi/getHUAWEIGuarantee.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getVIVOGuarantee(params) {
  return request(`/commonApi/getVIVOGuarantee.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getAppleNumber(params) {
  return request(`/commonApi/getAppleNumber.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getAppleHighSelect(params) {
  return request(`/commonApi/getAppleHighSelect.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getAppleExchange(params) {
  return request(`/commonApi/getAppleExchange.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getAppleActivitiDate(params) {
  return request(`/commonApi/getAppleActivitiDate.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getAppleNetLock(params) {
  return request(`/commonApi/getAppleNetLock.app?${qs.stringify(params)}`, { mode: 'cors' });
}
export async function getAppleReport(params) {
  return request(`/commonApi/getAppleReport.app?${qs.stringify(params)}`, { mode: 'cors' });
}

import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getPageQuery } from '@/utils/utils';
import * as service_login from '@/services/sys/login';
import app from '@/config/app';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    errorMsg: ''
  },

  effects: {
    *login({ payload }, { select, call, put }) {
      yield put({ type: 'save' });
      const response = yield call(service_login.login, {}, { ...payload });
      console.log(response)
      if (response) {
        if (response.resultState == '1') {
          app.setToken(response.data.user.token);
          app.setUnionuser(response.data.user);
          yield put({ type: 'save', payload: { status: 'success' } });
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;
          // console.log(urlParams, params)
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.startsWith('/#')) {
                redirect = redirect.substr(2);
              }
            } else {
              window.location.href = redirect;
              return;
            }
          }
          yield put(routerRedux.replace(redirect || '/'));
        } else {
          Toast.fail(response.msg)
          yield put({ type: 'save', payload: { status: 'error', errorMsg: response.msg } });
        }
        // notification.destroy()
      } else {
        yield put({ type: 'save', payload: { status: 'error' } });
      }
    },
    *service({ payload, onSuccess, onComplete }, { select, call, put }) {
      const { service, params, data } = payload;
      const response = yield call(service_login[service], params, data);
      if (response) {
        if (onSuccess) yield onSuccess(response);
      }
      if (onComplete) yield onComplete();
    },
    *logout(_, { put }) {
      localStorage.removeItem('unionuser')
      localStorage.removeItem('token')
      localStorage.removeItem('SN')
      const params = getPageQuery();
      let { redirect } = params;
      if (redirect) return
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          // search: stringify({
          //   redirect: window.location.href,
          // }),
        })
      );
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },
};

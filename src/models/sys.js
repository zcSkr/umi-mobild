import * as service_sys from '@/services/sys/sys';

export default {
  namespace: 'sys',

  state: {
    contactPhone: {},
    packageBuy: [], //价格套餐
    queryInfoBanner: [],//顶部banner图;
    data: {},
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  },
  effects: {
    *query({ payload, onSuccess, onComplete }, { select, call, put }) {
      let { data, pagination: { current, pageSize } } = yield select(state => state.home);
      const response = yield call(service_sys.query, {}, { pageIndex: current, pageSize: pageSize, ...payload });
      // console.log(response)
      if (response) {
        yield put({
          type: 'save',
          payload: {
            data: response.data,
            pagination: {
              current: response.data.pageIndexFeedback,
              total: response.data.totalFeedback
            },
          },
        });
      }
    },
    *service({ payload, onSuccess, onComplete }, { select, call, put }) {
      const { service, params, data } = payload;
      const response = yield call(service_sys[service], params, data);
      if (response) {
        if (onSuccess) yield onSuccess(response);
      }
      if (onComplete) yield onComplete();
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

import * as service_home from '@/services/home/home';

export default {
  namespace: 'home',

  state: {
    data: {},
    listFeedback: [],
    pagination: {
      current: 1,
      pageSize: 5,
      total: 0
    }
  },
  effects: {
    *query({ payload, onSuccess, onComplete }, { select, call, put }) {
      let { data, pagination: { current, pageSize }, listFeedback } = yield select(state => state.home);
      const response = yield call(service_home.query, {}, { pageIndex: current, pageSize: pageSize, ...payload });
      // console.log(response)
      if (response) {
        yield put({
          type: 'save',
          payload: {
            data: response.data,
            listFeedback: payload && payload.pageIndex != 1 ? listFeedback.concat(response.data.listFeedback) : response.data.listFeedback,
            pagination: {
              current: response.data.pageIndexFeedback,
              pageSize: 5,
              total: response.data.totalFeedback
            },
          },
        });
        if (onSuccess) yield onSuccess(response);
      }
    },
    *service({ payload, onSuccess, onComplete }, { select, call, put }) {
      const { service, params, data } = payload;
      const response = yield call(service_home[service], params, data);
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

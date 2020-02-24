import * as service_mine from '@/services/mine/mine';

export default {
  namespace: 'mine',

  state: {
    data: {
      list: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0 
      },
    },
  },
  effects: {
    *query({ payload, onSuccess, onComplete }, { select, call, put }) {
      let { data } = yield select(state => state.mine);
      let { current, pageSize } = data.pagination;
      
      const response = yield call(service_mine.query, { pageIndex:current, pageSize:pageSize, ...payload });
      // console.log(response)
      if (response) {
        yield put({
          type: 'save',
          payload: {
            data: {
              list: response.data.data,
              pagination: {
                current: response.data.otherData.pageIndex,
                pageSize: response.data.otherData.pageSize,
                total: response.data.otherData.total,
              },
              
            },
          },
        });
      }
    },
    *service({ payload, onSuccess, onComplete }, { select, call, put }) {
      const { service, params, data } = payload;
      const response = yield call(service_mine[service], params, data);
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

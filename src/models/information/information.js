import * as service_info from '@/services/infomation/info';

export default {
  namespace: 'info',

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
      let { data } = yield select(state => state.info);
      let { current, pageSize } = data.pagination;
      const response = yield call(service_info.queryCommentList, { pageIndex:current, pageSize:pageSize, ...payload });
      // console.log(response)

      if (response) {
        yield put({
          type: 'save',
          payload: {
            data: {
              list: payload.pageIndex && payload.pageIndex != 1 ? data.list.concat(response.data.listMap) : response.data.listMap,
              pagination: {
                current: response.data.pageIndex,
                pageSize: 10,
                total: response.data.total,
              },
              
            },
          },
        });
      }
    },
    *service({ payload, onSuccess, onComplete }, { select, call, put }) {
      const { service, params, data } = payload;
      const response = yield call(service_info[service], params, data);
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

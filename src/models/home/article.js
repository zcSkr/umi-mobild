import * as service_home from '@/services/home/home';

export default {
  namespace: 'article',

  state: {
    data: {
      list: [],
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0
      }
    }
  },
  effects: {
    *query({ payload, onSuccess, onComplete }, { select, call, put }) {
      let { data: { list, pagination: { current, pageSize } } } = yield select(state => state.article);
      const response = yield call(service_home.queryArticleList, {}, { pageIndex: current, pageSize: pageSize, ...payload });
      // console.log(response)
      if (response) {
        // response.data.listMap && response.data.listMap.forEach(item => {
        //   item.detail = item.detail.replace(/<[^<>]+>/g, '')
        // })
        yield put({
          type: 'save',
          payload: {
            data: {
              list: payload && payload.pageIndex != 1 ? list.concat(response.data.listMap) : response.data.listMap,
              pagination: {
                current: response.data.pageIndex,
                pageSize: 5,
                total: response.data.total
              }
            }
          }
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

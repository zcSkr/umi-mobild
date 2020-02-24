
export default {
  namespace: 'global',

  state: {
    single: '',
    multi: ''
  },

  effects: {
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};

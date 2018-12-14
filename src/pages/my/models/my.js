import { reg } from 'services/my';
import router from 'umi/router';
export default {
  namespace: 'my',
  state: {
    list: ''
  },
  effects: {
    *reg({ payload, callback }, { call, put }) {
      const response = yield call(reg, payload);
      if(!response){
        return;
      }
      yield put({
        type: 'setData',
        payload: response
      });
      if (response) {
        callback(response);
      }
    },
  },
  reducers: {
    setData(state, { payload }) {
      return {
        ...state,
        list: payload,
      }
    },
  }
};

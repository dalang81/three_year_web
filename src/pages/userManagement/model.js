import {message} from 'antd';
import {parse} from 'qs';
import {AdminControllerApi} from 'kosmos-libra-api';

const NAME_SPEACE = 'userManagement';
const init = () => ({
  list: [],
  nameFilter: null,
  genderFilter: null,

  currentPage: 0,

});
const Model = {
  namespace: NAME_SPEACE,
  state: {
    status: undefined,
  },
  effects: {
    * fetchList({payload}, {call, put}) {
      const service = new AdminControllerApi();
      const response = yield call(() => service.getAdminUsers());
      console.log('effects fetchList response ');
      console.table(response);
      yield put({
        type: 'changeList',
        payload: response,
      }); // Login successfullyuccessfully
    },


  },
  reducers: {
    changeList(state, {payload}) {
      const {token, status, type, user, expiration} = payload;
      console.log('reducers changeLoginStatus token, status, type, user, expiration ', token, status, type, user, expiration);
      return {...state, token, status, type, expiration, ...user};
    },

    unload() {
      return {...init()};
    }
  },
};
export default Model;

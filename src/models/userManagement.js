import {list} from '@/services/userManagement';

const UserManagementModel = {
  namespace: 'userManagement',
  state: {
    userList: [],
  },
  effects: {
    * fetch(_, {call, put}) {
      const userList = yield call(list);
      yield put({
        type: 'save',
        userList,
      });
    },
  },
  reducers: {
    save(state, {userList}) {
      return {...state, userList};
    },
    saveUser(state, action) {
      return {...state, user: action.payload || {}};
    },
  },
};
export default UserManagementModel;

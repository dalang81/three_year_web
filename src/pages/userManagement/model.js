import {message} from 'antd';
import {parse} from 'qs';
import {AdminControllerApi, User} from 'kosmos-libra-api';

const NAME_SPEACE = 'userManagement';

const mockUser = () => {
  const obj = new User();
  obj['address'] = "mock address";
//  obj['createdate'] = new Date();
  obj['departmentid'] = "1";
  obj['description'] = "mock description";
  obj['fullname'] = "mock fullname";
  obj['identity'] = "mock identity";
  obj['phone'] = "mock phone";
  obj['photo'] = "mock photo";
  obj['roleid'] = "1";
  obj['username'] = "mock username";
  return obj;
};

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
      try {
        const {
          content = [],
          pageable = {},
          totalPages = 0,
          totalElements = 0,
          last = true,
          first = true,
          sort = {},
          numberOfElements = 0,
          size = 10,
          number = 0,
          empty = false
        } = yield call(() => service.getAdminUsers());
        console.log('effects fetchList response content');
        console.table(content);
        yield put({
          type: 'changeList',
          payload: {
            content,
            pageable,
            totalPages,
            totalElements,
            last,
            first,
            sort,
            numberOfElements,
            size,
            number,
            empty
          },
        });
      } catch (e) {
        console.log('effects fetchList e ', e);
      }
    },

    * addUser({payload}, {call, put}) {
      const service = new AdminControllerApi();
      console.log('effects addUser payload ', {...mockUser(), ...payload});
      try {
        service.postAdminUser({...mockUser(), ...payload});
      } catch (e) {
        console.log('effects addUser e ', e);
      }
    }

  },
  reducers: {
    changeList(state, {payload}) {
      const {
        content, pageable, totalPages, totalElements, last, first, sort, numberOfElements, size, number, empty
      } = payload;
      return {
        ...state,
        content,
        pageable,
        totalPages,
        totalElements,
        last,
        first,
        sort,
        numberOfElements,
        size,
        number,
        empty
      };
    },

    unload() {
      return {...init()};
    }
  },
};
export default Model;

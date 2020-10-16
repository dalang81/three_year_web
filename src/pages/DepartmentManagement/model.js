import {AdminControllerApi, Department} from 'kosmos-libra-api';

const NAME_SPEACE = 'departmentManagement';

const mockDepartment = () => {
  const obj = new Department();
  obj['fullname'] = "mock fullname";
  obj['createdate'] = new Date();
  obj['description'] = "mock description";
  obj['organizationid'] = 0;
  obj['parentid'] = 0;
  return obj;
};


const init = () => ({
  list: [],
  fullnameFilter: null,
  currentPage: 0,

});

const Model = {
  namespace: NAME_SPEACE,
  state: {...init()},

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
        } = yield call(() => service.getAdminDepartments());
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

    * update({payload}, {call, put}) {
      const service = new AdminControllerApi();
      console.log('effects update payload ', payload);
      try {
        yield call(() => service.putAdminDepartment(payload));
        yield put({
          type: 'fetchList',
          payload: {}
        });
      } catch (e) {
        console.log('effects update e ', e);
      }
    },

    * create({payload}, {call, put}) {
      const service = new AdminControllerApi();
      console.log('effects create payload ', payload);
      try {
        yield call(() => service.postAdminDepartment(payload));
        yield put({
          type: 'fetchList',
          payload: {}
        });
      } catch (e) {
        console.log('effects create e ', e);
      }
    },

    * addUser({payload}, {call, put}) {
      const service = new AdminControllerApi();
      console.log('effects addDepartment payload ', {...mockDepartment(), ...payload});
      try {
        yield call(() => service.postAdminDepartment({...mockDepartment(), ...payload}));
      } catch (e) {
        console.log('effects addDepartment e ', e);
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
  }
};


export default Model;

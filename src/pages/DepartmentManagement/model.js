import {AdminControllerApi, Department} from 'kosmos-libra-api';
import {selectSelfFn} from '@/utils/utils';

const NAME_SPACE = 'departmentManagement';
const PAGE_SIZE = 10;
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
  content: [],
  pageable: {},
  totalPages: 0,
  totalElements: 0,
  last: true,
  first: true,
  sort: [],
  numberOfElements: 0,
  size: 10,
  number: 1,
  empty: false,

  fullnameFilter: null,
  currentPage: 0,

});
const selectSelf = selectSelfFn(NAME_SPACE);
const Model = {
  namespace: NAME_SPACE,
  state: {...init()},

  effects: {
    * fetchListByPageNum({payload}, {call, select, put}) {
      const {page} = payload;
      const {fullnameFilter, size: pageSize} = yield select(selectSelf);
      yield put({
        type: 'fetchList',
        payload: {
          page,
          pageSize,
          fullnameFilter,
        },
      });
    },

    * fetchList({payload}, {call, put}) {
      const service = new AdminControllerApi();

      const {page = 0, pageSize = PAGE_SIZE} = payload;
      try {
        const {
          content = [],
          pageable = {},
          totalPages = 0,
          totalElements = 0,
          last = true,
          first = true,
          sort = [],
          numberOfElements = 0,
          size = 10,
          number = 1,
          empty = false
        } = yield call(() => service.getAdminDepartments({page, size: pageSize, sort}));
        console.log('effects fetchList response content');
        console.table(content);
        console.log('content', content,
          'pageable', pageable,
          'totalPages', totalPages,
          'totalElements', totalElements,
          'numberOfElements', numberOfElements,
          'size', size,
          'number', number);
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
            number: number + 1,
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

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
        }); // Login successfullyuccessfully
      } catch (e) {
        console.log('effects fetchList e ', e);
      }
    },


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

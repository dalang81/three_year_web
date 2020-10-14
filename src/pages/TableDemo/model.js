import {message} from 'antd';
import {parse} from 'qs';

const NAME_SPEACE = 'tableDemo';

const init = () => ({
  dataSource : [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ],
});
const Model = {
  namespace: NAME_SPEACE,
  state: {...init()},
  effects: {
  },
  reducers: {
    unload() {
      return {...init()};
    }
  },
};
export default Model;

// import Mock, {Random} from 'mockjs';
const Mock = require('mockjs');
const {Random} = Mock;
const _ = require('lodash');

const genName = () => Mock.mock({
  "gender|1-2": 1,
  "name": Random.cname(),
  "age|18-60": 1,
  "address": Random.county(true)
});


export default {
  // GET POST 可省略
  'GET /api/usermanagement/list': _.chain(20).range().map(() => genName()).value()
};

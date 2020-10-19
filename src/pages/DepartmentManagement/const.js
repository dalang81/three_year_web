const rules = [
  {
    required: true,
    message: '请输入部门全名!',
  },
  {
    max: 20,
    message: '部门全名最大长度20',
  },
  {
    min: 3,
    message: '部门全名最小长度3',
  },
];


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
export {rules, layout};

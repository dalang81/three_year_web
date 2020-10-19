import React, {useState, useCallback} from 'react';
import {Form, Input, Modal, Button} from 'antd';
import {layout, rules} from './const';
import {connect} from 'umi';

const SearchForm = props => {
  const {fullnameFilter, doSearch, doCreate} = props;
  const [form] = Form.useForm();
  const onSearch = v => doSearch && doSearch(v);
  const onCreate = v => doCreate && doCreate(v);
  return <Form
    {...layout}
    form={form}
    name="basic"
    initialValues={{fullnameFilter}}
    //  onFinish={v => onFinish && onFinish(v)}
    //  onFinishFailed={onFinishFailed}
  >
    {/*<Form.Item
      label="全名"
      name="fullnameFilter"
    ><Input/></Form.Item>*/}
    <Input.Search name={"fullnameFilter"}
                  placeholder="关键字(后端尚不支持)"
                  onSearch={onSearch}
                  style={{width: 200, marginBottom: '30px'}}/>

    <Button type="primary" style={{marginLeft: '30px'}} onClick={onCreate}>新建</Button>
  </Form>;
};


export default connect(({departmentManagement: {fullnameFilter}}) => ({
  fullnameFilter
}))(SearchForm);



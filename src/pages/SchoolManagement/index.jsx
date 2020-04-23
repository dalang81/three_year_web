import {PageHeaderWrapper} from '@ant-design/pro-layout';
import React, {useEffect} from 'react';
import {connect} from 'umi';
import {Table} from 'antd';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const SchoolManagement = props => {
  const {list, fetching, dispatch} = props;

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'userManagement/fetch',
      });
    }
  }, []);

  console.log(' UserManagement userList ');
  console.table(list);

  return <PageHeaderWrapper>
    <Table columns={columns} dataSource={list} loading={fetching}/>
  </PageHeaderWrapper>;
};

export default connect(({userManagement, loading}) => ({
  fetching: loading.effects['userManagement/fetch'],
  list: userManagement.userList
}))(SchoolManagement);

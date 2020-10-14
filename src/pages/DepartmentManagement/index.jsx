import {connect} from 'umi';
import {Button, Divider, message, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';


const DepartmentManagement = props => {
  const {loading, content} = props;
  const [createModalVisible, handleCreateModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});

  const columns = [
    {
      title: '全名',
      key: 'fullname',
      dataIndex: 'fullname',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setUpdateFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical"/>
          <a href="">删除</a>
        </>
      ),
    },
  ];

  useEffect(() => {
    const {dispatch} = props;
    if (dispatch) {
      dispatch({
        type: 'departmentManagement/fetchList',
        payload: {}
      });
    }
    return () => dispatch && dispatch({type: 'departmentManagement/unload'});
  }, []);

  return <PageContainer>
    <Table columns={columns} dataSource={content}/>
  </PageContainer>;
};


export default connect(({departmentManagement: {content}, loading}) => ({
  content,
  submitting: loading.effects['departmentManagement/fetchList'],
}))(DepartmentManagement);

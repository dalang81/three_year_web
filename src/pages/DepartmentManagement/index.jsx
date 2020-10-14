import {connect} from 'umi';
import {Button, Divider, message, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';


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
      //  valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      // valueType: 'option',
      render: (t, r, i) => (
        <>
          <a onClick={() => {
            console.log('  handleCreateModalVisible ', handleCreateModalVisible);
            handleCreateModalVisible(true);
          }}
          >新建</a>
          <Divider type="vertical"/>
          <a onClick={() => {
            console.log('  handleUpdateModalVisible ', handleUpdateModalVisible);
            handleUpdateModalVisible(true);
            setUpdateFormValues(r);
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

  const onFinish = v => {
    console.log(' onFinish v ', v);
    const {dispatch} = props;

    dispatch && dispatch({
      type: 'departmentManagement/update',
      payload: {...v}
    });

  };

  useEffect(() => {
    const {dispatch} = props;

    dispatch && dispatch({
      type: 'departmentManagement/fetchList',
      payload: {}
    });
    return () => dispatch && dispatch({type: 'departmentManagement/unload'});
  }, []);

  return <PageContainer>
    <Table columns={columns} dataSource={content} loading={loading}/>
    <CreateForm
      modalVisible={createModalVisible}
      onCancel={() => handleCreateModalVisible(false)}
    />
    <UpdateForm
      onFinish={v => onFinish(v)}
      modalVisible={updateModalVisible}
      values={updateFormValues}
      onCancel={() => handleUpdateModalVisible(false)}
    />
  </PageContainer>;
};


export default connect(({departmentManagement: {content}, loading}) => ({
  content,
  submitting: loading.effects['departmentManagement/fetchList'],
}))(DepartmentManagement);

import {connect} from 'umi';
import {Button, Divider, message, Table} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';


const DepartmentManagement = props => {
  const {loading, content, number, size, totalElements} = props;
  const [createModalVisible, handleCreateModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});

  console.log(' DepartmentManagement number, size, totalElements ', number, size, totalElements);
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
            handleCreateModalVisible(true);
          }}
          >新建</a>
          <Divider type="vertical"/>
          <a onClick={() => {
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

  const doUpdate = v => {
    console.log(' doUpdate v ', v);
    const {dispatch} = props;

    dispatch && dispatch({
      type: 'departmentManagement/update',
      payload: {...v}
    });
    handleUpdateModalVisible(false);
  };

  const doCreate = v => {
    console.log(' doCreate v ', v);
    const {dispatch} = props;

    dispatch && dispatch({
      type: 'departmentManagement/create',
      payload: {...v}
    });
    handleCreateModalVisible(false);
  };

  const changePageNumber = useCallback((pageNum) => {
    const {dispatch} = props;
    dispatch({
      type: 'departmentManagement/fetchListByPageNum',
      payload: {
        page: pageNum - 1,
      },
    });
  }, []);

  useEffect(() => {
    const {dispatch} = props;

    dispatch && dispatch({
      type: 'departmentManagement/fetchList',
      payload: {}
    });
    return () => dispatch && dispatch({type: 'departmentManagement/unload'});
  }, []);

  return <PageContainer>
    <Table
      columns={columns}
      dataSource={content}
      loading={loading}
      pagination={{
        showSizeChanger: false,
        showQuickJumper: false,
        pageSize: size,
        current: number,
        total: totalElements,
        onChange: pageNum => changePageNumber(pageNum),
      }}
    />
    <CreateForm
      modalVisible={createModalVisible}
      onOk={values => doCreate(values)}
      onCancel={() => handleCreateModalVisible(false)}
    />
    <UpdateForm
      modalVisible={updateModalVisible}
      values={updateFormValues}
      onOk={values => doUpdate(values)}
      onCancel={() => handleUpdateModalVisible(false)}
    />
  </PageContainer>;
};


export default connect(({departmentManagement: {content, number, size, totalElements}, loading}) => ({
  content,
  submitting: loading.effects['departmentManagement/fetchList'],
  number, size, totalElements,
}))(DepartmentManagement);

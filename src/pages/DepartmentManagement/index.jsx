import {connect} from 'umi';
import {Button, Divider, message, Table} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import SearchForm from './SearchForm';


const DepartmentManagement = props => {
  const {loading, content, number, size, totalElements} = props;
  const [createModalVisible, handleCreateModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});

  console.log(' DepartmentManagement number, size, totalElements ', number, size, totalElements);


  const doUpdate = v => {
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

  const doSearch = v => {
    console.log(' doSearch v ', v);
    const {dispatch} = props;

    dispatch && dispatch({
      type: 'departmentManagement/fetchListByCondition',
      payload: {fullnameFilter: v}
    });
  };

  const changePageNumber = pageNum => {
    const {dispatch} = props;
    dispatch({
      type: 'departmentManagement/fetchListByPageNum',
      payload: {
        page: pageNum - 1,
      },
    });
  };

  const hideCreateModel = () => handleCreateModalVisible(false);
  const showCreateModel = () => handleCreateModalVisible(true);

  const hideUpdateModel = () => handleUpdateModalVisible(false);
  const showUpdateModel = r => {
    handleUpdateModalVisible(true);
    setUpdateFormValues(r);
  };
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
          {/*<a key={'create'} onClick={showCreateModel}>新建</a>
          <Divider key={'d1'} type="vertical"/>*/}
          <a key={'update'} onClick={() => showUpdateModel(r)}> 编辑 </a>
          <Divider key={'d2'} type="vertical"/>
          <a key={'delete'} href="">删除</a>
        </>
      ),
    },
  ];
  useEffect(() => {
    const {dispatch} = props;

    dispatch && dispatch({
      type: 'departmentManagement/fetchList',
      payload: {}
    });
    return () => dispatch && dispatch({type: 'departmentManagement/unload'});
  }, []);

  return <PageContainer>
    <SearchForm doSearch={doSearch} doCreate={showCreateModel}/>
    <Table
      rowKey={'id'}
      columns={columns}
      dataSource={content}
      loading={loading}
      pagination={{
        showSizeChanger: false,
        showQuickJumper: false,
        pageSize: size,
        current: number + 1,
        total: totalElements,
        onChange: changePageNumber,
      }}
    />
    <CreateForm
      modalVisible={createModalVisible}
      onOk={doCreate}
      onCancel={hideCreateModel}
    />
    <UpdateForm
      modalVisible={updateModalVisible}
      values={updateFormValues}
      onOk={doUpdate}
      onCancel={hideUpdateModel}
    />
  </PageContainer>;
};


export default connect(({departmentManagement: {content, number, size, totalElements}, loading}) => ({
  content,
  submitting: loading.effects['departmentManagement/fetchList'],
  number, size, totalElements,
}))(DepartmentManagement);

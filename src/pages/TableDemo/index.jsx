import {Table} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import {connect} from 'umi';


const TableDemo = props => {
  const {dataSource} = props;
  // const [createModalVisible, handleCreateModalVisible] = useState(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  // const [updateFormValues, setUpdateFormValues] = useState({});
  // const actionRef = useRef();
  // const [selectedRowsState, setSelectedRows] = useState([]);
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
    }
  ];

  // useEffect(() => {
  //   const {dispatch} = props;
  //   if (dispatch) {
  //     dispatch({
  //       type: 'userManagement/fetchList',
  //       payload: {}
  //     });
  //   }
  //   return () => dispatch && dispatch({type: 'userManagement/unload'});
  // }, []);
  return <PageContainer>
    <Table dataSource={dataSource} columns={columns}/>
  </PageContainer>;
};

export default connect(({tableDemo: {dataSource}}) => ({
  dataSource
}))(TableDemo);

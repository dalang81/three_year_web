import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message, Input} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {queryRule, updateRule, addRule, removeRule} from './service';
import {connect} from 'umi';

/**
 * 添加节点
 * @param fields
 */

const handleAdd = (props, payload) => {
  const {dispatch} = props;
  console.log(' handleAdd fields ', payload);
  if (dispatch) {
    dispatch({
      type: 'userManagement/addUser',
      payload
    });
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const UserManagement = props => {
  const {loading, content} = props;
  const [createModalVisible, handleCreateModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      rules: [
        {
          required: true,
          message: '用户名为必填项',
        },
      ],
    },
    {
      title: '全名',
      key: 'fullname',
      dataIndex: 'fullname',
    },
    {
      title: '身份证',
      key: 'identity',
      dataIndex: 'identity',
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
        type: 'userManagement/fetchList',
        payload: {}
      });
    }
    return () => dispatch && dispatch({type: 'userManagement/unload'});
  }, []);
  return <PageContainer>
    <ProTable
      headerTitle="用户列表"
      actionRef={actionRef}
      rowKey="username"
      options={{
        fullScreen: true,
        reload: false,
        setting: false,
        density: false,
        search: {onSearch: str => console.log('str:', str), name: 'n1'}
      }}
      toolBarRender={() => [
        <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
          <PlusOutlined/> 新建
        </Button>,
      ]}
      //   request={(params, sorter, filter) => queryRule({...params, sorter, filter})}
      dataSource={content}
      loading={loading}
      columns={columns}
      rowSelection={{
        onChange: (_, selectedRows) => setSelectedRows(selectedRows),
      }}
    />
    {selectedRowsState?.length > 0 && (
      <FooterToolbar
        extra={
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowsState.length}
            </a>{' '}
            项&nbsp;&nbsp;
            <span>
              </span>
          </div>
        }
      >
        <Button
          onClick={async () => {
            await handleRemove(selectedRowsState);
            setSelectedRows([]);
            actionRef.current?.reloadAndRest();
          }}
        >
          批量删除
        </Button>
      </FooterToolbar>
    )}
    <CreateForm
      onCancel={() => handleCreateModalVisible(false)}
      modalVisible={createModalVisible}>
      <ProTable
        onSubmit={(value) => {
          const success = handleAdd(props, value);

          if (success) {
            handleCreateModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        rowKey="key"
        type="form"
        columns={columns}
        rowSelection={{}}
      />
    </CreateForm>
    <UpdateForm
      onCancel={() => handleUpdateModalVisible(false)}
      modalVisible={updateModalVisible}
    >
      <ProTable
        onSubmit={(value) => {
          const success = handleUpdate(props, value);
          if (success) {
            handleUpdateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        form={{initialValues: updateFormValues}}
        rowKey="key"
        type="form"
        columns={columns}
        rowSelection={{}}
      />
    </UpdateForm>
  </PageContainer>;
};

export default connect(({userManagement: {content}, loading}) => ({
  content,
  submitting: loading.effects['userManagement/fetchList'],
}))(UserManagement);

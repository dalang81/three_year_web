import React from 'react';
import {Modal, Form, Input} from 'antd';
import {layout, rules} from '@/pages/DepartmentManagement/const';

const CreateForm = (props) => {
  const {modalVisible, onCancel, onOk} = props;
  const [form] = Form.useForm();
  return (
    <Modal
      destroyOnClose
      getContainer={false}
      title="新建部门"
      visible={modalVisible}
      onOk={async () => {
        await form.validateFields();
        onOk && onOk({...form.getFieldsValue()});
        form.resetFields();
      }}
      onCancel={() => onCancel()}
      // footer={null}
    >
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{}}
        // onFinish={onFinish}
        //  onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="全名"
          name="fullname"
          rules={rules}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="描述"
          name="description"
        >
          <Input.TextArea/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;

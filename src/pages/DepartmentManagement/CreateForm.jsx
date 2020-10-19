import React from 'react';
import {Modal, Form, Input} from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const CreateForm = (props) => {
  const {modalVisible, onCancel, onOk} = props;
  const [form] = Form.useForm();
  return (
    <Modal
      destroyOnClose={true}
      title="新建部门"
      visible={modalVisible}
      onOk={() => {
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
          rules={[
            {
              required: true,
              message: '请输入部门全名!',
            },
          ]}
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

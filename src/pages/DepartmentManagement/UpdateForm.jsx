import React, {useState} from 'react';
import {Modal, Form, Input} from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const UpdateForm = (props) => {
  const {modalVisible, onOk, onCancel, values} = props;
  const [form] = Form.useForm();
  form.setFieldsValue(values);
  console.log(' UpdateForm values ', values);
  return (
    <Modal
      destroyOnClose={true}
      title="编辑部门"
      visible={modalVisible}
      onOk={() => {
        form.validateFields().then(msg => {
          onOk && onOk({...values, ...form.getFieldsValue()});
          form.resetFields();
        })
        ;

      }}
      onCancel={() => onCancel()}
      // footer={null}
    >
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{...values}}
        //  onFinish={v => onFinish && onFinish(v)}
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

export default UpdateForm;

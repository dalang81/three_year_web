import React, {useState} from 'react';
import {Modal, Form, Input} from 'antd';
import {layout, rules} from '@/pages/DepartmentManagement/const';

const UpdateForm = (props) => {
  const {modalVisible, onOk, onCancel, values} = props;
  const [form] = Form.useForm();
  form.setFieldsValue(values);
  console.log(' UpdateForm values ', values);
  return (
    <Modal
      getContainer={false}
      destroyOnClose
      title="编辑部门"
      visible={modalVisible}
      onOk={async () => {
        await form.validateFields();
        onOk && onOk({...values, ...form.getFieldsValue()});
        form.resetFields();
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

export default UpdateForm;

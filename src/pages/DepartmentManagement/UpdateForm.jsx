import React from 'react';
import {Modal} from 'antd';


const UpdateForm = (props) => {
  const {modalVisible, onCancel, values} = props;
  console.log(' UpdateForm values ', values);
  return (
    <Modal
      destroyOnClose
      title="编辑部门"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default UpdateForm;

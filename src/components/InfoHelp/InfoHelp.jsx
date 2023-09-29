import React, { useState } from 'react';
import { Modal, FloatButton } from 'antd';
import { useHistory } from 'react-router-dom';

const InfoHelp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const text = () => {
    return history.location.pathname;
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <FloatButton tooltip={'Helper'} onClick={showModal} />
      <Modal
        footer={false}
        title={text()}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Modal content goes here.</p>
      </Modal>
    </div>
  );
};

export default InfoHelp;

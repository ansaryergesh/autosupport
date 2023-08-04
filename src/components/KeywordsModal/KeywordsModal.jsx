import React, { useState } from 'react';
import { Modal } from 'antd';
import Button from '../Button/Button';
import Input from '../Input/Input';

const KeywordsModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Редактировать
      </Button>
      <Modal
        title="Edit keyword"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: 'button-primary' }}
        cancelButtonProps={{ className: 'button-default' }}>
        <Input />
      </Modal>
    </>
  );
};

export default KeywordsModal;

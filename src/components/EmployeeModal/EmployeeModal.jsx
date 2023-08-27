import React, { useState } from 'react';
import { Modal, Form, Select } from 'antd';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import { i18n } from 'utils/i18next.js';

const optionsRole = [
  {
    value: 'Superadmin',
    label: 'Superadmin'
  },
  {
    value: 'Admin',
    label: 'Admin'
  },
  {
    value: 'Manager',
    label: 'Manager'
  }
];

const optionsComp = [{ value: 'Freedom', label: 'Freedom' }];

const EmployeeModal = ({ btnName, margin = 0, btnType }) => {
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
      <Button
        style={{ marginBottom: `${margin}px` }}
        type={btnType ? `${btnType}` : 'primary'}
        onClick={showModal}>
        {btnName}
      </Button>

      <Modal
        title={i18n.t('actions.addEmployee')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: 'button-modal' }}
        cancelButtonProps={{ className: 'button-default' }}>
        <Form layout="vertical">
          <Form.Item required>
            <Input placeholder={i18n.t('columns.fullName')} />
          </Form.Item>

          <Form.Item required>
            <Input placeholder={i18n.t('columns.email')} />
          </Form.Item>

          <Form.Item required>
            <Select
              options={optionsRole}
              placeholder={i18n.t('columns.role')}
            />
          </Form.Item>

          <Form.Item required>
            <Select
              options={optionsComp}
              placeholder={i18n.t('organization')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EmployeeModal;

import React, { useState } from 'react';
import { Modal, Form, Select } from 'antd';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';

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

const EmployeeModal = ({ btnName, margin = 0 }) => {
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
        type="primary"
        onClick={showModal}>
        {btnName}
      </Button>
      <Modal
        title="Add new employee"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item required label="Full Name">
            <Input placeholder="Full name of the employee" />
          </Form.Item>
          <Form.Item required label="Email">
            <Input placeholder="Email of the employee" />
          </Form.Item>
          <Form.Item required label="Role">
            <Select options={optionsRole} placeholder="Select a role" />
          </Form.Item>
          <Form.Item required label="Company">
            <Select options={optionsComp} placeholder="Select a company" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EmployeeModal;

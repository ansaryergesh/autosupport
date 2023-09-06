import React, { useState } from 'react';
import { Modal, Form, Select, notification } from 'antd';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import { i18n } from 'utils/i18next.js';
import { postEmployeeData } from '../../service/Employee/index.js';



const optionsRole = [
  {
    value: 'Superadmin',
    label: 'Superadmin',
  },
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Manager',
    label: 'Manager',
  },
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

  const onFinish = (values) => {
    const data = {
      "login": values.email,
      "firstName": values.firstName,
      "lastName": values.lastName,
      "email": values.email,
      "authorities": [
        values.authorities
      ],
      "authOrganization": {
        "name": "string",
        "code": "string"
      },
      "password": "string"
    }
    console.log(data);
    console.log('submited')
    postEmployeeData(data).then(res => {
      console.log(res);
      notification.info({ message: 'Employee created' })
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Button
        style={{ marginBottom: `${margin}px` }}
        type={btnType ? `${btnType}` : 'primary'}
        onClick={showModal}
      >
        {btnName}
      </Button>

      <Modal
        title={i18n.t('actions.addEmployee')}
        visible={isModalOpen}
        onOk={handleOk}
        cancelText={i18n.t('actions.cancel')}
        onCancel={handleCancel}
        okButtonProps={{ className: 'button-modal' }}
        cancelButtonProps={{ className: 'button-default' }}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical">
          <Form.Item
            name='firstName'
            required>
            <Input
              placeholder={i18n.t('columns.fullName')}
            />
          </Form.Item>

          <Form.Item
            name='lastName'
            required>
            <Input
              placeholder={i18n.t('columns.lastName')}
            />
          </Form.Item>

          <Form.Item
            name='email'
            required>
            <Input
              placeholder={i18n.t('columns.email')}
            />
          </Form.Item>
          <Form.Item
            name='password'
            required>
            <Input
              placeholder={i18n.t('columns.password')}
            />
          </Form.Item>

          <Form.Item
            name='authorities'
            required>
            <Select
              options={optionsRole}
              placeholder={i18n.t('columns.role')}
            />
          </Form.Item>

          <Form.Item
            name='authOrganization'
            required>
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

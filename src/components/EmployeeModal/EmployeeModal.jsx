import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, notification } from 'antd';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import { i18n } from 'utils/i18next.js';
import { getAllOrganizations, getAllRoles, manageEmployee } from '../../service/Employee/index.js';

const initialData = {
  id: 0,
  login: '',
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  activated: true,
  langKey: '',
  createdBy: '',
  createdDate: '',
  lastModifiedBy: '',
  lastModifiedDate: '',
  authority: '',
  authOrganization: {
    name: '',
    code: '',
  },
  password: '',
};

const EmployeeModal = ({ btnName, margin = 0, btnType }) => {
  const [roles, setRoles] = useState();
  const [organizations, setOrganizations] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    const transformedValues = {
      ...values,
      authOrganization: JSON.parse(values.authOrganization),
    };

    manageEmployee({ ...transformedValues }).then((res) => {
      console.log(res);
      notification.info({ message: 'Employee added' });
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    getAllRoles().then((res) => {
      const optionRole = res.data.map((option) => ({
        label: option,
        value: option,
      }));
      setRoles(optionRole);
    });

    getAllOrganizations().then((res) => {
      setOrganizations(res.data);
    });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // onFinish();
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        okButtonProps={{ className: 'button-modal', form: 'form', htmlType: 'submit' }}
        cancelButtonProps={{ className: 'button-default' }}
      >
        <Form
          form={form}
          id="form"
          onFinish={onFinish}
          initialValues={initialData}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item name="firstName" required>
            <Input placeholder={i18n.t('columns.firstName')} />
          </Form.Item>

          <Form.Item name="lastName" required>
            <Input placeholder={i18n.t('columns.lastName')} />
          </Form.Item>

          <Form.Item name="email" required>
            <Input placeholder={i18n.t('columns.email')} />
          </Form.Item>
          <Form.Item name="login" required>
            <Input placeholder={i18n.t('columns.email')} />
          </Form.Item>

          <Form.Item name="password" required>
            <Input placeholder={i18n.t('columns.password')} />
          </Form.Item>

          <Form.Item name="authority" required>
            <Select options={roles} placeholder={i18n.t('columns.role')} />
          </Form.Item>

          <Form.Item name="authOrganization" required>
            <Select placeholder={i18n.t('columns.organization')}>
              {organizations &&
                organizations.map((item) => (
                  <Select.Option key={item.code} value={JSON.stringify(item)}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EmployeeModal;

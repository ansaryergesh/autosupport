import { Col, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import Title from 'antd/lib/typography/Title.js';
import Input from '../../../components/Input/Input';
import { getAccountData } from '../../../service/Profile';
import { i18n } from '../../../utils/i18next.js';


const initialData = {
  id: 1,
  login: 'super_admin',
  firstName: 'Super Administrator',
  lastName: 'Super Administrator',
  email: 'super_admin@localhost',
  imageUrl: '',
  activated: true,
  langKey: 'ru',
  createdBy: 'system',
  createdDate: null,
  lastModifiedBy: 'system',
  lastModifiedDate: null,
  authorities: ['ROLE_SUPER_ADMIN'],
  authOrganization: null,
};

const UserData = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    getAccountData().then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Form layout="vertical">
      <Col span={12}>
        <Title level={2}>{i18n.t('userProfile.userDataTitle')}</Title>
        <Form.Item name="login" label={i18n.t('userProfile.loginLabel')}>
          <Input defaultValue={data.login} readOnly />
        </Form.Item>
        <Form.Item name="firstName" label={i18n.t('userProfile.firstNameLabel')}>
          <Input defaultValue={data.firstName} readOnly />
        </Form.Item>
        <Form.Item name="lastName" label={i18n.t('userProfile.lastNameLabel')}>
          <Input defaultValue={data.lastName} readOnly />
        </Form.Item>
        <Form.Item name="authOrganization" label={i18n.t('userProfile.organizationLabel')}>
          <Input defaultValue={data.authOrganization} readOnly />
        </Form.Item>
      </Col>
    </Form>
  );
};

export default UserData;

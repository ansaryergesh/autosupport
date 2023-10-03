import { Col, Form, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import Title from 'antd/lib/typography/Title.js';
import Input from '../../../components/Input/Input';
import { changePassword, getAccountData } from '../../../service/Profile';
import Button from 'components/Button/Button.jsx';
import styles from '../index.module.less';
import { i18n } from '../../../utils/i18next.js';

const AccountData = () => {
  // const initialData = {
  //   id: 1,
  //   login: 'super_admin',
  //   firstName: 'Super Administrator',
  //   lastName: 'Super Administrator',
  //   email: 'super_admin@localhost',
  //   imageUrl: '',
  //   activated: true,
  //   langKey: 'ru',
  //   createdBy: 'system',
  //   createdDate: null,
  //   lastModifiedBy: 'system',
  //   lastModifiedDate: null,
  //   authorities: ['ROLE_SUPER_ADMIN'],
  //   authOrganization: null,
  // };
  const [data, setData] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    getAccountData().then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = (values) => {
    const data = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    };
    changePassword(data).then(() => {
      notification.info({
        message: `${i18n.t('userProfile.passwordUpdateNotification')}`
      });
    });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={data}>
      <Col span={12}>
        <Title level={2}>{i18n.t('userProfile.accountDataTitle')}</Title>
        <Form.Item name="id" label={i18n.t('userProfile.idLabel')}>
          <Input
            defaultValue={data?.id}
            readOnly
            className={styles.customPlaceholder}
          />
        </Form.Item>
        <Form.Item name="email" label={i18n.t('userProfile.emailLabel')}>
          <Input defaultValue={data?.email} readOnly />
        </Form.Item>
        <Form.Item
          name="langKey"
          label={i18n.t('userProfile.languageKeyLabel')}>
          <Input defaultValue={data?.langKey} readOnly />
        </Form.Item>
        <Form.Item name="createdBy" label={i18n.t('userProfile.creatorLabel')}>
          <Input defaultValue={data?.createdBy} readOnly />
        </Form.Item>
        <Form.Item
          name="currentPassword"
          label={i18n.t('userProfile.currentPasswordLabel')}
          rules={[{ message: 'Please input your password!' }]}>
          <Input.Password
            type="password"
            placeholder={i18n.t('userProfile.currentPasswordPlaceholder')}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={i18n.t('userProfile.newPasswordLabel')}
          dependencies={['password']}
          rules={[{ message: 'Please input your password!' }]}>
          <Input.Password
            type="password"
            placeholder={i18n.t('userProfile.newPasswordPlaceholder')}
          />
        </Form.Item>
        <Button
          style={{ float: 'right' }}
          className={styles.inputButton}
          type="submit"
          htmlType="submit">
          {i18n.t('userProfile.saveButton')}
        </Button>
      </Col>
    </Form>
  );
};

export default AccountData;

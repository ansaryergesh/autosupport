import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, notification } from 'antd';
import Input from '../Input/Input.jsx';
import { i18n } from 'utils/i18next.js';
import {
  getAllOrganizations,
  getAllRoles,
  getEmployeeData,
  manageEmployee
} from '../../service/Employee/index.js';
import { LANG_KEY } from '../../constants/index.js';
import { checkPermissions } from '../../helpers/checkPermission.js';
import { getCurrentUserData } from '../../helpers/currentUser.js';

const initialData = {
  id: null,
  login: '',
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  activated: true,
  langKey: undefined,
  createdBy: '',
  createdDate: '',
  lastModifiedBy: '',
  lastModifiedDate: '',
  authority: '',
  authOrganization: {
    name: undefined,
    code: undefined
  },
  password: null
};
const langKey = [
  { label: LANG_KEY.RU, value: LANG_KEY.RU },
  { label: LANG_KEY.KZ, value: LANG_KEY.KZ },
  { label: LANG_KEY.EN, value: LANG_KEY.EN }
];

const EmployeeModal = ({
  record = initialData,
  handleModal,
  isModalOpen = false,
  getEmployeeList
}) => {
  const [roles, setRoles] = useState();
  const [organizations, setOrganizations] = useState();
  const [form] = Form.useForm();
  const editPage = record.id;
  const [employeeData, setEmployeeData] = useState(initialData);

  useEffect(() => {
    form.setFieldsValue(employeeData);
  }, [employeeData, form]);

  useEffect(() => {
    if (editPage) {
      getEmployeeData(editPage)
        .then((res) => {
          setEmployeeData(res.data);
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных о сотруднике:', error);
        });
    }
  }, [editPage]);

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record, form]);

  const onFinish = (values) => {
    const finalOrg = () => {
      try {
        return JSON.parse(values.authOrganization);
      } catch (err) {
        return getCurrentUserData().authOrganization;
      }
    };
    const transformedValues = {
      ...values,
      login: values.email,
      authOrganization: editPage ? null : finalOrg()
    };

    let finalData;

    if (editPage) {
      finalData = values;
    } else {
      finalData = transformedValues;
    }

    manageEmployee(finalData)
      .then(() => {
        if (editPage) {
          notification.success({
            message: i18n.t('actions.edited')
          });
        } else {
          notification.success({
            message: i18n.t('actions.added')
          });
        }
        handleModal();
      })
      .finally(() => {
        form.resetFields();
        getEmployeeList(1, 10);
      });
  };

  useEffect(() => {
    getAllRoles().then((res) => {
      const optionRole = res.data.map((option) => ({
        label: option,
        value: option
      }));
      setRoles(optionRole);
    });

    checkPermissions(['ROLE_SUPER_ADMIN']) &&
      getAllOrganizations().then((res) => {
        setOrganizations(res.data);
      });
  }, []);

  return (
    <Modal
      title={editPage ? i18n.t('actions.edit') : i18n.t('actions.add')}
      open={isModalOpen}
      onCancel={() => {
        form.resetFields();
        handleModal();
      }}
      cancelText={i18n.t('actions.cancel')}
      okButtonProps={{
        className: 'button-modal',
        form: 'form',
        htmlType: 'submit'
      }}
      cancelButtonProps={{ className: 'button-default' }}>
      <Form
        autocomplete="off"
        form={form}
        id="form"
        onFinish={onFinish}
        initialValues={record}
        layout="vertical">
        {editPage ? (
          <>
            <Form.Item
              name="langKey"
              rules={[
                { required: true, message: i18n.t('rule.langKeyRequired') }
              ]}>
              <Select
                name="langKey"
                style={{ marginTop: '15px' }}
                options={langKey}
              />
            </Form.Item>

            <Form.Item style={{ display: 'none' }} name="id">
              <Input />
            </Form.Item>
          </>
        ) : null}

        {editPage ? null : (
          <>
            {checkPermissions(['ROLE_SUPER_ADMIN']) && (
              <Form.Item
                label={i18n.t('columns.organization')}
                name="authOrganization"
                rules={[
                  {
                    required: checkPermissions(['ROLE_SUPER_ADMIN']),
                    message: i18n.t('rule.organizationRequired')
                  }
                ]}>
                <Select placeholder={i18n.t('columns.organization')}>
                  {organizations &&
                    organizations.map((item) => (
                      <Select.Option
                        key={item.code}
                        value={JSON.stringify(item)}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: i18n.t('rule.nameRequired') }
              ]}>
              <Input
                style={{ marginTop: '15px' }}
                placeholder={i18n.t('columns.firstName')}
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: i18n.t('rule.lastNameRequired') }
              ]}>
              <Input placeholder={i18n.t('columns.lastName')} />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: i18n.t('rule.emailError')
                },
                {
                  required: true,
                  message: i18n.t('rule.emailRequired')
                }
              ]}>
              <Input placeholder={i18n.t('columns.email')} />
            </Form.Item>

            <Form.Item style={{ display: 'none' }} name="login" required>
              <Input placeholder={i18n.t('columns.email')} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: i18n.t('rule.passwordRequired') }
              ]}>
              <Input type="password" placeholder={i18n.t('columns.password')} />
            </Form.Item>

            <Form.Item
              label={''}
              name="langKey"
              rules={[
                { required: true, message: i18n.t('rule.langKeyRequired') }
              ]}>
              <Select
                name="langKey"
                options={langKey}
                placeholder={i18n.t('columns.langKey')}
              />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="authority"
          rules={[{ required: true, message: i18n.t('rule.roleRequired') }]}>
          <Select
            placeholder={i18n.t('columns.role')}
            options={
              (roles &&
                roles.filter((role) => role.value !== 'ROLE_SUPER_ADMIN')) ||
              []
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeModal;

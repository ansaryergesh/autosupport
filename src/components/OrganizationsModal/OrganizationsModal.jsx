import React, { useState, useEffect } from 'react';
import { Form, Modal, notification } from 'antd';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
import { manageOrganization } from '../../service/Organizations/index.js';
import { initialValues } from '../../pages/Organizations/constants.js';
import { i18n } from '../../utils/i18next';

const OrganizationsModal = ({
  isModalOpen = false,
  handleModal = () => {},
  getList = () => {},
  record = initialValues,
}) => {
  const [loading, setLoading] = useState(false);
  const editPage = record.code;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record, form]);

  const handleSubmit = (values) => {
    setLoading(true);
    manageOrganization(values)
      .then((res) => {
        handleModal();
        getList();
        if (res.data) {
          notification.success({
            message: editPage ? i18n.t('actions.edited') : i18n.t('actions.added'),
          });
        }
      })
      .finally(() => {
        setLoading(false);
        form.resetFields();
      });
  };
  return (
    <>
      <Modal
        title={editPage ? i18n.t('actions.editOrganization') : i18n.t('actions.addOrganization')}
        confirmLoading={loading}
        open={isModalOpen}
        cancelText={i18n.t('actions.cancel')}
        onCancel={() => {
          form.resetFields();
          handleModal();
        }}
        okButtonProps={{
          className: 'button-modal',
          htmlType: 'submit',
          form: 'form',
        }}
        cancelButtonProps={{ className: 'button-default' }}
      >
        <Form
          form={form}
          id="form"
          layout="vertical"
          onFinish={(values) => {
            handleSubmit(values);
          }}
          initialValues={record}
        >
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item name="code" rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}>
            <Input placeholder={i18n.t('columns.code')} />
          </Form.Item>
          <Form.Item name="name" rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}>
            <Input placeholder={i18n.t('organization')} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

OrganizationsModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  getList: PropTypes.func,
  record: PropTypes.object,
};

export default OrganizationsModal;

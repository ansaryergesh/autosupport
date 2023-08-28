import React, { useEffect, useState } from 'react';
import { Form, Modal, notification } from 'antd';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
import { manageKeyword } from '../../service/Keywords/index.js';
import { initialValues } from '../../pages/Keywords/constants.js';
import { i18n } from '../../utils/i18next';

const KeywordsModal = ({
  isModalOpen = false,
  handleModal = () => {},
  getList = () => {},
  record = initialValues
}) => {
  const [loading, setLoading] = useState(false);
  const editPage = record.id;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record, form]);

  const handleSubmit = (values) => {
    setLoading(true);
    manageKeyword(values)
      .then((res) => {
        handleModal();
        getList();
        if (res.data) {
          notification.success({
            message: editPage
              ? i18n.t('actions.edited')
              : i18n.t('actions.added')
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
        title={
          editPage
            ? i18n.t('actions.editKeyword')
            : i18n.t('actions.addKeyword')
        }
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
          form: 'form'
        }}
        cancelButtonProps={{ className: 'button-default' }}>
        <Form
          form={form}
          id="form"
          layout="vertical"
          onFinish={(values) => {
            handleSubmit(values);
          }}
          initialValues={record}>
          <Form.Item
            name="text"
            rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}>
            <Input placeholder={i18n.t('keyword')} />
          </Form.Item>
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

KeywordsModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  getList: PropTypes.func,
  record: PropTypes.object
};

export default KeywordsModal;

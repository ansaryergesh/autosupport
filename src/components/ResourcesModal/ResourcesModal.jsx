import React, { useState, useEffect } from 'react';
import { Form, Modal, notification } from 'antd';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
import { manageResources } from '../../service/Resources/index.js';
import { initialValues } from '../../pages/Resources/constants.js';

const ResourcesModal = ({
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
    manageResources(values)
      .then((res) => {
        handleModal();
        getList();
        if (res.data) {
          notification.success({ message: 'Запись добавлена' });
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
        title={editPage ? 'Edit resource' : 'Add resource'}
        confirmLoading={loading}
        open={isModalOpen}
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
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: 'Code is required!' }]}>
            <Input placeholder="Code" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Resource is required!' }]}>
            <Input placeholder="Resource name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

ResourcesModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  getList: PropTypes.func,
  record: PropTypes.object
};

export default ResourcesModal;

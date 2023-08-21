import React, { useState, useEffect } from 'react';
import { Form, Modal, notification } from 'antd';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
import { manageTag } from '../../service/Tags/index.js';
import { initialValues } from '../../pages/Tags/constants.js';

const TagsModal = ({
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
    manageTag(values)
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
        title={editPage ? 'Edit tag' : 'Add tag'}
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
          <Form.Item
            name="text"
            rules={[
              {
                required: true,
                message: 'Tag is required'
              }
            ]}>
            <Input placeholder="Tag" />
          </Form.Item>
          <Form.Item name="id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

TagsModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  getList: PropTypes.func,
  record: PropTypes.object
};

export default TagsModal;

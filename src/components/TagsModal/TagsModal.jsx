import React, { useState } from 'react';
import { Form, Modal, notification } from 'antd';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
import { manageTag } from '../../service/Tags/index.js';
import { initialValues } from '../../pages/Tags/constants.js';

const TagsModal = ({
  isModalOpen = false,
  handleModal = () => {},
  getList = () => {},
  record = initialValues,
  setRecord = () => {}
}) => {
  const [loading, setLoading] = useState(false);
  const editPage = record.id;

  const handleSubmit = () => {
    setLoading(true);
    manageTag(record)
      .then((res) => {
        handleModal();
        getList();
        if (res.data) {
          notification.success({ message: 'Запись добавлена' });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Modal
        title={editPage ? 'Edit tag' : 'Add tag'}
        confirmLoading={loading}
        open={isModalOpen}
        onCancel={handleModal}
        okButtonProps={{
          className: 'button-modal',
          htmlType: 'submit',
          form: 'form'
        }}
        cancelButtonProps={{ className: 'button-default' }}>
        <Form id="form" layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="text"
            rules={[
              {
                required: true,
                message: 'Tag is required'
              }
            ]}>
            <Input
              value={record.text}
              onChange={(e) => setRecord({ ...record, text: e.target.value })}
            />
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
  record: PropTypes.object,
  setRecord: PropTypes.func
};

export default TagsModal;

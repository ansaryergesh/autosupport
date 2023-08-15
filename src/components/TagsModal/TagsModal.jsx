import React, { useState } from 'react';
import { Modal, notification } from 'antd';
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
        onOk={handleSubmit}
        onCancel={handleModal}
        okButtonProps={{ className: 'button-modal' }}
        cancelButtonProps={{ className: 'button-default' }}>
        <Input
          value={record.text}
          onChange={(e) => setRecord({ ...record, text: e.target.value })}
        />
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

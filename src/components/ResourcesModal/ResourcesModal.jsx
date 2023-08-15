import React, { useState } from 'react';
import { Modal, notification } from 'antd';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
import { manageResources } from '../../service/Resources/index.js';
import { initialValues } from '../../pages/Resources/constants.js';

const ResourcesModal = ({
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
    manageResources(record)
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
        title={editPage ? 'Edit resource' : 'Add resource'}
        confirmLoading={loading}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleModal}
        okButtonProps={{ className: 'button-modal' }}
        cancelButtonProps={{ className: 'button-default' }}>
        <Input
          value={record.name}
          onChange={(e) => setRecord({ ...record, name: e.target.value })}
        />
      </Modal>
    </>
  );
};

ResourcesModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  getList: PropTypes.func,
  record: PropTypes.object,
  setRecord: PropTypes.func
};

export default ResourcesModal;

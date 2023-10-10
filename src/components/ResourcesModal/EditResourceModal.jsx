import React, { useState } from 'react';
import { Form, Modal, notification } from 'antd';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import { i18n } from '../../utils/i18next';
// import { initialValues } from '../../pages/Resources/constants';
import { manageResources } from '../../service/Resources';
import Button from '../Button/Button.jsx';

const EditResourceModal = ({ getList, handleEdit, isEditOpen = false, resourceInfo }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setLoading(true);
    manageResources({ ...resourceInfo, ...values }).then(() => {
      handleEdit();
      getList();
      form.resetFields();
      notification.success({ message: i18n.t('actions.edited') }).finally(() => {
        setLoading(false);
      });
    });
  };

  return (
    <Modal
      confirmLoading={loading}
      open={isEditOpen}
      title={i18n.t('actions.editResource')}
      cancelText={i18n.t('actions.cancel')}
      footer={null}
      onCancel={() => {
        handleEdit();
        form.resetFields();
      }}
      cancelButtonProps={{ className: 'button-default' }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ resourceInfo }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="code"
          initialValue={resourceInfo.code}
          rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}
        >
          <Input placeholder={i18n.t('columns.code')} />
        </Form.Item>

        <Form.Item name="id" initialValue={resourceInfo.id} style={{ display: 'none' }}>
          <Input placeholder="id" />
        </Form.Item>

        {resourceInfo?.resourceContents?.map((content, index) => (
          <Form.Item key={index} label={`${i18n.t('columns.name')} ${content.langKey}`}>
            <Form.Item
              initialValue={content?.name}
              name={['resourceContents', index, 'name']}
              rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}
            >
              <Input placeholder={`${i18n.t('menu.enterName')} ${content.langKey}`} />
            </Form.Item>
            <Form.Item
              name={['resourceContents', index, 'langKey']}
              initialValue={content.langKey}
              style={{ display: 'none' }}
            >
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              initialValue={content?.id}
              name={['resourceContents', index, 'id']}
              style={{ marginBottom: 0, display: 'none' }}
            >
              <Input />
            </Form.Item>
          </Form.Item>
        ))}
        <Form.Item labelAlign={'right'}>
          <Button type="primary" htmlType="submit">
            {i18n.t('commons.submit')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
EditResourceModal.propTypes = {
  getList: PropTypes.func,
  handleEdit: PropTypes.func,
  resourceInfo: PropTypes.object,
  record: PropTypes.object,
  isEditOpen: PropTypes.bool,
};

export default EditResourceModal;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../Input/index.js';
import { Form, Modal, notification } from 'antd';
import Button from '../../Button/Button.jsx';
import { initialCategoryContents } from '../constants.js';
import { createCategory } from '../../../service/Category/index.js';
import { i18n } from '../../../utils/i18next.js';

const CategoryCreateModal = ({ isModalOpen = false, handleModal, getCategoryAll }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values) => {
    setLoading(true);
    createCategory({ ...values })
      .then((res) => {
        console.log(res);
        notification.success({ message: i18n.t('actions.added') });
        handleModal();
        getCategoryAll();
        form.resetFields();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title={i18n.t('menu.addCategory')}
      confirmLoading={loading}
      open={isModalOpen}
      footer={null}
      onCancel={() => {
        handleModal();
        form.resetFields();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ initialCategoryContents }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {initialCategoryContents.map((content, index) => (
          <Form.Item key={index} label={`${i18n.t('columns.name')} ${content.langKey}`}>
            <Form.Item
              name={['categorieContents', index, 'name']}
              rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}
              style={{ marginBottom: 0 }}
            >
              <Input placeholder={`${i18n.t('menu.enterName')} ${content.langKey}`} />
            </Form.Item>
            <Form.Item
              name={['categorieContents', index, 'langKey']}
              initialValue={content.langKey}
              style={{ display: 'none' }}
            >
              <Input type="hidden" />
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
CategoryCreateModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  getCategoryAll: PropTypes.func,
};
export default CategoryCreateModal;

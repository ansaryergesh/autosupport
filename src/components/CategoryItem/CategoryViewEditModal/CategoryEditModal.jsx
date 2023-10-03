import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../Input/index.js';
import { Form, Modal, notification } from 'antd';
import Button from '../../Button/Button.jsx';
import { initialCategoryContents } from '../constants.js';
import { editCategory } from '../../../service/Category/index.js';
import { i18n } from '../../../utils/i18next.js';

const CategoryCreateModal = ({
  isModalOpen = false,
  handleModal,
  categoryInfo,
  getCategoryAll
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setLoading(true);
    editCategory({ ...categoryInfo, ...values })
      .then(() => {
        handleModal();
        getCategoryAll();
        form.resetFields();
        notification.success({ message: i18n.t('actions.edited') });
      })
      .finally(() => setLoading(false));
  };

  const { categorieContents } = categoryInfo;

  const mergedCategories = initialCategoryContents?.map((initialCategory) => {
    const existingCategory = categorieContents?.find(
      (item) => item.langKey === initialCategory.langKey
    );

    if (existingCategory) {
      return {
        ...initialCategory,
        name: existingCategory.name,
        id: existingCategory.id
      };
    }

    return initialCategory;
  });
  const finalContent =
    categoryInfo !== {} ? mergedCategories : initialCategoryContents;

  return (
    <Modal
      title={i18n.t('menu.editCategory')}
      confirmLoading={loading}
      open={isModalOpen}
      footer={null}
      onCancel={() => {
        handleModal();
        form.resetFields();
      }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ finalContent }}
        onFinish={handleSubmit}
        autoComplete="off">
        {finalContent?.map((content, index) => (
          <Form.Item
            key={index}
            label={`${i18n.t('columns.name')} ${content.langKey}`}>
            <Form.Item
              initialValue={content?.name}
              name={['categorieContents', index, 'name']}
              rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}
              style={{ marginBottom: 0 }}>
              <Input
                placeholder={`${i18n.t('menu.enterName')} ${content.langKey}`}
              />
            </Form.Item>
            <Form.Item
              name={['categorieContents', index, 'langKey']}
              initialValue={content.langKey}
              style={{ display: 'none' }}>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              initialValue={content?.id}
              name={['categorieContents', index, 'id']}
              style={{ marginBottom: 0, display: 'none' }}>
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
CategoryCreateModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  categoryInfo: PropTypes.object,
  getCategoryAll: PropTypes.func
};
export default CategoryCreateModal;

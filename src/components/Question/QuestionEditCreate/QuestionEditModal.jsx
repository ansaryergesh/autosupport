import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../Input/index.js';
import { Form, Modal, notification } from 'antd';
import Button from '../../Button/Button.jsx';
import { initialQuestion } from '../constants.js';
import { editCategoryQuestion } from '../../../service/Question/index.js';
import { i18n } from '../../../utils/i18next.js';

const QuestionEditModal = ({
  isModalOpen = false,
  handleModal,
  questionInfo,
  getCategoryAll
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values) => {
    setLoading(true);
    editCategoryQuestion({ ...questionInfo, ...values })
      .then(() => {
        notification.success({ message: i18n.t('actions.edited') });
        handleModal();
        getCategoryAll();
      })
      .finally(() => setLoading(false));
  };

  const { questionContents } = questionInfo;
  const mergedCategories = initialQuestion?.map((initialCategory) => {
    const existingCategory = questionContents?.find(
      (item) => item.langKey === initialCategory.langKey
    );

    if (existingCategory) {
      return {
        ...initialCategory,
        title: existingCategory.title,
        stepDescription: existingCategory.stepDescription,
        id: existingCategory.id
      };
    }

    return initialCategory;
  });
  const finalContent = questionInfo !== {} ? mergedCategories : initialQuestion;
  return (
    <Modal
      title={i18n.t('menu.editQuestion')}
      confirmLoading={loading}
      open={isModalOpen}
      footer={null}
      onCancel={handleModal}>
      <Form
        layout="vertical"
        initialValues={{ finalContent }}
        onFinish={handleSubmit}
        autoComplete="off">
        {finalContent.map((question, index) => (
          <Form.Item
            key={index}
            label={`${i18n.t('questionAnswer.question')} ${question.langKey}`}>
            <Form.Item
              initialValue={question?.title}
              name={['questionContents', index, 'title']}
              rules={[
                { required: true, message: i18n.t('rule.nameRequired') }
              ]}>
              <Input
                placeholder={`${i18n.t('menu.enterName')} ${question.langKey}`}
              />
            </Form.Item>
            <Form.Item
              initialValue={question?.stepDescription}
              name={['questionContents', index, 'stepDescription']}
              rules={[
                { required: true, message: i18n.t('rule.descriptionRequired') }
              ]}>
              <Input
                placeholder={`${i18n.t('description')} ${question.langKey}`}
              />
            </Form.Item>
            <Form.Item
              name={['questionContents', index, 'langKey']}
              initialValue={question.langKey}
              style={{ display: 'none' }}>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              name={['questionContents', index, 'id']}
              initialValue={question.id}
              style={{ display: 'none' }}>
              <Input type="hidden" />
            </Form.Item>
          </Form.Item>
        ))}

        <Form.Item labelAlign={'right'}>
          <Button loading={loading} type="primary" htmlType="submit">
            {i18n.t('commons.submit')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
QuestionEditModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  questionInfo: PropTypes.object,
  getCategoryAll: PropTypes.func
};
export default QuestionEditModal;

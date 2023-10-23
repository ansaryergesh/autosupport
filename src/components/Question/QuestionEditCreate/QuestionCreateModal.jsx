import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../Input/index.js';
import { Form, Modal, notification } from 'antd';
import Button from '../../Button/Button.jsx';
import { initialQuestion } from '../constants.js';
import { createCategoryQuestion } from '../../../service/Question/index.js';
import { useHistory } from 'react-router-dom';
import { i18n } from '../../../utils/i18next.js';
import { LANG_KEY } from '../../../constants/index.js';

const QuestionCreateModal = ({
  isModalOpen = false,
  handleModal,
  categoryId,
  getCategoryAll
}) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [form] = Form.useForm();
  const history = useHistory();
  const handleSubmit = (values) => {
    if (code) {
      createCategoryQuestion({ code, categorie: { id: categoryId }, ...values })
        .then((res) => {
          notification.success({ message: i18n.t('actions.added') });
          form.resetFields();
          getCategoryAll();
          handleModal();
          history.push(`/question/admin/${res.data.id}`);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      notification.error({ message: i18n.t('rule.codeRequired') });
    }
  };

  const handleGenerateCode = (e, question) => {
    const value = e.target.value;

    const finalValue =
      value &&
      value
        .toLowerCase()
        .trim()
        .replace(/[_*?+#$@!%^&()=,/]/g, '-')
        .split(' ')
        .join('-');
    if (question.langKey === LANG_KEY.EN) {
      setCode(finalValue);
    }
  };
  return (
    <Modal
      title={i18n.t('menu.addQuestion')}
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
        initialValues={{ initialQuestion }}
        onFinish={handleSubmit}
        autoComplete="off">
        {initialQuestion.map((question, index) => (
          <Form.Item
            key={index}
            label={`${i18n.t('columns.name')} ${question.langKey}`}>
            <Form.Item
              name={['questionContents', index, 'title']}
              rules={[
                { required: true, message: i18n.t('rule.nameRequired') }
              ]}>
              <Input
                placeholder={`${i18n.t('menu.enterName')} ${question.langKey}`}
                onChange={(e) => handleGenerateCode(e, question)}
              />
            </Form.Item>
            <Form.Item
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
          </Form.Item>
        ))}
        <Form.Item
          label={`${i18n.t('columns.code')}`}
          initialValue={code}
          required={true}
          rules={[{ required: true, message: i18n.t('rule.codeRequired') }]}>
          <Input
            placeholder={i18n.t('columns.code')}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Item>
        <Form.Item labelAlign={'right'}>
          <Button loading={loading} type="primary" htmlType="submit">
            {i18n.t('commons.submit')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
QuestionCreateModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  categoryId: PropTypes.number,
  getCategoryAll: PropTypes.func
};
export default QuestionCreateModal;

import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import Input from '../Input/Input';
import { i18n } from '../../utils/i18next';
import { manageMark } from '../../service/Feedback';

const NewLabelsModal = ({ isModalOpen, handleModal, modalData, getAllMarksList }) => {
  const [loading, setLoading] = useState(false);
  const editMark = modalData?.id;
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setLoading(true);
    manageMark(values)
      .then((res) => {
        console.log(res);
        handleModal();
        getAllMarksList();
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  };

  useEffect(() => {
    form.setFieldValue(modalData);
  }, [modalData, form]);

  console.log(handleSubmit);

  return (
    <Modal
      title={editMark ? i18n.t('actions.edit') : i18n.t('actions.add')}
      confirmLoading={loading}
      open={isModalOpen}
      cancelButtonProps={{ className: 'button-default' }}
      okButtonProps={{
        className: 'button-modal',
        htmlType: 'submit',
        form: 'form',
      }}
      onCancel={() => {
        form.resetFields();
        handleModal();
      }}
      cancelText={i18n.t('actions.cancel')}
    >
      <Form
        layout="vertical"
        id="form"
        form={form}
        initialValues={modalData}
        onFinish={handleSubmit}
      >
        {editMark ? (
          <Form.Item name="id" initialValue={modalData?.id} style={{ display: 'none' }}>
            <Input />
          </Form.Item>
        ) : null}

        <Form.Item initialValue={modalData?.score} name="score">
          <Input readOnly />
        </Form.Item>

        {modalData?.markContents?.map((content, i) => (
          <Form.Item key={i} label={`${i18n.t('columns.name')} ${content.langKey}`}>
            <Form.Item
              rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}
              name={['markContents', i, 'text']}
              initialValue={content.text}
            >
              <Input placeholder={`${i18n.t('menu.enterName')} ${content.langKey}`} />
            </Form.Item>

            <Form.Item
              name={['markContents', i, 'langKey']}
              initialValue={content.langKey}
              style={{ display: 'none' }}
            >
              <Input type="hidden" />
            </Form.Item>

            {editMark ? (
              <Form.Item
                initialValue={content?.id}
                name={['markContents', i, 'id']}
                style={{ display: 'none' }}
              >
                <Input />
              </Form.Item>
            ) : null}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default NewLabelsModal;

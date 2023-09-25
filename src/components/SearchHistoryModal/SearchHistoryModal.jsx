import React, { useEffect, useState } from 'react';
import { Form, Modal, Select, notification } from 'antd';
import Input from '../Input/Input';
import { i18n } from '../../utils/i18next';
import { manageKeyword } from '../../service/Keywords';
import { manageTag } from '../../service/Tags';
import { deleteSearchHistoryItems } from '../../service/SearchHistory';
import PropTypes from 'prop-types';

const SearchHistoryModal = ({ isModalOpen = false, handleModal, record, getSearchHistoryList }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const arr = [values.id];
    setLoading(true);

    delete values.id;

    let manageFunction;
    if (values.choice === 'keyword') {
      manageFunction = manageKeyword;
    } else {
      manageFunction = manageTag;
    }

    try {
      await deleteSearchHistoryItems(arr);
      const res = await manageFunction(values);

      handleModal();

      if (res.data) {
        notification.success({
          message: i18n.t('actions.added'),
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      await getSearchHistoryList(1, 10);
      setLoading(false);
      form.resetFields();
    }
  };

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record, form]);

  return (
    <Modal
      title={i18n.t('actions.add')}
      confirmLoading={loading}
      open={isModalOpen}
      onCancel={() => {
        form.resetFields();
        handleModal();
      }}
      cancelText={i18n.t('actions.cancel')}
      okButtonProps={{
        className: 'button-modal',
        htmlType: 'submit',
        form: 'form',
      }}
      cancelButtonProps={{ className: 'button-default' }}
    >
      <Form
        id="form"
        form={form}
        onFinish={onFinish}
        initialValues={record}
        autoComplete="off"
        requiredMark={false}
        layout="vertical"
      >
        <Form.Item style={{ display: 'none' }} name="id">
          <Input />
        </Form.Item>

        <Form.Item
          label={i18n.t('actions.editText')}
          name="text"
          rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}
        >
          <Input placeholder={i18n.t('newAnswer.startTyping')} />
        </Form.Item>

        <Form.Item name="choice">
          <Select placeholder={i18n.t('choice')}>
            <Select.Option value="keyword">{i18n.t('keyword')}</Select.Option>
            <Select.Option value="tag">{i18n.t('tag')}</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
SearchHistoryModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  record: PropTypes.object,
  getSearchHistoryList: PropTypes.func,
};
export default SearchHistoryModal;

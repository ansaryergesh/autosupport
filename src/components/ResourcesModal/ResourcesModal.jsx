import React, { useState, useEffect } from 'react';
import { Form, Modal, notification } from 'antd';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
import { manageResources } from '../../service/Resources/index.js';
import { initialValues } from '../../pages/Resources/constants.js';
import { i18n } from '../../utils/i18next';

const ResourcesModal = ({
  isModalOpen = false,
  handleModal = () => {},
  getList = () => {},
  record = initialValues,
  setRecord = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  console.log(record);

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record, form]);

  const handleSubmit = (values) => {
    setRecord(initialValues);
    setLoading(true);
    manageResources(values)
      .then((res) => {
        handleModal();
        getList();
        if (res.data) {
          notification.success({
            message: i18n.t('actions.added'),
          });
          console.log(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
        form.resetFields();
      });
  };
  return (
    <>
      <Modal
        title={i18n.t('actions.addResource')}
        confirmLoading={loading}
        open={isModalOpen}
        cancelText={i18n.t('actions.cancel')}
        onCancel={() => {
          form.resetFields();
          handleModal();
        }}
        okButtonProps={{
          className: 'button-modal',
          htmlType: 'submit',
          form: 'form',
        }}
        cancelButtonProps={{ className: 'button-default' }}
      >
        <Form
          form={form}
          id="form"
          layout="vertical"
          onFinish={(values) => {
            handleSubmit(values);
          }}
          initialValues={record}
        >
          <Form.Item name="code" rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}>
            <Input placeholder={i18n.t('columns.code')} />
          </Form.Item>

          {record.resourceContents?.map((resLang, index) => (
            <>
              <Form.Item
                key={index}
                name={['resourceContents', index, 'name']}
                rules={[{ required: true, message: i18n.t('rule.nameRequired') }]}
              >
                <Input placeholder={`${i18n.t('resource')} ${resLang.langKey}`} />
              </Form.Item>
              <Form.Item
                key={index}
                style={{ display: 'none' }}
                name={['resourceContents', index, 'langKey']}
              >
                <Input type="hidden" placeholder={`${i18n.t('resource')} ${resLang.langKey}`} />
              </Form.Item>
            </>
          ))}
        </Form>
      </Modal>
    </>
  );
};

ResourcesModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  getList: PropTypes.func,
  record: PropTypes.object,
  setRecord: PropTypes.func,
};

export default ResourcesModal;

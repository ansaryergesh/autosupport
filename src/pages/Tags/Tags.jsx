import React, { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, notification } from 'antd';
import Button from 'components/Button/Button';
import TagsModal from 'components/TagsModal/TagsModal.jsx';
import { getTags, deleteTag } from '../../service/Tags/index.js';
import { initialValues } from './constants.js';
import { i18n } from '../../utils/i18next';
import JHeader from "../../components/JHeader/JHeader.jsx";

const Tags = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState(initialValues);

  const handleModal = () => {
    if (isModalOpen) {
      setRecord(initialValues);
    }
    setIsModalOpen(!isModalOpen);
  };

  const getTagsList = () => {
    getTags().then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getTagsList();
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteTag(id).then((res) => {
      if (res.status === 204) {
        notification.success({ message: i18n.t('actions.deleted') });
        getTagsList();
      }
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRowKeys.map((rowId) =>
          deleteTag(rowId).then((res) => {
            if (res.status === 204) {
              notification.success({ message: i18n.t('actions.deleted') });
              getTagsList();
            }
          })
        )
      );
      setSelectedRowKeys([]);
      console.log('Selected rows deleted successfully.');
    } catch (error) {
      console.error('Error deleting rows:', error);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
    {
      title: i18n.t('columns.name'),
      dataIndex: 'text'
    },

    {
      title: i18n.t('actions.action'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setRecord(record);
              handleModal();
            }}>
            {i18n.t('actions.edit')}
          </Button>
          <Popconfirm
            cancelButtonProps={{ className: 'button-default' }}
            okButtonProps={{ className: 'button-modal' }}
            title={i18n.t('actions.sure')}
            onConfirm={() => handleDelete(record.id)}>
            <Button>{i18n.t('actions.delete')}</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <JHeader pageTitle={i18n.t('tags')} />

      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
          }}>
          <div>
            <Button onClick={handleDeleteSelected} disabled={!hasSelected}>
              {i18n.t('actions.deleteSelected')}
            </Button>
            <span
              style={{
                marginLeft: 8
              }}>
              {hasSelected
                ? `${i18n.t('actions.selected')} ${selectedRowKeys.length}`
                : ''}
            </span>
          </div>

          <Button type="modal" onClick={handleModal}>
            {i18n.t('actions.add')}
          </Button>
        </div>
        <Table
          rowKey={(record) => record.id}
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>

      <TagsModal
        record={record}
        handleModal={handleModal}
        isModalOpen={isModalOpen}
        getList={getTagsList}
      />
    </div>
  );
};

export default Tags;

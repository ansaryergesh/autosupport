import React, { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, notification } from 'antd';
import Button from 'components/Button/Button';
import OrganizationsModal from 'components/OrganizationsModal/OrganizationsModal.jsx';
import {
  getOrganizations,
  deleteOrganization
} from '../../service/Organizations/index.js';
import { initialValues } from './constants.js';
import { i18n } from '../../utils/i18next';

const Organizations = () => {
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

  const getOrganizationsList = () => {
    getOrganizations().then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    getOrganizationsList();
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteOrganization(id).then((res) => {
      if (res.status === 204) {
        notification.success({ message: i18n.t('actions.deleted') });
        getOrganizationsList();
      }
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRowKeys.map((rowId) =>
          deleteOrganization(rowId).then((res) => {
            if (res.status === 204) {
              notification.success({ message: i18n.t('actions.deleted') });
              getOrganizationsList();
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
      title: i18n.t('columns.code'),
      dataIndex: 'code'
    },
    {
      title: i18n.t('columns.name'),
      dataIndex: 'name'
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

      <OrganizationsModal
        record={record}
        handleModal={handleModal}
        isModalOpen={isModalOpen}
        getList={getOrganizationsList}
      />
    </div>
  );
};

export default Organizations;

import React, { useEffect, useState } from 'react';
import { Table, Space, Empty, Popconfirm, notification } from 'antd';
import Button from 'components/Button/Button';
import ResourcesModal from 'components/ResourcesModal/ResourcesModal.jsx';
import EditResourceModal from '../../components/ResourcesModal/EditResourceModal.jsx';
import { getResources, deleteResource } from '../../service/Resources/index.js';
import { initialValues } from './constants.js';
import { i18n } from '../../utils/i18next';
import JHeader from '../../components/JHeader/JHeader.jsx';
import { getLocale } from '../../utils/i18next.js';
import { getResourceById } from '../../service/Resources';
import { checkPermissions } from '../../helpers/checkPermission.js';

const Resources = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [record, setRecord] = useState(initialValues);
  const [resourceInfo, setResourceInfo] = useState({});

  const handleEditResource = (resourceId) => {
    setResourceInfo({});
    getResourceById(resourceId).then((res) => {
      console.log(res);
      setIsEditOpen(true);
      setResourceInfo(res.data);
    });
  };

  const handleModal = () => {
    if (isModalOpen) {
      setRecord(initialValues);
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleEdit = () => {
    if (isEditOpen) {
      setRecord(initialValues);
    }
    setIsEditOpen(!isEditOpen);
  };

  const getResourcesList = () => {
    getResources().then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getResourcesList();
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteResource(id).then((res) => {
      if (res.status === 204) {
        notification.success({ message: i18n.t('actions.deleted') });
        getResourcesList();
      }
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRowKeys.map((rowId) =>
          deleteResource(rowId).then((res) => {
            if (res.status === 204) {
              notification.success({ message: i18n.t('actions.deleted') });
              getResourcesList();
            }
          }),
        ),
      );
      setSelectedRowKeys([]);
      console.log('Selected rows deleted successfully.');
    } catch (error) {
      console.error('Error deleting rows:', error);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
    {
      title: i18n.t('columns.code'),

      dataIndex: 'code',
    },
    {
      title: i18n.t('columns.name'),
      dataIndex: 'resourceContents',
      render: (row) => {
        return row.find((item) => item?.langKey === getLocale())?.name;
      },
    },

    {
      title: i18n.t('actions.action'),
      key: 'action',
      render: (_, record) =>
        checkPermissions(['ROLE_SUPER_ADMIN', 'ROLE_WATCHER']) ? null : (
          <Space size="middle">
            <Button
              onClick={() => {
                handleEditResource(record.id);
              }}
            >
              {i18n.t('actions.edit')}
            </Button>
            <Popconfirm
              cancelButtonProps={{ className: 'button-default' }}
              okButtonProps={{ className: 'button-modal' }}
              title={i18n.t('actions.sure')}
              cancelText={i18n.t('actions.cancel')}
              onConfirm={() => handleDelete(record.id)}
            >
              <Button>{i18n.t('actions.delete')}</Button>
            </Popconfirm>
          </Space>
        ),
    },
  ];

  return (
    <div>
      <JHeader pageTitle={i18n.t('resources')} />
      <div>
        {checkPermissions(['ROLE_SUPER_ADMIN', 'ROLE_WATCHER']) ? null : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <div>
              <Popconfirm
                cancelButtonProps={{ className: 'button-default' }}
                okButtonProps={{ className: 'button-modal' }}
                title={i18n.t('actions.sure')}
                cancelText={i18n.t('actions.cancel')}
                onConfirm={handleDeleteSelected}
              >
                <Button disabled={!hasSelected}>{i18n.t('actions.deleteSelected')}</Button>
              </Popconfirm>
              <span
                style={{
                  marginLeft: 8,
                }}
              >
                {hasSelected ? `${i18n.t('actions.selected')} ${selectedRowKeys.length}` : ''}
              </span>
            </div>

            <Button type="modal" onClick={handleModal}>
              {i18n.t('actions.add')}
            </Button>
          </div>
        )}
        <Table
          bordered
          tableLayout="fixed"
          rowKey={(record) => record.id}
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: <Empty description={i18n.t('noData')} />,
          }}
        />
      </div>
      {isModalOpen && (
        <ResourcesModal
          record={record}
          setRecord={setRecord}
          data={data}
          handleModal={handleModal}
          isModalOpen={isModalOpen}
          getList={getResourcesList}
        />
      )}

      {isEditOpen && (
        <EditResourceModal
          handleEdit={handleEdit}
          isEditOpen={isEditOpen}
          getList={getResourcesList}
          resourceInfo={resourceInfo}
        />
      )}
    </div>
  );
};

export default Resources;

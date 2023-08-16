import React, { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, notification } from 'antd';
import Button from 'components/Button/Button';
// import { tempData } from './constants';
import ResourcesModal from 'components/ResourcesModal/ResourcesModal.jsx';
import { getResources, deleteResource } from '../../service/Resources/index.js';
import { initialValues } from './constants.js';

const Resources = () => {
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
        notification.success({ message: 'Deleted' });
        getResourcesList();
      }
    });
  };

  const handleDeleteSelected = () => {};

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setRecord(record);
              handleModal();
            }}>
            {'Edit'}
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}>
            <Button>Delete</Button>
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
              Delete selected
            </Button>
            <span
              style={{
                marginLeft: 8
              }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>

          <Button type="modal" onClick={handleModal}>
            Add item
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

      <ResourcesModal
        record={record}
        setRecord={setRecord}
        handleModal={handleModal}
        isModalOpen={isModalOpen}
        getList={getResourcesList}
      />
    </div>
  );
};

export default Resources;

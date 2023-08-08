import React, { useState } from 'react';
import { Table, Space, Popconfirm } from 'antd';
import Button from 'components/Button/Button';
import { tempData } from './constants';
import KeywordsModal from 'components/KeywordsModal/KeywordsModal.jsx';

const Keywords = () => {
  const [data, setData] = useState(tempData);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
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
      dataIndex: 'key'
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
          <Button type="primary" onClick={handleModal}>
            {'Edit'}
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}>
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
          <Button
            type="primary"
            onClick={handleDeleteSelected}
            disabled={!hasSelected}>
            Delete selected
          </Button>
          <Button
              type="primary"
              onClick={handleModal}>
            Add item
          </Button>
          <span
            style={{
              marginLeft: 8
            }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>

      <KeywordsModal
          editPage={true}
          handleModal={handleModal}
          isModalOpen={isModalOpen}
      />
    </div>
  );
};

export default Keywords;

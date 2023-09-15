import React, { useEffect, useState } from 'react';
import JHeader from '../../components/JHeader/JHeader';
import { i18n } from '../../utils/i18next';
import { Table, Popconfirm, notification } from 'antd';
import Button from '../../components/Button/Button';
import {
  deleteSearchHistoryItems,
  getSearchHistory
} from '../../service/SearchHistory';
import SearchHistoryModal from '../../components/SearchHistoryModal/SearchHistoryModal';
// import { initialValues } from './constants';

const SearchHistory = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState({});
  const [totalPages, setTotalPages] = useState(1);

  const hasSelected = selectedRowKeys.length > 0;

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const getSearchHistoryList = (pageCurrent, pageSize) => {
    getSearchHistory(pageCurrent - 1, pageSize)
      .then((res) => {
        setData(res.data);
        setTotalPages(res.headers['x-total-count']);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteSelected = () => {
    deleteSearchHistoryItems(selectedRowKeys)
      .then((res) => {
        if (res.status === 204) {
          notification.success({ message: i18n.t('actions.deleted') });
          getSearchHistoryList(1, 10);
        }
        setSelectedRowKeys([]);
      })
      .catch((err) => console.log(err));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  useEffect(() => {
    getSearchHistoryList(1, 10);
  }, []);

  const columns = [
    {
      title: i18n.t('columns.name'),
      dataIndex: 'text'
    },
    {
      title: i18n.t('columns.numberOfRequests'),
      dataIndex: 'count'
    },

    {
      title: i18n.t('actions.action'),
      key: 'action',
      render: (_, record) => (
        <Button
          onClick={() => {
            setRecord(record);
            handleModal();
          }}>
          {i18n.t('actions.add')}
        </Button>
      )
    }
  ];

  return (
    <div>
      <JHeader pageTitle={i18n.t('searchHistory')} />

      <div style={{ marginBottom: '16px' }}>
        <Popconfirm
          cancelButtonProps={{ className: 'button-default' }}
          okButtonProps={{ className: 'button-modal' }}
          title={i18n.t('actions.sure')}
          cancelText={i18n.t('actions.cancel')}
          onConfirm={handleDeleteSelected}>
          <Button disabled={!hasSelected}>
            {i18n.t('actions.deleteSelected')}
          </Button>
        </Popconfirm>

        <span>
          {hasSelected
            ? `${i18n.t('actions.selected')} ${selectedRowKeys.length} `
            : ''}
        </span>
      </div>

      <Table
        tableLayout="fixed"
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        pagination={{
          total: totalPages,
          onChange: (page, pageSize) => getSearchHistoryList(page, pageSize),
          position: ['bottomCenter']
        }}
      />

      <Button style={{ marginTop: '16px' }} type="primary">
        {i18n.t('actions.downloadSearchHistory')}
      </Button>

      <SearchHistoryModal
        getSearchHistoryList={getSearchHistoryList}
        record={record}
        isModalOpen={isModalOpen}
        handleModal={handleModal}
      />
    </div>
  );
};

export default SearchHistory;

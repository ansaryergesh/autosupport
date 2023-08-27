import React, { useState } from 'react';
import { Table, Space, Popconfirm } from 'antd';
import { tempData } from './constants.js';
import Button from 'components/Button/Button.jsx';
import EmployeeModal from 'components/EmployeeModal/EmployeeModal.jsx';
import { i18n } from 'utils/i18next.js';

const Employees = () => {
  const [data, setData] = useState(tempData);

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const columns = [
    {
      title: i18n.t('columns.fullName'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: i18n.t('columns.email'),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: i18n.t('columns.role'),
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: i18n.t('columns.organization'),
      dataIndex: 'company',
      key: 'company'
    },

    {
      title: i18n.t('actions.action'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EmployeeModal btnType="default" btnName={i18n.t('actions.edit')} />
          <Popconfirm
            cancelButtonProps={{ className: 'button-default' }}
            okButtonProps={{ className: 'button-modal' }}
            title={i18n.t('actions.sure')}
            onConfirm={() => handleDelete(record.key)}>
            <Button>{i18n.t('actions.delete')}</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];
  return (
    <div style={{ margin: '68px auto 0 auto' }}>
      <EmployeeModal
        btnType="modal"
        btnName={i18n.t('actions.addEmployee')}
        margin={10}
      />
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};

export default Employees;

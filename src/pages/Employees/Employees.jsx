import React, { useState } from 'react';
import { Table, Space, Popconfirm } from 'antd';
import { tempData } from './constants.js';
import Button from 'components/Button/Button.jsx';
import EmployeeModal from 'components/EmployeeModal/EmployeeModal.jsx';

const Employees = () => {
  const [data, setData] = useState(tempData);

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company'
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EmployeeModal btnType="default" btnName="Edit" />
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
    <div style={{ margin: '68px auto 0 auto' }}>
      <EmployeeModal btnName="Add Employee" margin={10} />
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};

export default Employees;

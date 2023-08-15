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
      title: 'Ф.И.О.',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Почтовый адрес',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Компания',
      dataIndex: 'company',
      key: 'company'
    },

    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EmployeeModal btnType="default" btnName="Редактировать" />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}>
            <Button>Удалить</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];
  return (
    <div style={{ margin: '68px auto 0 auto' }}>
      <EmployeeModal
        btnType="modal"
        btnName="Добавить сотрудника"
        margin={10}
      />
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};

export default Employees;

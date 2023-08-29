import React, { useEffect, useState } from 'react';
import { Table, Space, Popconfirm } from 'antd';
import Button from 'components/Button/Button.jsx';
import EmployeeModal from 'components/EmployeeModal/EmployeeModal.jsx';
import { getEmployeeData } from '../../service/Employee';

const Employees = () => {
  const [data, setData] = useState([]); // Initialize with an empty array

  useEffect(() => {
    getEmployeeData().then(res => {
      console.log(res);
      setData(res.data.content); // Extract the 'content' array from the response
    });
  }, []);

  const handleDelete = (key) => {
    const newData = data.filter(item => item.id !== key); // Assuming 'id' is the unique identifier
    setData(newData);
  };


  const columns = [
    {
      title: i18n.t('columns.fullName'),
        dataIndex: 'firstName', // Use 'firstName' as dataIndex
        key: 'name'
    },
    {
      title: i18n.t('columns.email'),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: i18n.t('columns.role'),
        dataIndex: 'authorities', // This might need further processing if it's an array
        key: 'authorities'
    },
    {
      title: i18n.t('columns.organization'),
        dataIndex: `authOrganization.name`, // Access nested property
        key: 'authOrganization',
    },

    {
      title: 'Действия',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EmployeeModal btnType="default" btnName="Редактировать" />
          <Popconfirm
            cancelButtonProps={{ className: 'button-default' }}
            okButtonProps={{ className: 'button-modal' }}
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}> {/* Assuming 'id' is the unique identifier */}
            <Button>Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: '68px auto 0 auto' }}>
      <EmployeeModal
        btnType="modal"
        btnName="Добавить сотрудника"
        margin={10}
      />
      <Table pagination={false} columns={columns} dataSource={data} /> {/* Use 'data' as dataSource */}
    </div>
  );
};

export default Employees;

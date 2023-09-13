import React, { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, notification } from 'antd';
import Button from 'components/Button/Button.jsx';
import EmployeeModal from 'components/EmployeeModal/EmployeeModal.jsx';
import { deleteEmployee, getEmployeeData } from '../../service/Employee';
import { i18n } from '../../utils/i18next';

const initialData = {
  id: null,
  login: '',
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  activated: true,
  langKey: '',
  createdBy: '',
  createdDate: '',
  lastModifiedBy: '',
  lastModifiedDate: '',
  authority: '',
  authOrganization: {
    name: '',
    code: '',
  },
  password: '',
};

const Employees = () => {
  const [data, setData] = useState([]);
  const [record, setRecord] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getEmployeeData().then((res) => {
      setData(res.data.content);
    });
  }, []);

  const handleDelete = (key) => {
    deleteEmployee(key).then(() => {
      const newData = data.filter((item) => item.id !== key);
      setData(newData);
      notification.info({ message: `${i18n.t('employeePage.employeeDeletedNotification')}` });
    });
  };



  const columns = [
    {
      title: `${i18n.t('columns.name')}`,
      dataIndex: 'firstName',
      key: 'name',
    },
    {
      title: `${i18n.t('columns.email')}`,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: `${i18n.t('columns.role')}`,
      dataIndex: 'authority',
      key: 'authority',
    },
    {
      title: `${i18n.t('columns.organization')}`,
      dataIndex: `authOrganization`,
      key: 'authOrganization',
      render: (authOrganization) => <span>{authOrganization.name}</span>,
    },
    {
      title: `${i18n.t('actions.action')}`,
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setRecord(record);
              handleModal();
            }}
          >
            {i18n.t('actions.edit')}
          </Button>

          <Popconfirm
            cancelButtonProps={{ className: 'button-default' }}
            cancelText={i18n.t('actions.cancel')}
            okButtonProps={{ className: 'button-modal' }}
            title={i18n.t('actions.sure')}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button>{i18n.t('actions.delete')}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  return (
    <div style={{ margin: '68px auto 0 auto' }}>
      <EmployeeModal
        record={record}
        handleModal={handleModal}
        isModalOpen={isModalOpen}
        getEmployeeData={getEmployeeData}
      />
      <Button
        type="modal"
        onClick={() => {
          setRecord(initialData);
          handleModal();
        }}
        style={{ marginBottom: '10px' }}
      >
        {i18n.t('actions.addEmployee')}
      </Button>
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};

export default Employees;

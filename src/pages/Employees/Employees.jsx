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
  const [totalPages, setTotalPages] = useState();

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getEmployeeList = (pageCurrent, pageSize) => {
    window.scrollTo(0, 0);

    getEmployeeData(pageCurrent - 1, pageSize).then((res) => {
      setData(res.data.content);
      setTotalPages(res.data.totalElements);
      console.log(res);
    });
  };

  useEffect(() => {
    getEmployeeList(1, 10);
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
      key: 'name',
      render: (_, record) => <span>{`${record.firstName} ${record.lastName}`}</span>,
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
      title: `${i18n.t('columns.langKey')}`,
      dataIndex: 'langKey',
      key: 'langKey',
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
        getEmployeeList={getEmployeeList}
      />
      <Button
        type="modal"
        onClick={() => {
          setRecord(initialData);
          getEmployeeData();
          handleModal();
        }}
        style={{ marginBottom: '10px' }}
      >
        {i18n.t('actions.addEmployee')}
      </Button>
      <Table
        pagination={{
          total: totalPages,
          onChange: (page, pageSize) => getEmployeeList(page, pageSize),
          position: ['bottomCenter'],
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default Employees;

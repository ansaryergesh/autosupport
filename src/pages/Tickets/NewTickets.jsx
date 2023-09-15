import { Table, notification, Empty } from 'antd';
import JHeader from '../../components/JHeader/JHeader';
import { i18n } from '../../utils/i18next';
import Button from '../../components/Button/Button';
import { getNewTickets, updateTicketStatus } from '../../service/Tickets';
import { useEffect, useState } from 'react';

const NewTickets = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const handleTicketStatus = (id) => {
    const statusData = {
      id,
      status: 'CLOSED'
    };
    updateTicketStatus(statusData)
      .then((res) => {
        if (res.data) {
          notification.success({
            message: i18n.t('processed'),
            placement: 'top'
          });
        }
        getNewTicketsList(1, 10);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      title: i18n.t('newAnswer.whatQuestion'),
      dataIndex: 'title'
    },
    {
      title: i18n.t('columns.email'),
      dataIndex: 'email'
    },
    {
      title: i18n.t('actions.action'),
      key: 'action',
      render: (_, record) => (
        <Button
          onClick={() => {
            handleTicketStatus(record.id);
          }}>
          {i18n.t('processed')}
        </Button>
      )
    }
  ];

  const getNewTicketsList = (pageCurrent, pageSize) => {
    window.scrollTo(0, 0);

    getNewTickets(pageCurrent - 1, pageSize)
      .then((res) => {
        setData(res.data);
        setTotalPages(res.headers['x-total-count']);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNewTicketsList(1, 10);
  }, []);

  return (
    <div>
      <JHeader pageTitle={i18n.t('newTickets')} />

      <Table
        tableLayout="fixed"
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.text}</p>
          )
        }}
        columns={columns}
        dataSource={data}
        pagination={{
          total: totalPages,
          onChange: (page, pageSize) => getNewTicketsList(page, pageSize),
          position: ['bottomCenter']
        }}
        bordered
        locale={{
          emptyText: <Empty description={i18n.t('noData')} />
        }}
      />

      <Button style={{ marginTop: '16px' }} type="primary">
        {i18n.t('actions.downloadTickets')}
      </Button>
    </div>
  );
};

export default NewTickets;

import { Table, Empty } from 'antd';
import JHeader from '../../components/JHeader/JHeader';
import { i18n } from '../../utils/i18next';
import { useEffect, useState } from 'react';
import { getOldTickets } from '../../service/Tickets';

const OldTickets = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  const columns = [
    {
      title: i18n.t('newAnswer.whatQuestion'),
      dataIndex: 'title',
    },
    {
      title: i18n.t('columns.email'),
      dataIndex: 'email',
    },
    {
      title: i18n.t('processedBy'),
      dataIndex: 'lastModifiedBy',
      render: (_, record) => <p>{record.lastModifiedBy}</p>,
    },
    {
      title: i18n.t('processedWhen'),
      dataIndex: 'closedDate',
      render: (_, record) => <p>{formatDate(record.closedDate)}</p>,
    },
  ];

  const getOldTicketsList = (pageCurrent, pageSize) => {
    getOldTickets(pageCurrent - 1, pageSize)
      .then((res) => {
        setData(res.data);
        setTotalPages(res.headers['x-total-count']);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOldTicketsList(1, 10);
  }, []);

  return (
    <div>
      <JHeader pageTitle={i18n.t('oldTickets')} />

      <Table
        tableLayout="fixed"
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.text}</p>,
        }}
        columns={columns}
        dataSource={data}
        pagination={{
          total: totalPages,
          onChange: (page, pageSize) => getOldTicketsList(page, pageSize),
          position: ['bottomCenter'],
        }}
        bordered
        locale={{
          emptyText: <Empty description={i18n.t('noData')} />,
        }}
      />
    </div>
  );
};

export default OldTickets;

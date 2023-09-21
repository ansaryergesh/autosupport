import { Table, Empty } from 'antd';
import JHeader from '../../components/JHeader/JHeader';
import { i18n } from '../../utils/i18next';
import { useEffect, useState } from 'react';
import { getOldTickets, getOldTicketsExcel } from '../../service/Tickets';
import Button from '../../components/Button/Button';
import SearchTickets from './SearchTickets';
import { handleExport } from '../../helpers/downloadFile';

const OldTickets = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString();
    return formattedDate;
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
      title: i18n.t('processedBy'),
      dataIndex: 'lastModifiedBy',
      render: (_, record) => <p>{record.lastModifiedBy}</p>
    },
    {
      title: i18n.t('processedWhen'),
      dataIndex: 'closedDate',
      render: (_, record) => <p>{formatDate(record.closedDate)}</p>
    }
  ];

  const getOldTicketsList = (pageCurrent, pageSize, search) => {
    window.scrollTo(0, 0);

    getOldTickets(pageCurrent - 1, pageSize, search)
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

      <SearchTickets
        getTicketsList={getOldTicketsList}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

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
          onChange: (page, pageSize) =>
            getOldTicketsList(page, pageSize, inputValue),
          position: ['bottomCenter']
        }}
        bordered
        locale={{
          emptyText: <Empty description={i18n.t('noData')} />
        }}
      />

      <Button
        onClick={() => handleExport(getOldTicketsExcel, i18n.t('oldTickets'))}
        style={{ marginTop: '16px' }}
        type="primary">
        {i18n.t('actions.downloadTickets')}
      </Button>
    </div>
  );
};

export default OldTickets;

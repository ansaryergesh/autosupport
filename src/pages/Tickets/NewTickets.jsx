import { Table, notification, Empty, Switch } from 'antd';
import JHeader from '../../components/JHeader/JHeader';
import { i18n } from '../../utils/i18next';
import Button from '../../components/Button/Button';
import { getNewTickets, getNewTicketsExcel, updateTicketStatus } from '../../service/Tickets';
import { useEffect, useState } from 'react';
import { checkPermissions } from '../../helpers/checkPermission';
import SearchTickets from './SearchTickets';
import { handleExport } from '../../helpers/downloadFile';
import styles from './index.module.less';
import TypographyHead from '../../components/Typography/TypographyHead';
import { TypoGraphyType } from '../../components/Typography/constants';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const NewTickets = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const handleTicketStatus = (id) => {
    const statusData = {
      id,
      status: 'CLOSED',
    };
    updateTicketStatus(statusData)
      .then((res) => {
        if (res.data) {
          notification.success({
            message: i18n.t('processed'),
            placement: 'top',
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
      dataIndex: 'title',
    },
    {
      title: i18n.t('columns.email'),
      dataIndex: 'email',
    },
    {
      title: i18n.t('actions.action'),
      key: 'action',
      render: (_, record) =>
        checkPermissions(['ROLE_SUPER_ADMIN', 'ROLE_WATCHER']) ? null : (
          <Button
            onClick={() => {
              handleTicketStatus(record.id);
            }}
          >
            {i18n.t('processed')}
          </Button>
        ),
    },
  ];

  const getNewTicketsList = (pageCurrent, pageSize, search) => {
    window.scrollTo(0, 0);

    getNewTickets(pageCurrent - 1, pageSize, search)
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

      <SearchTickets
        inputValue={inputValue}
        setInputValue={setInputValue}
        getTicketsList={getNewTicketsList}
      />

      <Table
        filterResetToDefaultFilteredValue={true}
        tableLayout="fixed"
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.text}</p>,
        }}
        columns={columns}
        dataSource={data}
        pagination={{
          total: totalPages,
          onChange: (page, pageSize) => getNewTicketsList(page, pageSize, inputValue),
          position: ['bottomCenter'],
        }}
        bordered
        locale={{
          emptyText: <Empty description={i18n.t('noData')} />,
        }}
      />

      <div className={styles.ticketBtns}>
        <Button
          onClick={() => {
            handleExport(getNewTicketsExcel, i18n.t('newTickets'));
          }}
          style={{ marginTop: '16px' }}
          type="primary"
        >
          {i18n.t('actions.downloadTickets')}
        </Button>

        <div className={styles.switchBox}>
          <TypographyHead content={i18n.t('toggleTickets')} type={TypoGraphyType.LEVEL_2} />
          <Switch
            defaultChecked={true}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        </div>
      </div>
    </div>
  );
};

export default NewTickets;

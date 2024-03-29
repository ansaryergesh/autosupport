import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Col, Row, DatePicker, Empty } from 'antd';
import Button from '../Button/Button.jsx';
import { i18n } from '../../utils/i18next';
import { getAllReviews, getFeedbackExcel } from '../../service/Feedback';
import TypographyHead from '../Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../Typography/constants.js';
import { handleExport } from '../../helpers/downloadFile.js';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const rangePresets = [
  {
    label: 'Последние 7 дней',
    value: [dayjs().subtract(7, 'd'), dayjs()]
  },
  {
    label: 'Последние 14 дней',
    value: [dayjs().subtract(14, 'd'), dayjs()]
  },
  {
    label: 'Последний месяц',
    value: [dayjs().subtract(1, 'M'), dayjs()]
  },
  {
    label: 'Последние 3 месяца',
    value: [dayjs().subtract(3, 'M'), dayjs()]
  },
  {
    label: 'Последний год',
    value: [dayjs().subtract(1, 'y'), dayjs()]
  },
  {
    label: 'За все время',
    value: [dayjs(0), dayjs()]
  }
];

const ReviewsList = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState([]);

  const getReviewsList = (startDate, endDate) => {
    getAllReviews(startDate, endDate).then((res) => {
      setData(res.data);
    });
  };

  const exportFeedback = () =>
    getFeedbackExcel(
      period?.[0]
        ? dayjs(period[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        : '1970-01-01T00:00:00.000Z',
      period?.[1]
        ? dayjs(period[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        : dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    );

  const handleDateChange = (value) => {
    setPeriod(value);
    const startDate = dayjs(value[0])
      ?.startOf('day')
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const endDate = dayjs(value[1])
      ?.endOf('day')
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    getReviewsList(startDate, endDate);
  };

  useEffect(() => {
    getReviewsList();
  }, []);

  return (
    <div className={styles.box}>
      <TypographyHead
        content={i18n.t('feedback.ListTitle')}
        type={TypoGraphyType.SECONDARY_HEAD}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
        <RangePicker
          className={styles.datePicker}
          value={period}
          onChange={handleDateChange}
          presets={rangePresets}
        />
        <Button
          type="primary"
          onClick={() => handleExport(exportFeedback, i18n.t('reviews'))}
          className={styles.btnDownload}>
          {i18n.t('actions.downloadReviews')}
        </Button>
      </div>
      <Row justify={'center'} gutter={[0, 16]}>
        {data?.length === 0 ? (
          <Col span={24}>
            <Empty
              imageStyle={{ height: '100%' }}
              description={i18n.t('noData')}
            />
          </Col>
        ) : (
          data
            ?.filter((item) => item.text?.length > 0)
            .map((q) => (
              <Col span={24} className={styles.questionBox} key={q.id}>
                <span>{q.text}</span>
              </Col>
            ))
            .slice(0, 5)
        )}
        {data?.length > 0 && (
          <>
            <Col style={{ marginLeft: 'auto' }}></Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default ReviewsList;

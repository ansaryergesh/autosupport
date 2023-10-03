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
    value: [dayjs().add(-7, 'd'), dayjs()]
  },
  {
    label: 'Последние 14 дней',
    value: [dayjs().add(-14, 'd'), dayjs()]
  },
  {
    label: 'Последний месяц',
    value: [dayjs().add(-30, 'd'), dayjs()]
  },
  {
    label: 'Последние 3 месяца',
    value: [dayjs().add(-90, 'd'), dayjs()]
  },
  {
    label: 'Последний год',
    value: [dayjs().add(-365, 'd'), dayjs()]
  },
  {
    label: 'За все время',
    value: [dayjs(), dayjs()]
  }
];

const ReviewsList = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState([]);
  const getReviewsList = () => {
    getAllReviews().then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getReviewsList();
  }, []);

  const exportFeedback = () =>
    getFeedbackExcel(
      period?.[0] ? dayjs(period[0]).toISOString() : '2022-01-01',
      period?.[1] ? dayjs(period[1]).toISOString() : dayjs().toISOString()
    );

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
          onChange={(value) => {
            setPeriod(value);
          }}
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
          data?.map(
            (q) =>
              q.text?.length > 0 && (
                <Col span={24} className={styles.questionBox} key={q.id}>
                  <span>{q.text}</span>
                </Col>
              )
          )
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

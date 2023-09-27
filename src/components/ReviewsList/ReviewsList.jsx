import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Col, Row, DatePicker, Empty } from 'antd';
import Button from '../Button/Button.jsx';
import { i18n } from '../../utils/i18next';
import { getAllReviews, getFeedbackExcel } from '../../service/Feedback';
import TypographyHead from '../Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../Typography/constants.js';
import { handleExport } from '../../helpers/downloadFile.js';

const { RangePicker } = DatePicker;

const rangePresets = [
  {
    label: 'Последние 7 дней',
    value: [],
  },
  {
    label: 'Последние 14 дней',
    value: [],
  },
  {
    label: 'Последний месяц',
    value: [],
  },
  {
    label: 'Последние 3 месяца',
    value: [],
  },
  {
    label: 'Последний год',
    value: [],
  },
  {
    label: 'За все время',
    value: [],
  },
];

const ReviewsList = () => {
  const [data, setData] = useState([]);

  const getReviewsList = () => {
    getAllReviews().then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getReviewsList();
  }, []);

  const exportFeedback = () => getFeedbackExcel('2022-01-01', '2024-09-27');
  return (
    <div className={styles.box}>
      <TypographyHead content={i18n.t('feedback.ListTitle')} type={TypoGraphyType.SECONDARY_HEAD} />

      <Row justify={'center'} gutter={[0, 16]}>
        {data?.length === 0 ? (
          <Col span={24}>
            <Empty imageStyle={{ height: '100%' }} description={i18n.t('noData')} />
          </Col>
        ) : (
          data?.map(
            (q) =>
              q.text?.length > 0 && (
                <Col span={24} className={styles.questionBox} key={q.id}>
                  <span>{q.text}</span>
                </Col>
              ),
          )
        )}
        {data?.length > 0 && (
          <>
            <Col>
              <RangePicker className={styles.datePicker} presets={rangePresets} />
            </Col>
            <Col style={{ marginLeft: 'auto' }}>
              <Button type="primary"  onClick={() => handleExport(exportFeedback, i18n.t('reviews'))}
                      className={styles.btnDownload}>
                {i18n.t('actions.downloadReviews')}
              </Button>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default ReviewsList;

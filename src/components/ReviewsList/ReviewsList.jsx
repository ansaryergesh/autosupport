import React from 'react';
import styles from './index.module.less';
import { Col, Row, DatePicker } from 'antd';
import Title from 'antd/lib/typography/Title.js';
import Button from '../Button/Button.jsx';
import { i18n } from '../../utils/i18next';

const { RangePicker } = DatePicker;

const data = [
  {
    question:
      'Здравствуйте, не могу вывести остаток денег со своего брокерского счёта. Там 30$. Помогите пожалуйста',
    id: 1
  },
  {
    question:
      'Здравствуйте, не могу вывести остаток денег со своего брокерского счёта. Там 30$. Помогите пожалуйста',
    id: 2
  },
  {
    question:
      'Здравствуйте, не могу вывести остаток денег со своего брокерского счёта. Там 30$. Помогите пожалуйста',
    id: 3
  },
  {
    question:
      'Здравствуйте, не могу вывести остаток денег со своего брокерского счёта. Там 30$. Помогите пожалуйста',
    id: 4
  },
  {
    question:
      'Здравствуйте, не могу вывести остаток денег со своего брокерского счёта. Там 30$. Помогите пожалуйста',
    id: 5
  }
];

const rangePresets = [
  {
    label: 'Последние 7 дней',
    value: []
  },
  {
    label: 'Последние 14 дней',
    value: []
  },
  {
    label: 'Последний месяц',
    value: []
  },
  {
    label: 'Последние 3 месяца',
    value: []
  },
  {
    label: 'Последний год',
    value: []
  },
  {
    label: 'За все время',
    value: []
  }
];

const ReviewsList = () => {
  return (
    <div className={styles.box}>
      <Row gutter={[0, 16]}>
        <Col style={{ marginLeft: 'auto' }}>
          <Title level={3}>{i18n.t('feedback.ListTitle')}</Title>
        </Col>

        {/* <Col>
          <div className={styles.filterIcon}>
            <p>Фильтры</p>
            <UpCircleOutlined style={{ color: '#51AF3D' }} />
          </div>
        </Col> */}

        <Col style={{ marginLeft: 'auto' }}>
          <RangePicker className={styles.datePicker} presets={rangePresets} />
        </Col>

        {data.map((q) => (
          <Col span={24} className={styles.questionBox} key={q.id}>
            <span>{q.question}</span>
          </Col>
        ))}

        <Col style={{ marginLeft: 'auto' }}>
          <Button type="primary" className={styles.btnDownload}>
            {i18n.t('actions.saveReviews')}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewsList;

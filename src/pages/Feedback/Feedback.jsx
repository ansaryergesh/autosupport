import { Col, Row } from 'antd';
import React from 'react';
import styles from './index.module.less';
import Title from 'antd/lib/typography/Title.js';
import NewLabelsList from 'components/NewLabelsList/NewLabelsList.jsx';
import ReviewsList from 'components/ReviewsList/ReviewsList';
import FeedbackAnalytics from 'components/FeedbackAnalytics/FeedbackAnalytics';
import { i18n } from '../../utils/i18next';

const Feedback = () => {
  return (
    <div className={styles.feedbackBox}>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <div className={styles.textBox}>
            <Title level={3}>{i18n.t('feedback.MainTitle1')}</Title>
          </div>
        </Col>

        <Col span={24}>
          <NewLabelsList />
        </Col>

        <Col style={{ margin: '0 auto' }}>
          <FeedbackAnalytics />
        </Col>

        <Col style={{ margin: '0 auto' }}>
          <ReviewsList />
        </Col>
      </Row>
    </div>
  );
};

export default Feedback;

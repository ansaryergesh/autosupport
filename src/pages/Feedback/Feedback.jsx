import { Col, Row } from 'antd';
import React from 'react';
import styles from './index.module.less';
import NewLabelsList from 'components/NewLabelsList/NewLabelsList.jsx';
import ReviewsList from 'components/ReviewsList/ReviewsList';
import FeedbackAnalytics from 'components/FeedbackAnalytics/FeedbackAnalytics';
import { i18n } from '../../utils/i18next';
// import TypographyHead from 'components/Typography/TypographyHead';
// import { TypoGraphyType } from 'components/Typography/constants';
import JHeader from '../../components/JHeader/JHeader';

const Feedback = () => {
  return (
    <>
      <JHeader pageTitle={i18n.t('reviews')} />

      <div className={styles.feedbackBox}>
        <Row gutter={[0, 24]}>
          {/* <Col span={24}>
            <TypographyHead
              content={i18n.t('feedback.MainTitle1')}
              type={TypoGraphyType.HEADER}
            />
          </Col> */}

          <Col span={24}>
            <NewLabelsList />
          </Col>

          <Col span={24}>
            <FeedbackAnalytics />
          </Col>

          <Col span={24}>
            <ReviewsList />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Feedback;

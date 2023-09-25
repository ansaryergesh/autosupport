import React from 'react';
import NewLabels from '../NewLabels/NewLabels.jsx';
import { Col, Row } from 'antd';
import { i18n } from '../../utils/i18next';
import TypographyHead from 'components/Typography/TypographyHead';
import { TypoGraphyType } from 'components/Typography/constants';

const NewLabelsList = () => {
  const labelCounts = [5, 4, 3, 2, 1];

  return (
    <div style={{ marginBottom: '24px' }}>
      <Row gutter={[0, 18]}>
        <Col span={24}>
          <TypographyHead
            content={i18n.t('feedback.AddTicketTitle')}
            type={TypoGraphyType.SECONDARY_HEAD}
          />
        </Col>
        {labelCounts.map((count, index) => (
          <Col key={index} span={24}>
            <NewLabels num={count} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default NewLabelsList;

import React from 'react';
import NewLabels from '../NewLabels/NewLabels.jsx';
import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title.js';

const NewLabelsList = () => {
  return (
    <div>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Title level={3}>Функционал добавления новых меток</Title>
        </Col>
        <Col span={24}>
          <NewLabels num={5} />
        </Col>
        <Col span={24}>
          <NewLabels num={4} />
        </Col>

        <Col span={24}>
          <NewLabels num={3} />
        </Col>

        <Col span={24}>
          <NewLabels num={2} />
        </Col>

        <Col span={24}>
          <NewLabels num={1} />
        </Col>
      </Row>
    </div>
  );
};

export default NewLabelsList;

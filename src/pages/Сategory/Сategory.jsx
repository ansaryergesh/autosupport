import React, { useState } from 'react';
import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title.js';
import CategoryItem from 'components/CategoryItem/CategoryItem';

const data = [
  {
    title: 'Что это',
    questions: ['Для чего нужен брокерский счет?']
  },
  {
    title: 'Зачем она нужна',
    questions: ['Для чего нужен брокерский счет?']
  },
  {
    title: 'titl1',
    questions: ['Для чего нужен брокерский счет?']
  },
  {
    title: 'titl1',
    questions: ['Для чего нужен брокерский счет?']
  },
  {
    title: 'titl1',
    questions: ['Для чего нужен брокерский счет?']
  },
  {
    title: 'titl1',
    questions: ['Для чего нужен брокерский счет?']
  },
  {
    title: 'titl1',
    questions: ['Для чего нужен брокерский счет?']
  },
  {
    title: 'titl1',
    questions: ['Для чего нужен брокерский счет?']
  }
];

function Сategory() {
  const [editableData, setEditableData] = useState(data);

  return (
    <div>
      <Title style={{ marginBottom: '48px' }}>
        Торговая площадка-Tradernet global{' '}
      </Title>
      <Row gutter={[16, 16]}>
        {editableData.map((item, index) => (
          <Col key={index} span={12}>
            <CategoryItem setEditableData={setEditableData} data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Сategory;

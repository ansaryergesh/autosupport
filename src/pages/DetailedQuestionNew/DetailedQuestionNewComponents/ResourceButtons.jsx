import React, { useState } from 'react';
import { Row, Space } from 'antd';
import Button from '../../../components/Button/Button';

const ResourceButtons = () => {
  const [selectedAppButton, setSelectedAppButton] = useState('В приложении');
  return (
    <Row>
      <Space direction="horizontal" size={5}>
        <Button
          type={
            selectedAppButton === 'В приложении' ? 'default-active' : undefined
          }
          onClick={() => setSelectedAppButton('В приложении')}>
          В приложении
        </Button>

        <Button
          type={selectedAppButton === 'На сайте' ? 'default-active' : undefined}
          onClick={() => setSelectedAppButton('На сайте')}>
          На сайте
        </Button>

        <Button
          type={
            selectedAppButton === 'Клиенты Freedom Finance PLC'
              ? 'default-active'
              : undefined
          }
          onClick={() => setSelectedAppButton('Клиенты Freedom Finance PLC')}>
          Клиенты Freedom Finance PLC
        </Button>

        <Button
          type={
            selectedAppButton === 'Клиенты АО Фридом Финанас'
              ? 'default-active'
              : undefined
          }
          onClick={() => setSelectedAppButton('Клиенты АО Фридом Финанас')}>
          Клиенты АО «Фридом Финанс»
        </Button>
      </Space>
    </Row>
  );
};

export default ResourceButtons;

import React, { useState } from 'react';
import { Space, Row } from 'antd';
import Button from '../../../components/Button/Button';

const PageLanguage = () => {
  const [selectedAppButton, setSelectedAppButton] = useState('РУС');
  return (
    <div>
      <Row>
        <Space direction="horizontal" size={'small'}>
          <Button
            type={selectedAppButton === 'РУС' ? 'primary' : undefined}
            onClick={() => setSelectedAppButton('РУС')}
          >
            РУС
          </Button>
          <Button
            type={selectedAppButton === 'КАЗ' ? 'primary' : undefined}
            onClick={() => setSelectedAppButton('КАЗ')}
          >
            КАЗ
          </Button>
          <Button
            type={selectedAppButton === 'ENG' ? 'primary' : undefined}
            onClick={() => setSelectedAppButton('ENG')}
          >
            ENG
          </Button>
        </Space>
      </Row>
    </div>
  );
};

export default PageLanguage;

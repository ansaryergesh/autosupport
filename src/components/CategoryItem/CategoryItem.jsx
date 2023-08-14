import { Card } from 'antd';
import React from 'react';
import { Typography } from 'antd';
import styles from './index.module.less';

const { Title, Paragraph } = Typography;

function CategoryItem({ data }) {
  return (
    <div>
      <Card className={styles.card} bordered={false}>
        <Title level={5} editable className={styles.title}>
          {data.title}
        </Title>
        <Paragraph editable className={styles.paragraph}>
          {data.questions}
        </Paragraph>
      </Card>
    </div>
  );
}

export default CategoryItem;

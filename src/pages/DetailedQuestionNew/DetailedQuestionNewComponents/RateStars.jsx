import { Rate, Space } from 'antd';
import React from 'react';
import Button from '../../../components/Button/Button';
import styles from './index.module.less';

const RateStars = () => {
  return (
    <div className={styles.content}>
      <h2>Полезен ли был ответ?</h2>
      <Space direction="vertical" size={15}>
        <p className="my-paragraph">
          Просьба оценить ответ по 5-и бальной шкале, это поможет нам стать
          лучше
        </p>
        <Rate className={styles.rateStars} />
        <Button type="third">Оставить отзыв</Button>
      </Space>
    </div>
  );
};

export default RateStars;

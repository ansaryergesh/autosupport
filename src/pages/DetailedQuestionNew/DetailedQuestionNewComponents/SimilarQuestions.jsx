import { Card } from 'antd';
import React from 'react';
import styles from './index.module.less';

const data = {
  title: 'Похожие запросы',
  questions: ['Типы приказов', 'Сессия безопасности', 'Типы безопасности']
};

const SimilarQuestions = () => {
  return (
    <div className={styles.similar}>
      <Card className={styles.similarCard}>
        <h4>{data.title}</h4>
        {data.questions.map((q, i) => (
          <p key={i}>{q}</p>
        ))}
      </Card>
    </div>
  );
};

export default SimilarQuestions;

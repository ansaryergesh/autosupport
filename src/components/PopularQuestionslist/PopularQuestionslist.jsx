import React, { useState } from 'react';
import styles from './index.module.less';

const data = {
  name: 'Популярные вопросы',
  questions: [
    'Сколько занимает открытие счета',
    'Сколько занимает открытие счета',
    'Сколько занимает открытие счета'
  ]
};

const PopularQuestionslist = () => {
  return (
    <div className={styles.popularBox}>
      <h2 className="my-heading-2">{data.name}</h2>
      {data.questions.map((item, index) => (
        <p
          key={index}
          className={`${
            index > 1 ? '' : styles.gradientBorder
          } my-paragraph popularText`}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default PopularQuestionslist;

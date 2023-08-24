import React from 'react';
import styles from './index.module.less';
import TypographyHead from '../../components/Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../../components/Typography/constants.js';

const dataSimilar = [
  {
    id: 1,
    questionContents: {
      title: 'Типы приказов'
    }
  },
  {
    id: 2,
    questionContents: {
      title: 'Сессия безопасности'
    }
  },
  {
    id: 3,
    questionContents: {
      title: 'Типы безопасности'
    }
  }
];

const SimilarQuestions = () => {
  return (
    <div className={styles.similarCard}>
      <div className={styles.similarTextBox}>
        <TypographyHead
          className={styles.similarHead}
          type={TypoGraphyType.SUB_HEAD}
          content={'Похожие запросы'}
        />
        {dataSimilar?.map((q) => (
          <TypographyHead
            className={styles.similarParagraph}
            key={q.id}
            type={TypoGraphyType.LEVEL_2}
            content={q.questionContents.title}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarQuestions;

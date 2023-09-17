import React from 'react';
import styles from './index.module.less';
import TypographyHead from '../../components/Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../../components/Typography/constants.js';
import { i18n } from '../../utils/i18next.js';
import {findByLangKey} from "../../helpers/findByLangKey.js";
const dataSimilar = [
  {
    id: 1,
    questionContents: {
      title: 'Типы приказов',
    },
  },
  {
    id: 2,
    questionContents: {
      title: 'Сессия безопасности',
    },
  },
  {
    id: 3,
    questionContents: {
      title: 'Типы безопасности',
    },
  },
];

const SimilarQuestions = () => {
  return (
    <div className={styles.similarCard}>
      <div className={styles.similarTextBox}>
        <TypographyHead
          className={styles.similarHead}
          type={TypoGraphyType.SUB_HEAD}
          content={i18n.t('similarRequests')}
        />
        {dataSimilar?.map((q) => (
          <TypographyHead
            className={styles.similarParagraph}
            key={q.id}
            type={TypoGraphyType.LEVEL_2}
            content={findByLangKey(q?.questionContents) ? findByLangKey(q?.questionContents).title : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarQuestions;

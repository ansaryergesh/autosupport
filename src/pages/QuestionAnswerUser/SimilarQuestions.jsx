import React from 'react';
import styles from './index.module.less';
import TypographyHead from '../../components/Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../../components/Typography/constants.js';
import { getLocale, i18n } from '../../utils/i18next.js';
import { Link } from 'react-router-dom';
// import { findByLangKey } from '../../helpers/findByLangKey.js';

const SimilarQuestions = ({ data }) => {
  return (
    <div className={styles.similarCard}>
      <div className={styles.similarTextBox}>
        <TypographyHead
          className={styles.similarHead}
          type={TypoGraphyType.SUB_HEAD}
          content={i18n.t('similarRequests')}
        />
        {data?.question.children?.map((q) => (
          <Link to={`/question/admin/${q.id}`} key={q.id}>
            <TypographyHead
              className={styles.similarParagraph}
              type={TypoGraphyType.LEVEL_2}
              content={
                q?.questionContents
                  ? q?.questionContents.find((item) => item.langKey === getLocale())?.title
                  : ''
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarQuestions;

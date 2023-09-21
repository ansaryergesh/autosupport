import { Typography } from 'antd';
import React from 'react';
import styles from './index.module.less';
import { Link } from 'react-router-dom';
import TypographyHead from '../Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../Typography/constants.js';
import { i18n } from '../../utils/i18next';

const CardComponent = (props) => {
  const { Text } = Typography;
  const questions = props.data?.questions;
  const maxQuestionsToShow = 4; // Maximum number of questions to show without ellipsis

  return (
    <div className={styles.card}>
      <div className={'my-heading-2'}>
        <div>
          <Link to={`/category/${props.data?.id}`}>
            <Text ellipsis={{ rows: 2, expandable: false }}>
              <TypographyHead
                className={styles.title}
                type={TypoGraphyType.SUB_HEAD}
                content={props.data?.categorieContents?.name}
              />
            </Text>
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        {questions?.slice(0, maxQuestionsToShow).map((q, index) => (
          <p className={styles.question} key={index}>
            <Link to={`/question/admin/${q.id}`}>
              <Text>
                <TypographyHead
                  type={TypoGraphyType.LEVEL_2}
                  content={q.questionContents[0].title}
                />
              </Text>
            </Link>
          </p>
        ))}
        {questions?.length > maxQuestionsToShow && (
          <Text className={styles.more}>
            ... {i18n.t('more')} {questions.length - maxQuestionsToShow}{' '}
            {i18n.t('moreQuestions')}
          </Text>
        )}
      </div>
    </div>
  );
};

export default CardComponent;

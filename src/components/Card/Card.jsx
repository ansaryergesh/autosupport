import { Typography } from 'antd';
import React from 'react';
import styles from './index.module.less';
import { Link } from 'react-router-dom';
import TypographyHead from '../Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../Typography/constants.js';
const CardComponent = (props) => {
  const { Text } = Typography;
  const questions = props.data?.questions;
  const maxQuestionsToShow = 4; // Maximum number of questions to show without ellipsis

  return (
    <Link to={'/question/admin'}>
      <div className={styles.card}>
        <div className={'my-heading-2'}>
          <div className={styles.title}>
            <Text ellipsis={{ rows: 2, expandable: false }}>
              <TypographyHead
                type={TypoGraphyType.SUB_HEAD}
                content={props.data?.categorieContents.name}
              />
            </Text>
          </div>
        </div>
        <div className={styles.content}>
          {questions?.slice(0, maxQuestionsToShow).map((q, index) => (
            <p key={index} style={{ marginBottom: '11px' }}>
              <Text ellipsis={{ rows: 2, expandable: false }}>
                <TypographyHead
                  type={TypoGraphyType.LEVEL_2}
                  content={q.questionContents.title}
                />
              </Text>
            </p>
          ))}
          {questions?.length > maxQuestionsToShow && (
            <Text style={{ color: '#1890ff', cursor: 'pointer' }}>
              ...and {questions.length - maxQuestionsToShow} more questions
            </Text>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;

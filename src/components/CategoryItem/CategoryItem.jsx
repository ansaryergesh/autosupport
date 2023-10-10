import React from 'react';
import { notification, Typography } from 'antd';
import styles from './index.module.less';
import { findByLangKey } from '../../helpers/findByLangKey.js';
import { i18n } from '../../utils/i18next.js';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function CategoryItem({ editQuestion, getAllQuestion, data }) {
  const handleEditQuestion = (value) => {
    const finalQuestionContent = {
      ...data,
      questionContents: [{ ...data.questionContents[0], title: value }],
    };

    editQuestion(finalQuestionContent).then(() => {
      notification.info({ message: i18n.t('actions.edited') });
      getAllQuestion();
    });
  };

  const handleEditQuestionDesc = (value) => {
    const finalQuestionContent = {
      ...data,
      questionContents: [{ ...data?.questionContents[0], stepDescription: value }],
    };

    editQuestion(finalQuestionContent).then(() => {
      notification.info({ message: i18n.t('actions.edited') });
      getAllQuestion();
    });
  };

  const titleText = findByLangKey(data?.questionContents)
    ? findByLangKey(data?.questionContents).title
    : '';

  const stepDescriptionText = findByLangKey(data?.questionContents)
    ? findByLangKey(data?.questionContents).stepDescription
    : '';

  return (
    <div>
      <div className={styles.card}>
        <Link to={`/question/admin/${data?.id}`}>
          <Title
            ellipsis={{ rows: 1, expandable: false }}
            title={titleText}
            level={5}
            editable={{ onChange: handleEditQuestion }}
            className={styles.title}
          >
            {titleText}
          </Title>
        </Link>
        <Paragraph
          ellipsis={{ rows: 1, expandable: false }}
          title={stepDescriptionText}
          editable={{ onChange: handleEditQuestionDesc }}
          className={styles.paragraph}
        >
          {stepDescriptionText}
        </Paragraph>
      </div>
    </div>
  );
}

export default CategoryItem;

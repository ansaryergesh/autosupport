import React from 'react';
import { notification, Typography } from 'antd';
import styles from './index.module.less';
import { findByLangKey } from '../../helpers/findByLangKey.js';
import { i18n } from '../../utils/i18next.js';

const { Title, Paragraph } = Typography;

function CategoryItem({ editQuestion, getAllQuestion, data }) {
  const handleEditQuestion = (value) => {
    const finalQuestionContent = {
      ...data,
      questionContents: [{ ...data.questionContents[0], title: value }],
    };

    console.log(finalQuestionContent);
    editQuestion(finalQuestionContent).then((res) => {
      console.log(res);
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

  return (
    <div>
      <div className={styles.card}>
        <Title level={5} editable={{ onChange: handleEditQuestion }} className={styles.title}>
          {findByLangKey(data?.questionContents) ? findByLangKey(data?.questionContents).title : ''}
        </Title>
        <Paragraph editable={{ onChange: handleEditQuestionDesc }} className={styles.paragraph}>
          {findByLangKey(data?.questionContents)
            ? findByLangKey(data?.questionContents).stepDescription
            : ''}
        </Paragraph>
      </div>
    </div>
  );
}

export default CategoryItem;

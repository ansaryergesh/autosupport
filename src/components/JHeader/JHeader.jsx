import React from 'react';
import PropTypes from 'prop-types';
import TypographyHead from '../Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../Typography/constants.js';
import { Breadcrumb } from 'antd';
import { getCategoryByLangKey } from '../../helpers/getCategoryByLangKey.js';
import { getLocale } from '../../utils/i18next.js';
import { initialQuestionDto } from './constants.js';
import ArrowRight from 'images/arrowRight.svg';
import { Link } from 'react-router-dom';
import { i18n } from 'utils/i18next.js';

const JHeader = ({ isQuestion = true, questionInfo = initialQuestionDto }) => {
  const questionCategory =
    isQuestion &&
    getCategoryByLangKey(
      questionInfo.categorie?.categorieContents,
      getLocale().toUpperCase()
    );
  const questionCategoryTitle = questionCategory?.name;
  const questionCategoryId = questionCategory?.id;

  const questionByKey =
    isQuestion &&
    getCategoryByLangKey(
      questionInfo.questionContents,
      getLocale().toUpperCase()
    );
  const questionTitle = questionByKey?.title;
  const questionDescription = questionByKey?.stepDescription;

  return (
    <div>
      {questionInfo !== {} && isQuestion && (
        <Breadcrumb
          style={{ marginBottom: '24px' }}
          separator={<img src={ArrowRight} />}
          items={[
            {
              title: <Link to={'/'}>Главная</Link>
            },
            {
              title: (
                <Link to={`/category/${questionCategoryId}`}>
                  {questionCategoryTitle}
                </Link>
              )
            },
            {
              title: questionTitle
            }
          ]}
        />
      )}
      <TypographyHead
        className={'headerText'}
        type={TypoGraphyType.HEADER}
        content={!isQuestion ? i18n.t('home') : questionTitle}
      />
      <p style={{ padding: '16px 0' }}>{questionDescription}</p>
    </div>
  );
};

JHeader.propTypes = {
  isQuestion: PropTypes.bool,
  questionInfo: PropTypes.object
};
export default JHeader;

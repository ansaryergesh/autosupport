import React, { useEffect, useState } from 'react';
import { Col, Empty, Row } from 'antd';
import CategoryItem from 'components/CategoryItem/CategoryItem';
import { useParams } from 'react-router';
import {
  editCategoryQuestionPatch,
  getQuestions
} from '../../service/Question/index.js';
import { getLocale, i18n } from '../../utils/i18next.js';
import { useHistory } from 'react-router-dom';
import { getCategoryById } from '../../service/Category/index.js';
import JHeader from '../../components/JHeader/JHeader.jsx';

function Сategory() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState({});

  const history = useHistory();
  useEffect(() => {
    getAllQuestion();
    getCategoryInfo();
  }, [id]);

  const getCategoryInfo = () => {
    getCategoryById(id).then((res) => {
      setCategoryInfo(res.data);
    });
  };

  // eslint-disable-next-line no-unused-vars
  const selectedLanguageTitle = categoryInfo.categorieContents?.find(
    (item) => (item.langKey = getLocale())
  );

  const getAllQuestion = () => {
    const params = {
      langKey: getLocale().toUpperCase(),
      categorieId: id,
      pageSize: 10
    };
    getQuestions(params)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error(err);
        history.push('/');
      });
  };

  const editQuestion = (question) => {
    return editCategoryQuestionPatch(question);
  };
  return (
    <div>
      <JHeader pageTitle={selectedLanguageTitle?.name} />

      <Row gutter={[16, 16]}>
        {questions &&
          questions?.map((item, index) => (
            <Col key={index} span={12}>
              <CategoryItem
                editQuestion={editQuestion}
                getAllQuestion={getAllQuestion}
                data={item}
              />
            </Col>
          ))}
        {!questions.length && (
          <Empty
            style={{
              margin: '0 auto'
            }}
            description={i18n.t('noQuestion')}
          />
        )}
      </Row>
    </div>
  );
}

export default Сategory;

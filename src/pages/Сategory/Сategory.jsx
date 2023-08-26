import React, { useEffect, useState } from 'react';
import { Col, Result, Row } from 'antd';
import Title from 'antd/lib/typography/Title.js';
import CategoryItem from 'components/CategoryItem/CategoryItem';
import { useParams } from 'react-router';
import {
  editCategoryQuestionPatch,
  getQuestions
} from '../../service/Question/index.js';
import { getLocale } from '../../utils/i18next.js';
import { useHistory } from 'react-router-dom';

function Сategory() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getAllQuestion();
  }, [id]);
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
      <Title style={{ marginBottom: '48px' }}>
        Торговая площадка-Tradernet global
      </Title>
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
          <Result
            status="404"
            title="404"
            subTitle="Sorry, you are not authorized to access this page."
          />
        )}
      </Row>
    </div>
  );
}

export default Сategory;

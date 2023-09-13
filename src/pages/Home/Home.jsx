import React, { useEffect, useState } from 'react';
import CardComponent from 'components/Card/Card';
import { Col, Row } from 'antd';
import JHeader from 'components/JHeader/JHeader.jsx';
import { getCategories } from '../../service/Category/index.js';
import { getLocale } from '../../utils/i18next.js';
import { LANG_KEY } from '../../constants/index.js';
import { checkIfBottomScrolled } from '../../helpers/handleScroll.js';

const Home = () => {
  const [allCategories, setAllCategories] = useState([]);
  const defaultPageSize = 20;
  const [pageCurrent, setPageCurrent] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const getCategoryOnScroll = (pageCurrent) => {
    getCategories({
      pageCurrent,
      pageSize: defaultPageSize,
      langKey: getLocale()?.toUpperCase() || LANG_KEY.RU,
    }).then((res) => {
      setAllCategories((prevState) => [...prevState, ...res.data]);
    });
  };

  const handleScroll = (e) => {
    if (checkIfBottomScrolled(e) && Math.ceil(totalCount / defaultPageSize) >= pageCurrent + 1) {
      setPageCurrent((prevState) => {
        getCategoryOnScroll(prevState + 1);
        return prevState + 1;
      });
    }
  };

  useEffect(() => {
    getCategoryAll();
  }, []);

  const getCategoryAll = () => {
    getCategories().then((res) => {
      setAllCategories(res.data);
      setTotalCount(res.headers['x-total-count']);
    });
  };
  return (
    <div onScroll={(e) => handleScroll(e)}>
      <JHeader isQuestion={false} />
      <Row gutter={[24, 24]}>
        {allCategories.map((item, index) => (
          <Col key={index} span={8}>
            <CardComponent data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;

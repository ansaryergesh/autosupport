import { Modal, Table, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import TypographyHead from '../Typography/TypographyHead';
import { TypoGraphyType } from '../Typography/constants';
import Input from '../../components/Input/Input';
import { i18n } from 'utils/i18next.js';
import { ReactComponent as SearchIcon } from 'images/SearchIcon.svg';
import { ReactComponent as SearchIconFocus } from 'images/SearchIconFocus.svg';
import styles from './index.module.less';
import { getQuestions } from '../../service/Question';
import { answerByQuestionAndResource } from '../../service/Answer';

const CloneAnswerModal = ({ isModalOpen, setIsModalOpen, activeResource, setAnswerFormData }) => {
  const [data, setData] = useState();
  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [totalPages, setTotalPages] = useState(1);

  const getQuestionsList = (pageCurrent, pageSize, query) => {
    const params = {
      pageCurrent: pageCurrent - 1,
      pageSize,
      query,
    };

    getQuestions(params).then((res) => {
      setData(res.data);
      setTotalPages(res.headers['x-total-count']);
    });
  };

  useEffect(() => {
    getQuestionsList(1, 5);
  }, []);

  const handleFocus = (focused) => {
    setFocus(focused);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    getQuestionsList(1, 5, value);
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: i18n.t('questionAnswer.question'),
      key: 'title',
      render: (_, record) => <span>{record.questionContents[0].title}</span>,
    },
    {
      title: i18n.t('description'),
      key: 'stepDescription',
      render: (_, record) => <span>{record.questionContents[0].stepDescription}</span>,
    },
  ];

  const handleClick = (record) => {
    answerByQuestionAndResource(record.id, activeResource?.id)
      .then((res) => {
        setAnswerFormData((prev) => {
          const resultData = res.data.answerContents.map((item) => {
            const matchedPrevId = prev.answerContents.find(
              (item2) => item.langKey === item2.langKey,
            )?.id;
            return { ...item, id: matchedPrevId };
          });

          return { ...prev, answerContents: resultData };
        });
        setIsModalOpen(false);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          notification.info({
            message: i18n('resourceQuestionNotFound'),
          });
        } else {
          notification.error({ message: i18n.t('error.wrong') });
        }
      });
  };

  return (
    <Modal
      width={'auto'}
      style={{ margin: '0 360px' }}
      footer={false}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
      }}
    >
      <TypographyHead
        type={TypoGraphyType.SUB_HEAD}
        content={i18n.t('questionAnswer.cloneAnswer')}
      />

      <div className={styles.searchBox}>
        {focus ? (
          <SearchIconFocus className={styles.searchIcon} />
        ) : (
          <SearchIcon className={styles.searchIcon} />
        )}

        <Input
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          value={inputValue}
          onChange={(e) => handleSearch(e)}
          className={styles.searchInput}
          placeholder={i18n.t('search')}
        />
      </div>

      <Table
        onRow={(record) => ({
          onClick: () => {
            handleClick(record);
          },
        })}
        rowKey={(record) => record.id}
        dataSource={data}
        columns={columns}
        bordered
        pagination={{
          total: totalPages,
          onChange: (page) => getQuestionsList(page, 5, inputValue),
          position: ['bottomCenter'],
          pageSize: 5
        }}
      />
    </Modal>
  );
};

export default CloneAnswerModal;

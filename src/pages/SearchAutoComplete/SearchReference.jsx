import React, { useEffect, useState } from 'react';
import { AutoComplete, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import TypographyHead from 'components/Typography/TypographyHead.jsx';
import { TypoGraphyType } from 'components/Typography/constants.js';
import styles from './index.module.less';
import { i18n } from 'utils/i18next.js';
import Input from 'components/Input/Input.jsx';

const SearchReference = ({
  searchAction,
  addNewRecords,
  title,
  keyItem,
  setQuestionInfo,
  questionInfo,
  selectedLanguage
}) => {
  const [options, setOptions] = useState([]);
  const [langSelectedItem, setLangSelectedItem] = useState(
    questionInfo.questionContents?.find(
      (item) => item.langKey === selectedLanguage
    )[keyItem] || []
  );
  const getOptionsDefault = () => {
    searchAction().then((response) => {
      setOptions(
        response?.data.map((item) => ({ value: item.text, id: item.id }))
      );
    });
  };

  useEffect(() => {
    getOptionsDefault();
  }, []);

  useEffect(() => {
    setLangSelectedItem(
      questionInfo.questionContents?.find(
        (item) => item.langKey === selectedLanguage
      )[keyItem] || []
    );
  }, [questionInfo]);

  const [inputValue, setInputValue] = useState('');
  const handleSearch = (value) => {
    const params = {
      query: value,
      pageSize: 20
    };
    searchAction(params).then((response) => {
      setOptions(
        response?.data.map((item) => ({ value: item.text, id: item.id }))
      );
    });
  };

  const handleSelect = (value, option) => {
    const selectedItem = { id: option.id, text: value };
    const updatedQuestionContents = questionInfo.questionContents?.map(
      (questionContent) => {
        if (questionContent.langKey === selectedLanguage) {
          return {
            ...questionContent,
            [keyItem]: [...questionContent[keyItem], selectedItem]
          };
        }
        return questionContent;
      }
    );

    if (langSelectedItem?.some((item) => item.id === selectedItem.id)) {
      notification.info({
        message:
          keyItem === 'keyWords'
            ? i18n.t('alreadyKeyword')
            : i18n.t('alreadyTag')
      });
    } else {
      setQuestionInfo({
        ...questionInfo,
        questionContents: updatedQuestionContents
      });
      setInputValue('');
      getOptionsDefault();
      setInputValue(value);
    }
    setInputValue('');
  };

  const handleEnter = (event) => {
    let selectedItem = {};

    if (event.key === 'Enter' && inputValue.trim() !== '') {
      if (options.length === 0) {
        addNewRecords({ id: null, text: inputValue }).then((res) => {
          selectedItem = res.data;
          const updatedQuestionContents = questionInfo.questionContents.map(
            (questionContent) => {
              if (questionContent.langKey === selectedLanguage) {
                return {
                  ...questionContent,
                  [keyItem]: [...questionContent[keyItem], selectedItem]
                };
              }
              return questionContent;
            }
          );

          setQuestionInfo({
            ...questionInfo,
            questionContents: updatedQuestionContents
          });
        });
      }
      setInputValue('');
    }
  };

  const handleRemoveSelected = (id) => {
    const newData = langSelectedItem?.filter((item) => item.id !== id);
    const updatedQuestionContents = questionInfo.questionContents.map(
      (questionContent) => {
        if (questionContent.langKey === selectedLanguage) {
          return {
            ...questionContent,
            [keyItem]: newData
          };
        }
        return questionContent;
      }
    );
    setQuestionInfo({
      ...questionInfo,
      questionContents: updatedQuestionContents
    });
  };

  return (
    <div>
      <TypographyHead type={TypoGraphyType.SUB_HEAD} content={title} />

      <div className={styles.searchBox}>
        <AutoComplete
          className={styles.autoComplete}
          options={options}
          onSelect={handleSelect}
          onSearch={handleSearch}
          value={inputValue}
          onChange={(value) => setInputValue(value)}>
          <Input.Search
            placeholder={i18n.t('search')}
            className={styles.searchInput}
            onKeyDown={handleEnter}
          />
        </AutoComplete>
      </div>

      <div>
        <div>
          {Array.isArray(langSelectedItem) &&
            langSelectedItem.map((item, index) => (
              <div key={item.id + '_' + index} className={styles.selectedItems}>
                <span key={item.id}>{item.text}</span>
                <CloseOutlined
                  className={styles.xBtn}
                  onClick={() => handleRemoveSelected(item.id)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchReference;

import React, { useEffect, useState } from 'react';
import { AutoComplete, Input, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import TypographyHead from '../../components/Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../../components/Typography/constants.js';
import styles from './index.module.less';

const SearchReference = ({
  searchAction,
  addNewRecords,
  title,
  keyItem,
  setQuestionInfo,
  questionInfo,
  selectedLanguage,
}) => {
  const [options, setOptions] = useState([]);
  const [langSelectedItem, setLangSelectedItem] = useState(
    questionInfo.questionContents?.find((item) => item.langKey === selectedLanguage)[keyItem] || [],
  );
  const getOptionsDefault = () => {
    searchAction().then((response) => {
      setOptions(response?.data.map((item) => ({ value: item.text, id: item.id })));
    });
  };

  useEffect(() => {
    getOptionsDefault();
  }, []);

  useEffect(() => {
    console.log(questionInfo);
    setLangSelectedItem(
      questionInfo.questionContents?.find((item) => item.langKey === selectedLanguage)[keyItem] ||
        [],
    );
  }, [questionInfo]);

  const [inputValue, setInputValue] = useState('');
  const handleSearch = (value) => {
    const params = {
      query: value,
      pageSize: 20,
    };
    searchAction(params).then((response) => {
      setOptions(response?.data.map((item) => ({ value: item.text, id: item.id })));
    });
  };

  const handleSelect = (value, option) => {
    const selectedItem = { id: option.id, text: value };
    console.log(questionInfo);
    const updatedQuestionContents = questionInfo.questionContents?.map((questionContent) => {
      if (questionContent.langKey === selectedLanguage) {
        // Update the tags and keyWords arrays for this questionContent
        return {
          ...questionContent,
          [keyItem]: [...questionContent[keyItem], selectedItem],
        };
      }
      return questionContent; // Return unchanged questionContent for other langKeys
    });

    if (langSelectedItem?.some((item) => item.id === selectedItem.id)) {
      notification.info({ message: 'Keyword already selected' });
    } else {
      console.log(updatedQuestionContents);
      console.log({
        ...questionInfo,
        questionContents: updatedQuestionContents,
      });
      setQuestionInfo({
        ...questionInfo,
        questionContents: updatedQuestionContents,
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
          const updatedQuestionContents = questionInfo.questionContents.map((questionContent) => {
            if (questionContent.langKey === selectedLanguage) {
              // Update the tags and keyWords arrays for this questionContent
              return {
                ...questionContent,
                [keyItem]: [...questionContent[keyItem], selectedItem],
              };
            }
            return questionContent; // Return unchanged questionContent for other langKeys
          });

          setQuestionInfo({
            ...questionInfo,
            questionContents: updatedQuestionContents,
          });
        });
      }
      setInputValue('');
    }
  };

  const handleRemoveSelected = (id) => {
    const newData = langSelectedItem?.filter((item) => item.id !== id);
    console.log(newData);
    const updatedQuestionContents = questionInfo.questionContents.map((questionContent) => {
      if (questionContent.langKey === selectedLanguage) {
        // Update the tags and keyWords arrays for this questionContent
        return {
          ...questionContent,
          [keyItem]: newData,
        };
      }
      return questionContent; // Return unchanged questionContent for other langKeys
    });
    setQuestionInfo({
      ...questionInfo,
      questionContents: updatedQuestionContents,
    });
  };

  return (
    <div>
      <TypographyHead type={TypoGraphyType.SUB_HEAD} content={title} />
      <AutoComplete
        style={{ width: '100%', paddingTop: '16px' }}
        options={options}
        onSelect={handleSelect}
        onSearch={handleSearch}
        placeholder="Search items"
        value={inputValue}
        onChange={(value) => setInputValue(value)}
      >
        <Input.Search onKeyDown={handleEnter} />
      </AutoComplete>

      <div>
        <div>
          {Array.isArray(langSelectedItem) &&
            langSelectedItem.map((item, index) => (
              <div
                key={item.id + '_' + index}
                style={{
                  display: 'flex',
                  padding: '18px',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #d9d9d9',
                  alignItems: 'center',
                }}
              >
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

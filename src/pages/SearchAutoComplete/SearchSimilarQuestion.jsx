import React, { useEffect, useState } from 'react';
import { AutoComplete, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import TypographyHead from 'components/Typography/TypographyHead.jsx';
import { TypoGraphyType } from 'components/Typography/constants.js';
import styles from './index.module.less';
import { findByLangKey } from 'helpers/findByLangKey.js';
import { getLocale, i18n } from 'utils/i18next.js';
import Input from 'components/Input/Input.jsx';

const SearchReference = ({
  searchAction,
  selectedItems,
  setSelectedItems,
  title,
  questionInfo,
  withoutQuestionInfo=false,
}) => {
  const [options, setOptions] = useState([]);

  const getOptionsDefault = () => {
    searchAction().then((response) => {
      setOptions(
        response?.data
          .filter((option) => option.id !== questionInfo.id)
          .map((item) => ({
            value: findByLangKey(item?.questionContents)
              ? findByLangKey(item?.questionContents).title
              : '',
            id: item.id,
            itemValue: item
          }))
      );
    });
  };

  useEffect(() => {
    if (!withoutQuestionInfo) {
      setSelectedItems(
        questionInfo?.children?.filter((item) =>
          item.questionContents.find((item2) => item2.langKey === getLocale())
        ) || []
      );
    }
  }, []);

  useEffect(() => {
    getOptionsDefault();
  }, []);

  const [inputValue, setInputValue] = useState('');
  const handleSearch = (value) => {
    const params = {
      query: value,
      pageSize: 5
    };
    searchAction(params).then((response) => {
      setOptions(
        response?.data.map((item) => ({
          value: findByLangKey(item?.questionContents)
            ? findByLangKey(item?.questionContents).title
            : '',
          id: item.questionContents?.id,
          itemValue: item
        }))
      );
    });
  };

  const handleSelect = (value, option) => {
    const selectedItem = option.itemValue;
    if (selectedItems?.some((item) => item.id === selectedItem.id)) {
      notification.info({ message: i18n.t('alreadySimilar') });
    } else {
      setSelectedItems(
        selectedItems ? [...selectedItems, selectedItem] : [selectedItem]
      );

      setInputValue('');
      getOptionsDefault();
    }
    setInputValue('');
  };

  const handleRemoveSelected = (id) => {
    const newData = selectedItems?.filter((item) => item.id !== id);
    setSelectedItems(newData);
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
            className={styles.searchInput}
            placeholder={i18n.t('search')}
          />
        </AutoComplete>
      </div>

      <div>
        <div>
          {Array.isArray(selectedItems) &&
            selectedItems.map((item) => (
              <div key={item.id} className={styles.selectedItems}>
                <span key={item.id}>
                  {item.questionContents
                    ? item.questionContents.find(
                        (question) => question.langKey === getLocale()
                      )?.title
                    : item.questionContent.find(
                        (question) => question.langKey === getLocale()
                      )?.title}
                </span>
                <CloseOutlined
                  className={styles.xBtn}
                  onClick={() => {handleRemoveSelected(item.id);}}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchReference;

import React, { useEffect, useState } from 'react';
import { AutoComplete, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import TypographyHead from '../../components/Typography/TypographyHead.jsx';
import { TypoGraphyType } from '../../components/Typography/constants.js';
import styles from './index.module.less';
import { findByLangKey } from '../../helpers/findByLangKey.js';
import { i18n } from '../../utils/i18next.js';
import Input from '../../components/Input/Input.jsx';
import { ReactComponent as SearchIcon } from 'images/SearchIcon.svg';
import { ReactComponent as SearchIconFocus } from 'images/SearchIconFocus.svg';

const SearchReference = ({ searchAction, selectedItems, setSelectedItems, title }) => {
  const [options, setOptions] = useState([]);

  const getOptionsDefault = () => {
    searchAction().then((response) => {
      setOptions(
        response?.data.map((item) => ({
          value: findByLangKey(item?.questionContents)
            ? findByLangKey(item?.questionContents).title
            : '',
          id: item.questionContents?.id,
          itemValue: item,
        })),
      );
    });
  };
  const [focus, setFocus] = useState(false);

  const handleFocus = (focused) => {
    setFocus(focused);
  };

  useEffect(() => {
    getOptionsDefault();
  }, []);

  const [inputValue, setInputValue] = useState('');
  const handleSearch = (value) => {
    const params = {
      query: value,
      pageSize: 20,
    };
    searchAction(params).then((response) => {
      setOptions(
        response?.data.map((item) => ({
          value: findByLangKey(item?.questionContents)
            ? findByLangKey(item?.questionContents).title
            : '',
          id: item.questionContents?.id,
          itemValue: item,
        })),
      );
    });
  };

  const handleSelect = (value, option) => {
    const selectedItem = option.itemValue;
    console.log(selectedItem);
    if (selectedItems?.some((item) => item.id === selectedItem.id)) {
      notification.info({ message: i18n.t('alreadySimilar') });
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
      console.log([...selectedItems, selectedItem]);

      setInputValue('');
      getOptionsDefault();
      setInputValue(value);
    }
    setInputValue('');
  };

  // eslint-disable-next-line no-unused-vars
  const handleRemoveSelected = (id) => {
    const newData = selectedItems?.filter((item) => item.id !== id);
    setSelectedItems(newData);
  };
  //
  // const selectedLanguageItemTitle = (questionItem) => {
  //
  // }

  return (
    <div>
      <TypographyHead type={TypoGraphyType.SUB_HEAD} content={title} />

      <div className={styles.searchBox}>
        {focus ? (
          <SearchIconFocus className={styles.searchIcon} />
        ) : (
          <SearchIcon className={styles.searchIcon} />
        )}

        <AutoComplete
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          style={{ width: '100%', paddingTop: '16px' }}
          options={options}
          onSelect={handleSelect}
          onSearch={handleSearch}
          value={inputValue}
          onChange={(value) => setInputValue(value)}
        >
          <Input className={styles.searchInput} placeholder={i18n.t('search')} />
        </AutoComplete>
      </div>

      <div>
        <div>
          {Array.isArray(selectedItems) &&
            selectedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  padding: '18px',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #d9d9d9',
                  alignItems: 'center',
                }}
              >
                <span key={item.id}>
                  {findByLangKey(item?.questionContents)
                    ? findByLangKey(item?.questionContents).title
                    : ''}
                </span>
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

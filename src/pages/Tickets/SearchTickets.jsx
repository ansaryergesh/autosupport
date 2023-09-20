import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import { ReactComponent as SearchIcon } from 'images/SearchIcon.svg';
import { ReactComponent as SearchIconFocus } from 'images/SearchIconFocus.svg';
import styles from './index.module.less';
import { i18n } from 'utils/i18next.js';
import Button from '../../components/Button/Button';

const SearchTickets = ({ getTicketsList, inputValue, setInputValue }) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = (focused) => {
    setFocus(focused);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    getTicketsList(1, 10, value);
  };

  const handleReset = () => {
    getTicketsList(1, 10);
    setInputValue('');
  };

  return (
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
        placeholder={i18n.t('searchTickets')}
      />

      <Button type="modal" onClick={handleReset}>
        {i18n.t('actions.reset')}
      </Button>
    </div>
  );
};

export default SearchTickets;

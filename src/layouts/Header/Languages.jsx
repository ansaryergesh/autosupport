import React from 'react';
import styles from './Header.module.less';
import { i18n } from 'utils/i18next.js';
import { Select } from 'antd';
import LanguageIcon from 'images/LanguageIcon.svg';
import { getLocale } from '../../utils/i18next';

const Languages = () => {
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('locale', language);
    window.location.reload();
  };

  const getCurrentLanguage = getLocale() || 'ru';

  return (
    <div className={styles.languageBar}>
      <img src={LanguageIcon} alt="Languages icon" />
      <Select
        style={{ width: '77px' }}
        dropdownStyle={{
          textAlign: 'center',
          borderRadius: '16px'
        }}
        suffixIcon={null}
        value={getCurrentLanguage}
        bordered={false}
        onChange={(value) => changeLanguage(value.toLowerCase())}
        options={[
          { value: 'ru', label: 'RU' },
          { value: 'kz', label: 'KZ' },
          { value: 'en', label: 'ENG' }
        ]}
      />
    </div>
  );
};

export default Languages;

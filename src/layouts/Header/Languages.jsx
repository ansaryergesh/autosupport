import React, { useState } from 'react';
import styles from './Header.module.less';
import { i18n } from 'utils/i18next.js';
import { Select } from 'antd';
import { ReactComponent as LanguageIcon } from 'images/LanguageIcon.svg';
import { getLocale } from '../../utils/i18next';

const Languages = () => {
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('locale', language);
        window.location.reload();
    };
    const [isHovered, setIsHovered] = useState(false);

    const getCurrentLanguage = getLocale() || 'ru';

    return (
        <div className={styles.languageBar}>
            <LanguageIcon className={isHovered && styles.languageIconHovered} />
            <Select
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ width: '77px', padding: '0 !important', position: 'relative' }}
                dropdownStyle={{
                    boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.10)',
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

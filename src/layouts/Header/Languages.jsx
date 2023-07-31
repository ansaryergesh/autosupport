import React, {useState} from 'react';
import styles from './Header.module.less'
import Link from "antd/es/typography/Link.js";
import {i18n, getLocale} from "utils/i18next.js";


const Languages = () => {
    const languages = ["Ru", "Kz", "En"]

    const [selectedLanguage, setSelectedLanguage] = useState(getLocale() || languages[0].toLowerCase());

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('locale', language)
        setSelectedLanguage(language);
        window.location.reload();
    };

    return (
        <div className={styles.languageBar}>
            {languages.map((item,index) => (
                <Link className={`${styles.lang} ${selectedLanguage === item.toLowerCase() ? styles.active : ''}`} key={index} onClick={() => changeLanguage(item.toLowerCase())}>{item}</Link>
            ))}
        </div>
    )
}

export default Languages;
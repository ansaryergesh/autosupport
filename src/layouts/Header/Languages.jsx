import React from 'react';
import {Layout} from "antd";
import styles from './Header.module.less'
import Button from "components/Button/Button.jsx";
import Link from "antd/es/typography/Link.js";
const Languages = () => {
    const languages = ["Ru", "Kz", "En"]
    return (
        <div className={styles.languageBar}>
            {languages.map((item,index) => (
                <Link className={styles.lang} key={index}>{item}</Link>
            ))}
        </div>
    )
}

export default Languages;
import React from 'react';
import styles from './index.module.less';

const Footer = () => {
  const openLinks = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.footer}>
      <a href="#" onClick={() => openLinks('/confidential.pdf')}>
        <p>Политика конфиденциальности АО «Фридом Финанс»</p>
      </a>
      <p>
        050040, г. Алматы, проспект Аль-Фараби 77/7, БЦ Esentai Tower: 3, 7 этаж
      </p>

      <a href="#" onClick={() => openLinks('/confidential2.pdf')}>
        <p>Политика конфиденциальности ПК «Freedom Finance Global PLC»</p>
      </a>
      <p>
        020000, Республика Казахстан, г. Астана, район Есиль, улица Достык,
        здание 16, внп. 2 (Talan Towers Offices).
      </p>
    </div>
  );
};

export default Footer;

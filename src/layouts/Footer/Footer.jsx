import React from 'react';
import styles from './index.module.less';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p><a style={{color: '@gray-color-1 !important'}} href={'/confidential.pdf'} target={'_blank'} rel="noreferrer">Политика конфиденциальности</a></p>
      <p>050040, г. Алматы, проспект Аль-Фараби 77/7, БЦ Esentai Tower: 3, 7 этаж</p>
      <p>© 2023 АО «Фридом Финанс»</p>
    </div>
  );
};

export default Footer;

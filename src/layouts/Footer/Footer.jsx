import React from 'react';
import styles from './index.module.less';

const Footer = () => {

  const openMultipleLinks = () => {
    // Define an array of URLs you want to open
    const urlsToOpen = [
      '/confidential.pdf',
      '/confidential2.pdf',
    ];

    // Loop through the URLs and open them in new tabs/windows
    urlsToOpen.forEach((url) => {
      window.open(url, '_blank');
    });
  }
  return (
    <div className={styles.footer}>
      <p><a style={{color: '@gray-color-1 !important'}} href="#" onClick={() => openMultipleLinks()}>Политика конфиденциальности</a></p>
      <p>050040, г. Алматы, проспект Аль-Фараби 77/7, БЦ Esentai Tower: 3, 7 этаж</p>
      <p>© 2023 АО «Фридом Финанс»</p>
    </div>
  );
};

export default Footer;

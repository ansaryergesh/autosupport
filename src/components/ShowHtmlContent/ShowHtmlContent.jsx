import React from 'react';
import styles from './index.module.less';

const ShowHtmlContent = ({ htmlContent }) => {
  return (
    <div
      className={styles.htmlContent}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default ShowHtmlContent;

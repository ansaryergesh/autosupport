import React, { useState } from 'react';
import { FloatButton } from 'antd';
import { useHistory } from 'react-router-dom';
import { dataText } from './constants';
import { getLocale, i18n } from '../../utils/i18next';
import styles from './index.module.less';
import { CloseOutlined } from '@ant-design/icons';
const InfoHelp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();

  const title = () => {
    const path = history.location.pathname;

    if (path.includes('/employees')) {
      return i18n.t('employee');
    }
    if (path.includes('/feedback')) {
      return i18n.t('reviews');
    }
    if (path.includes('/search-history')) {
      return i18n.t('searchHistory');
    }
    if (path.includes('/resources')) {
      return i18n.t('resources');
    }
    if (path.includes('/new-tickets')) {
      return i18n.t('newTickets');
    }
    if (path.includes('/old-tickets')) {
      return i18n.t('oldTickets');
    }
    if (path.includes('/question/admin')) {
      return i18n.t('menu.editQuestion');
    }
    if (path.includes('/category')) {
      return i18n.t('categories');
    }
    if (path.includes('/question/preview')) {
      return i18n.t('actions.preview');
    }

    return null;
  };

  const text = () => {
    const path = history.location.pathname;

    const dataForCurrentLang = dataText.find(
      (text) => text.langKey === getLocale()
    );

    if (path.includes('/employees')) {
      return dataForCurrentLang.employees;
    }
    if (path.includes('/feedback')) {
      return dataForCurrentLang.feedback;
    }
    if (path.includes('/search-history')) {
      return dataForCurrentLang.searchHistory;
    }
    if (path.includes('/resources')) {
      return dataForCurrentLang.resources;
    }
    if (path.includes('/new-tickets')) {
      return dataForCurrentLang.newTickets;
    }
    if (path.includes('/old-tickets')) {
      return dataForCurrentLang.oldTickets;
    }
    if (path.includes('/question/admin')) {
      return dataForCurrentLang.answer;
    }
    if (path.includes('/category')) {
      return dataForCurrentLang.category;
    }
    if (path.includes('/question/preview')) {
      return dataForCurrentLang.preview;
    }

    return null;
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div>
      <FloatButton tooltip={i18n.t('instruction')} onClick={showModal} />
      {isModalVisible && (
        <div className={styles.hintInfo}>
          <i onClick={showModal}>
            <CloseOutlined />
          </i>

          <h3>{title()}</h3>
          {text()}
        </div>
      )}
    </div>
  );
};

export default InfoHelp;

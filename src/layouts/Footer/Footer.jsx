import React from 'react';
import styles from './index.module.less';
import { getLocale } from '../../utils/i18next.js';
import { LANG_KEY } from '../../constants/index.js';

const Footer = () => {
  const getUrlConfidential = () => {
    const lang = getLocale();
    if (lang === LANG_KEY.KZ) {
      return '/Құпиялық_саясаты_АО.pdf';
    }
    if (lang === LANG_KEY.EN) {
      return '/Privacy_policy_АО.pdf';
    }
    if (lang === LANG_KEY.RU) {
      return '/Политика_Конфиденциальности_АО.pdf';
    }
  };

  const openLinks = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.footer}>
      <a href="#" onClick={() => openLinks(getUrlConfidential())}>
        <p>Политика конфиденциальности АО «Фридом Финанс»</p>
      </a>
      <p>050040, г. Алматы, проспект Аль-Фараби 77/7, БЦ Esentai Tower: 3, 7 этаж</p>

      {getLocale() === LANG_KEY.KZ ? null : (
        <>
          <a
            href="#"
            onClick={() =>
              openLinks('/FFG_Политика_обработки_персональных_данных_1672206687_1675418536.pdf')
            }
          >
            <p>Политика конфиденциальности ПК «Freedom Finance Global PLC»</p>
          </a>
          <p>
            020000, Республика Казахстан, г. Астана, район Есиль, улица Достык, здание 16, внп. 2
            (Talan Towers Offices).
          </p>
        </>
      )}
    </div>
  );
};

export default Footer;

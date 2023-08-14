import React from 'react';
import { Image, Layout } from 'antd';
import styles from './Header.module.less';
import { Link } from 'react-router-dom';
import Logo from 'images/logoHeader.svg';
import Languages from './Languages.jsx';
import FreedomIcon from 'images/FreedomIcon.svg';

const Header = () => {
  const { Header } = Layout;

  return (
    <div>
      <Header className={styles.fixedHeader}>
        <div style={{ display: 'flex' }}>
          <Link to={'/'}>
            <Image src={Logo} preview={false} />
          </Link>
          <div className={styles.company}>
            <img src={FreedomIcon} alt="FreedomIcon" />
            <p>Freedom Broker</p>
          </div>
        </div>
        <Languages />
      </Header>
    </div>
  );
};

export default Header;

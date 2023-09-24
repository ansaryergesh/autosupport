import React, { useEffect, useState } from 'react';
import { Layout, Select } from 'antd';
import styles from './Header.module.less';
import Languages from './Languages.jsx';
import FreedomIcon from 'images/FreedomIcon.svg';
import { getOrganizationOpen } from '../../service/Organizations/index';
import { LocalStorageKeys } from '../../storage/localStorageKey';
import { checkPermissions } from '../../helpers/checkPermission';
import { getCurrentUserData } from '../../helpers/currentUser';

const Header = () => {
  const { Header } = Layout;
  const [organizations, setOrganizations] = useState();
  const [activeOrganization, setActiveOrganization] = useState(
    !checkPermissions(['ROLE_SUPER_ADMIN'])
      ? getCurrentUserData()?.authOrganization?.name
      : localStorage.getItem(LocalStorageKeys.ACTIVE_ORGANIZATION) || 'Choose organization',
  );
  useEffect(() => {
    if (checkPermissions(['ROLE_SUPER_ADMIN'])) {
      getOrganizationOpen()
        .then((res) => setOrganizations(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const items = organizations?.map((organization) => ({
    label: organization.name,
    value: organization.code,
  }));
  return (
    <div>
      <Header className={styles.fixedHeader}>
        <div style={{ display: 'flex' }}>
          <div className={styles.company}>
            <img src={FreedomIcon} alt="FreedomIcon" />
            {checkPermissions(['ROLE_SUPER_ADMIN']) ? (
              <Select
                style={{ minWidth: '100px' }}
                bordered={false}
                suffixIcon={false}
                value={activeOrganization}
                options={items}
                onChange={(value) => {
                  setActiveOrganization(value);
                  localStorage.setItem(LocalStorageKeys.ACTIVE_ORGANIZATION, value);
                  location.reload();
                }}
              />
            ) : (
              <p>{activeOrganization}</p>
            )}
          </div>
        </div>
        <Languages />
      </Header>
    </div>
  );
};

export default Header;

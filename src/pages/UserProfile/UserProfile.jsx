import React from 'react';
import { Tabs } from 'antd';
import AccountData from './DataPagesComponents/AccountData';
import UserData from './DataPagesComponents/UserData';
import { i18n } from '../../utils/i18next.js';

const UserProfile = () => {
  const items = [
    {
      key: '1',
      label: `${i18n.t('userProfile.userProfileSelector')}`,
      children: <UserData />,
    },
    {
      key: '2',
      label: `${i18n.t('userProfile.accountSettingsSelector')}`,
      children: <AccountData />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default UserProfile;

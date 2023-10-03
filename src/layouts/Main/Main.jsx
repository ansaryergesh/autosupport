import React, { useEffect } from 'react';
import Header from '../Header/Header.jsx';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import SidebarNav from '../SideBar/SideBar';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { LocalStorageKeys } from '../../storage/localStorageKey.js';
import { getOrganizationOpen } from '../../service/Organizations/index.js';
import InfoHelp from '../../components/InfoHelp/InfoHelp.jsx';

const Main = (props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const history = useHistory();

  const checkIfTokenIsValid = () => {
    const currentToken = localStorage.getItem(
      LocalStorageKeys.FREEDOM_ACCESS_TOKEN
    );

    return !!currentToken;
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!checkIfTokenIsValid()) {
      history.push('/sign-in');
    }
  }, [pathname, history]);

  useEffect(() => {
    if (!localStorage.getItem(LocalStorageKeys.ACTIVE_ORGANIZATION)) {
      getOrganizationOpen()
        .then((res) => {
          localStorage.setItem(
            LocalStorageKeys.ACTIVE_ORGANIZATION,
            res.data[0].code
          );
          location.reload();
        })
        .catch((err) => console.error(err));
    }
  }, []);
  const currentPath = history.location.pathname;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={'main-layout'}>
        {checkIfTokenIsValid() && (
          <Layout style={{ minHeight: '100vh' }}>
            <div className="sidebar-nav">
              <SidebarNav />
            </div>
            <Layout>
              <Layout.Content className="layout-content">
                <Header />
                <div style={{ paddingRight: '40px', paddingBottom: '40px' }}>
                  {children}
                  {currentPath !== '/' && <InfoHelp />}
                </div>
              </Layout.Content>
            </Layout>
          </Layout>
        )}
      </div>
    </DndProvider>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;

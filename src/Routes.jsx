import React from 'react';
import { Route, Switch, useLocation } from 'react-router';
import Main from './layouts/Main/Main.jsx';
import Home from './pages/Home/Home.jsx';
import SignIn from './pages/Auth/SignIn/SignIn.jsx';
import NewRequest from './pages/NewRequest/NewRequest.jsx';

function RouteWithLayout({
  layout,
  component,
  isAuthLoading = false,
  ...rest
}) {
  // if (isAuthLoading) {
  //     return <LazyLoading />;
  // }
  return (
    <Route
      {...rest}
      render={(props) =>
        React.createElement(
          layout,
          props,
          React.createElement(component, props)
        )
      }
    />
  );
}

const Routes = (props) => {
  const location = useLocation();

  return (
    <React.Fragment>
      <Switch>
        <RouteWithLayout exact layout={Main} component={Home} path="/" />
        <Route exact component={SignIn} path={'/sign-in'} />
        <RouteWithLayout
          exact
          layout={Main}
          component={NewRequest}
          path={'/new-request'}
        />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;

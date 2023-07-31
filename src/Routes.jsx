import React from 'react';
import { Route, Switch } from 'react-router';
import Main from './layouts/Main/Main.jsx';
import Home from './pages/Home/Home.jsx';
import SignIn from './pages/Auth/SignIn/SignIn.jsx';
import DetailedQuestion from './pages/DetailedQuestion/DetailedQuestion.jsx';
import PasswordRecovery from './pages/Auth/PasswordRecovery/PasswordRecovery.jsx';
import CodeVerify from './pages/Auth/CodeVerify/CodeVerify.jsx';
import NewPassword from './pages/Auth/NewPassword/NewPassword.jsx';
import Feedback from './pages/Feedback/Feedback.jsx';
import PropTypes from 'prop-types';

import NewRequest from './pages/NewRequest/NewRequest.jsx';

function RouteWithLayout({
  layout,
  component,
  isAuthLoading = false,
  ...rest
}) {
  if (isAuthLoading) {
      return <div>Loading</div>;
  }
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

const Routes = () => {
  return (
    <React.Fragment>
      <Switch>
        <RouteWithLayout exact layout={Main} component={Home} path="/" />
        <Route exact component={SignIn} path={'/sign-in'} />
        <Route exact component={PasswordRecovery} path={'/password-recovery'} />
        <Route exact component={NewPassword} path={'/new-password'} />
        <Route exact component={CodeVerify} path={'/code-verify'} />
        <RouteWithLayout
          exact
          layout={Main}
          component={Feedback}
          path="/feedback"
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={NewRequest}
          path={'/new-request'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={DetailedQuestion}
          path={'/detailedQuestion'}
        />
      </Switch>
    </React.Fragment>
  );
};
RouteWithLayout.propTypes = {
  layout: PropTypes.any,
  component: PropTypes.any,
  isAuthLoading: PropTypes.any
}
export default Routes;

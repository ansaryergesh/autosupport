import React from 'react';
import { Route, Switch } from 'react-router';
import Main from './layouts/Main/Main.jsx';
import Home from './pages/Home/Home.jsx';
import SignIn from './pages/Auth/SignIn/SignIn.jsx';
import DetailedQuestion from './pages/DetailedQuestion/DetailedQuestion.jsx';
import DetailedQuestionAdmin from './pages/DetailedQuestionAdmin/DetailedQuestionAdmin.jsx';
import PasswordRecovery from './pages/Auth/PasswordRecovery/PasswordRecovery.jsx';
import CodeVerify from './pages/Auth/CodeVerify/CodeVerify.jsx';
import NewPassword from './pages/Auth/NewPassword/NewPassword.jsx';
import Feedback from './pages/Feedback/Feedback.jsx';
import PropTypes from 'prop-types';
import NewRequest from './pages/NewRequest/NewRequest.jsx';
import AddNewAnswer from './pages/AddNewAnswer/AddNewAnswer.jsx';
import NewAnswer from './pages/NewAnswer/NewAnswer.jsx';
import Employees from './pages/Employees/Employees.jsx';
import Keywords from './pages/Keywords/Keywords.jsx';
import Tags from './pages/Tags/Tags.jsx';
import Organizations from './pages/Organizations/Organizations.jsx';
import Resources from './pages/Resources/Resources.jsx';
import Сategory from './pages/Сategory/Сategory.jsx';
import DetailedQuestionNew from './pages/DetailedQuestionNew/DetailedQuestionNew.jsx';

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
        <RouteWithLayout
          exact
          layout={Main}
          component={DetailedQuestionAdmin}
          path={'/detailedQuestionAdmin'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={DetailedQuestionNew}
          path={'/detailedQuestionNew'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={NewAnswer}
          path={'/new-answer'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={Employees}
          path={'/employees'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={AddNewAnswer}
          path={'/add-new-answer'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={NewAnswer}
          path={'/new-answer'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={Employees}
          path={'/employees'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={Keywords}
          path={'/keywords'}
        />
        <RouteWithLayout exact layout={Main} component={Tags} path={'/tags'} />
        <RouteWithLayout
          exact
          layout={Main}
          component={Organizations}
          path={'/organizations'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={Resources}
          path={'/resources'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={Сategory}
          path={'/category'}
        />
      </Switch>
    </React.Fragment>
  );
};
RouteWithLayout.propTypes = {
  layout: PropTypes.any,
  component: PropTypes.any,
  isAuthLoading: PropTypes.any
};
export default Routes;

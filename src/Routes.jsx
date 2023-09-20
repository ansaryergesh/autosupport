import React from 'react';
import { Route, Switch } from 'react-router';
import Main from './layouts/Main/Main.jsx';
import Home from './pages/Home/Home.jsx';
import SignIn from './pages/Auth/SignIn/SignIn.jsx';
import PasswordRecovery from './pages/Auth/PasswordRecovery/PasswordRecovery.jsx';
import CodeVerify from './pages/Auth/CodeVerify/CodeVerify.jsx';
import NewPassword from './pages/Auth/NewPassword/NewPassword.jsx';
import Feedback from './pages/Feedback/Feedback.jsx';
import PropTypes from 'prop-types';
import AddNewAnswer from './pages/AddNewAnswer/AddNewAnswer.jsx';
import NewAnswer from './pages/NewAnswer/NewAnswer.jsx';
import Employees from './pages/Employees/Employees.jsx';
import Organizations from './pages/Organizations/Organizations.jsx';
import Resources from './pages/Resources/Resources.jsx';
import Сategory from './pages/Сategory/Сategory.jsx';
import QuestionAnswerContent from './pages/QuestionAnswerContent/QuestionAnswerContent.jsx';
import QuestionAnswerUser from './pages/QuestionAnswerUser/QuestionAnswerUser.jsx';
import SearchHistory from './pages/SearchHistory/SearchHistory.jsx';
import UserProfile from './pages/UserProfile/UserProfile.jsx';
import NewTickets from './pages/Tickets/NewTickets.jsx';
import OldTickets from './pages/Tickets/OldTickets.jsx';
import Activate from "./pages/Auth/Activate/Activate.jsx";

function RouteWithLayout({ layout, component, isAuthLoading = false, ...rest }) {
  if (isAuthLoading) {
    return <div>Loading</div>;
  }
  return (
    <Route
      {...rest}
      render={(props) => React.createElement(layout, props, React.createElement(component, props))}
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
        <Route exact component={Activate} path={'/activation'} />
        <Route exact component={CodeVerify} path={'/code-verify'} />
        <RouteWithLayout exact layout={Main} component={SearchHistory} path="/search-history" />
        <RouteWithLayout exact layout={Main} component={Feedback} path="/feedback" />
        <RouteWithLayout
          exact
          layout={Main}
          component={QuestionAnswerContent}
          path={'/question/admin/:id'}
        />
        <RouteWithLayout
          exact
          layout={Main}
          component={QuestionAnswerUser}
          path={'/question/preview/:questionId/:resourceId'}
        />
        <RouteWithLayout exact layout={Main} component={NewAnswer} path={'/new-answer'} />
        <RouteWithLayout exact layout={Main} component={Employees} path={'/employees'} />
        <RouteWithLayout exact layout={Main} component={AddNewAnswer} path={'/add-new-answer'} />
        <RouteWithLayout exact layout={Main} component={NewAnswer} path={'/new-answer'} />
        <RouteWithLayout exact layout={Main} component={NewAnswer} path={'/new-answer'} />
        <RouteWithLayout exact layout={Main} component={Employees} path={'/employees'} />
        <RouteWithLayout exact layout={Main} component={AddNewAnswer} path={'/add-new-answer'} />
        <RouteWithLayout exact layout={Main} component={Employees} path={'/employees'} />
        <RouteWithLayout exact layout={Main} component={Organizations} path={'/organizations'} />
        <RouteWithLayout exact layout={Main} component={Resources} path={'/resources'} />
        <RouteWithLayout exact layout={Main} component={Сategory} path={'/category/:id'} />
        <RouteWithLayout exact layout={Main} component={NewTickets} path={'/new-tickets'} />
        <RouteWithLayout exact layout={Main} component={OldTickets} path={'/old-tickets'} />
        <RouteWithLayout exact layout={Main} component={UserProfile} path={'/user-profile'} />
      </Switch>
    </React.Fragment>
  );
};
RouteWithLayout.propTypes = {
  layout: PropTypes.any,
  component: PropTypes.any,
  isAuthLoading: PropTypes.any,
};
export default Routes;

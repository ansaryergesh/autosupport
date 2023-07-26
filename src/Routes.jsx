import React from 'react';
<<<<<<< HEAD
import { Route, Switch, useLocation } from "react-router";
import Main from "./layouts/Main/Main.jsx";
import Home from "./pages/Home/Home.jsx";
import SignIn from "./pages/Auth/SignIn/SignIn.jsx";
import DetailedQuestion from './pages/DetailedQuestion/DetailedQuestion.jsx';
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
=======
import { Route, Switch, useLocation } from 'react-router';
import Main from './layouts/Main/Main.jsx';
import Home from './pages/Home/Home.jsx';
import SignIn from './pages/Auth/SignIn/SignIn.jsx';
import NewRequest from './pages/NewRequest/NewRequest.jsx';
>>>>>>> d4d109ef45a870bdc6cbb5d4a23ae0c8289c7685

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

<<<<<<< HEAD
    return (
        <React.Fragment>
            <Switch>
                <RouteWithLayout
                    exact
                    layout={Main}
                    component={Home}
                    path="/"
                />
                <Route
                    exact
                    component={SignIn}
                    path={"/sign-in"}
                />
                <RouteWithLayout
                    exact
                    layout={Main}
                    component={DetailedQuestion}
                    path={"/detailedquestion"}
                />
            </Switch>
        </React.Fragment>
    )
}
=======
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
>>>>>>> d4d109ef45a870bdc6cbb5d4a23ae0c8289c7685

export default Routes;

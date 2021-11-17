import "./App.less";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useStore } from "./store";
import shallow from "zustand/shallow";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Operators from "./pages/operators/Operators";
import Guests from "./pages/guests/Guests";
import Tasks from "./pages/tasks/Tasks";

import Sites from "./pages/sites/list/Sites";
import SiteCreate from "./pages/sites/create/SiteCreate";

export const PublicRoute = ({ ...props }) => {
  const { authed } = useStore(
    (state) => ({
      authed: state.authed,
    }),
    shallow
  );
  return authed ? <Redirect to="/" /> : <Route {...props} />;
};

const PrivateRoute = ({ children, ...rest }) => {
  const { authed } = useStore(
    (state) => ({
      authed: state.authed,
    }),
    shallow
  );
  return authed ? (
    <Route {...rest} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  );
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PublicRoute path="/signup">
            <Signup />
          </PublicRoute>
          <AppLayout>
            <PrivateRoute
              exact
              path="/"
              render={({ match: { url } }) => <Dashboard />}
            />
            <PrivateRoute
              path="/sites"
              render={({ match: { url } }) => (
                <>
                  <PrivateRoute path={`${url}/`} component={Sites} exact />
                  <Switch>
                    <PrivateRoute
                      path={`${url}/create`}
                      component={SiteCreate}
                      exact
                    />
                    <PrivateRoute
                      path={`${url}/:id`}
                      component={SiteCreate}
                      exact
                    />
                  </Switch>
                </>
              )}
            />
            <PrivateRoute
              path="/tasks"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} component={Tasks} exact />
                  {/* <Route path={`${url}/create`} component={SiteCreate} /> */}
                </>
              )}
            />
            <PrivateRoute
              path="/guests"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} component={Guests} exact />
                  {/* <Route path={`${url}/create`} component={SiteCreate} /> */}
                </>
              )}
            />
            <PrivateRoute
              path="/operators"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} component={Operators} exact />
                  {/* <Route path={`${url}/create`} component={SiteCreate} /> */}
                </>
              )}
            />
          </AppLayout>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

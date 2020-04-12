import React from 'react';
import {
  HashRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import './App.css';
import BarbellCalculatorPage from './ui/pages/BarbellCalculatorPage';
import LoginPage from './ui/pages/LoginPage';
import Register from './ui/pages/Register';
import LandingPage from './ui/pages/LandingPage';
import Test from './ui/pages/Test';
import 'semantic-ui-css/semantic.min.css';
import NotFound from './ui/pages/NotFound';

export const paths = {
  LOGIN: 'login',
  REGISTER: 'register',
  CALCULATOR: 'calculator',
  TEST: 'test',
};

const unprotectedRoutes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: `/${paths.LOGIN}`,
    exact: false,
    component: LoginPage,
  },
  {
    path: `/${paths.REGISTER}`,
    exact: false,
    component: Register,
  },
  {
    path: `/${paths.TEST}`,
    exact: false,
    component: Test,
  },
];

const protectedRoutes = [
  {
    path: `/${paths.CALCULATOR}`,
    exact: true,
    component: BarbellCalculatorPage,
  },
];

const App = () => (
  <Router>
    <Switch>
      {unprotectedRoutes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      {protectedRoutes.map((route) => (
        <Route key={route.path} {...route} /> // TODO Change to ProtectedRoute after Auth is implemented
      ))}
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // TODO: Auth
      const isLoggedIn = false;
      return isLoggedIn
        ? (<Component {...props} />)
        : (<Redirect to={{ pathname: `/${paths.LOGIN}`, state: { from: props.location } }} />);
    }}
  />
);

export default App;

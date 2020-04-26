import React from 'react';
import {
  HashRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import './App.css';
import * as jwt from 'jsonwebtoken';
import LoginPage from './ui/pages/LoginPage';
import Register from './ui/pages/Register';
import LandingPage from './ui/pages/LandingPage';
import 'semantic-ui-css/semantic.min.css';
import NotFound from './ui/pages/NotFound';
/* eslint-disable import/no-cycle */
import BarbellCalculatorPage from './ui/pages/BarbellCalculatorPage';
import Converter from './ui/pages/Converter';
import WeightInventoryPage from './ui/pages/WeightInventoryPage';
/* eslint-enable import/no-cycle */
import Unauthorized from './ui/pages/Unauthorized';

export const paths = {
  LOGIN: 'login',
  REGISTER: 'register',
  CALCULATOR: 'calculator',
  CONVERTER: 'converter',
  INVENTORY: 'inventory',
  UNAUTHORIZED: 'unauthorized',
};

const unprotectedRoutes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: `/${paths.LOGIN}`,
    exact: true,
    component: LoginPage,
  },
  {
    path: `/${paths.REGISTER}`,
    exact: true,
    component: Register,
  },
  {
    path: `/${paths.UNAUTHORIZED}`,
    exact: true,
    component: Unauthorized,
  },
];

const protectedRoutes = [
  {
    path: `/${paths.CALCULATOR}`,
    exact: true,
    component: BarbellCalculatorPage,
  },
  {
    path: `/${paths.INVENTORY}`,
    exact: true,
    component: WeightInventoryPage,
  },
  {
    path: `/${paths.CONVERTER}`,
    exact: true,
    component: Converter,
  },
];

const App = () => (
  <Router>
    <Switch>
      {unprotectedRoutes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      {protectedRoutes.map((route) => (
        <ProtectedRoute key={route.path} {...route} />
      ))}
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      let isLoggedIn = false;
      const userToken = window.localStorage.getItem('user-token');
      jwt.verify(userToken, 'secret', (err) => {
        if (err) {
          console.log(err);
          return;
        }
        isLoggedIn = true;
      });
      return isLoggedIn
        ? (<Component {...props} />)
        // eslint-disable-next-line react/prop-types
        : (<Redirect to={{ pathname: `/${paths.UNAUTHORIZED}`, state: { from: props.location } }}/>);
    }}
  />
);

export default App;

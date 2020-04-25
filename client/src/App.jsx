import React from 'react';
import {
  HashRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import './App.css';
// import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import BarbellCalculatorPage from './ui/pages/BarbellCalculatorPage';
import LoginPage from './ui/pages/LoginPage';
import Register from './ui/pages/Register';
import LandingPage from './ui/pages/LandingPage';
import Test from './ui/pages/Test';
import 'semantic-ui-css/semantic.min.css';
import NotFound from './ui/pages/NotFound';
import WeightInventoryPage from './ui/pages/WeightInventoryPage';
import Unauthorized from './ui/pages/Unauthorized';

export const paths = {
  LOGIN: 'login',
  REGISTER: 'register',
  CALCULATOR: 'calculator',
  TEST: 'test',
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
    path: `/${paths.TEST}`,
    exact: false,
    component: Test,
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

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      let isLoggedIn = false;
      const userToken = window.localStorage.getItem('user-token');
      // axios
      //   .get('http://localhost:3001/api/user/', {
      //     headers: {
      //       Authorization: `Bearer ${userToken}`,
      //     },
      //   })
      //   .then(function (response) {
      //     console.log('response data user token ', response.data.user.token);
      //     if (response.data.user.token !== undefined) {
      //       isLoggedIn = true;
      //     }
      //   })
      //   .catch(function (err) {
      //     console.log(' err %o', err);
      //   });
      jwt.verify(userToken, 'secret', (err, data) => {
        if (err) {
          console.log(err);
        }
        isLoggedIn = true;
      });
      return isLoggedIn
        ? (<Component {...props} />)
        : (<Redirect to={{ pathname: `/${paths.UNAUTHORIZED}`, state: { from: props.location } }}/>);
    }}
  />
);

export default App;

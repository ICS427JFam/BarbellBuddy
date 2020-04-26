import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <Header as="h1" textAlign="center">
    <p>You are not authorized to view this page. Please login to access this page</p>
    <Button as={Link} exact to="/">Go back to Home</Button>
    <br/>
    <Button as={Link} exact to="/login">Login</Button>
  </Header>
);

export default Unauthorized;

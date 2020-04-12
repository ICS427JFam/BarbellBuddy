import React from 'react';
import { Header } from 'semantic-ui-react';

const Unauthorized = () => (
  <Header as="h1" textAlign="center">
    <p>You are not authorized to view this page.</p>
  </Header>
);

export default Unauthorized;

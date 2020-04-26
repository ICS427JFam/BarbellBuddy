import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const divStyle = {
  padding: '0',
  margin: '0',
  border: '0',
  borderRadius: '0',
};

const menuItems = [
  { label: 'BarbellBuddy', route: '/' },
  { label: 'Sign Up', route: 'register' },
  { label: 'Login', route: 'login' },
];

const LandingNavBar = () => (
  <Menu inverted style={divStyle}>
    {menuItems.map((item) => (
      <Menu.Item header key={item.route} as={NavLink} exact to={item.route}>
        <Header inverted as="h3">{item.label}</Header>
      </Menu.Item>
    ))}
  </Menu>
);

export default LandingNavBar;

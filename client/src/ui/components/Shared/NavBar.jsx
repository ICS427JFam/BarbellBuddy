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
  { label: 'Home', route: '/' },
  { label: 'Barbell Calculator', route: 'calculator' },
  { label: 'Weight Inventory', route: 'inventory' },
  { label: 'Unit Conversion Calculator', route: 'converter' },
];

const NavBar = () => (
  <Menu inverted fluid widths={menuItems.length} style={divStyle}>
    {menuItems.map((item) => (
      <Menu.Item header key={item.route} as={NavLink} exact to={item.route}>
        <Header inverted as="h3">{item.label}</Header>
      </Menu.Item>
    ))}
  </Menu>
);

export default NavBar;

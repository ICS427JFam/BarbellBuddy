import React from 'react';
import { Menu } from 'semantic-ui-react';

const divStyle = {
  padding: '0',
  margin: '0',
  border: '0',
  borderRadius: '0',
};

const NavBar = () => (
  <div>
    <Menu inverted fluid widths={3} style={divStyle}>
      <Menu.Item
        header
        name="Barbell Calculator"
      />
      <Menu.Item
        header
        name="Weight Inventory"
      />
      <Menu.Item
        header
        name="Conversion Calculator"
      />
    </Menu>
  </div>
);

export default NavBar;

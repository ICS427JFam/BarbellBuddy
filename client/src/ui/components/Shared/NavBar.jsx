import React from 'react';
import { Menu, Header, Image } from 'semantic-ui-react';

const NavBar = () => (
  <div>
    <Header>
      Test
    </Header>
    <Menu fluid widths={3}>
      <Menu.Item
        header="true"
        name="Barbell Calculator"
      />
      <Menu.Item
        header="true"
        name="Weight Inventory"
      />
      <Menu.Item
        header="true"
        name="Conversion Calculator"
      />
    </Menu>
  </div>
);

export default NavBar;

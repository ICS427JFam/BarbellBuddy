import React from 'react';
import { Menu, Segment, Image } from 'semantic-ui-react';

const divStyle = {
  padding: '0',
  margin: '0',
  border: '0',
  borderRadius: '0',
};

const NavBar = () => (
  <div>
    <Segment style={divStyle}>
      <Image fluid src="https://raw.githubusercontent.com/ICS427JFam/BarbellBuddy/NavBar/client/public/bbLogo.png" />
    </Segment>
    <Menu inverted fluid widths={3} style={divStyle}>
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

import React from 'react';
import { Grid, Icon, Menu } from 'semantic-ui-react';

const footerStyle = {
  height: '125px',
  backgroundColor: 'black',
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
};

const divStyle = {
  paddingTop: '15px',
  color: 'white',
};

const fontStyle = { color: '#fff' };
const iconStyle = { paddingLeft: '10px' };

const Footer = () => (
  <div style={footerStyle}>
    <footer>
      <div style={divStyle}>
        <Grid columns={7} centered stackable>
          <Grid.Row centered verticalAlign="middle">
            <a href="https://github.com/ICS427JFam/BarbellBuddy" style={fontStyle}>
              SOURCE CODE <Icon style={iconStyle} name="github alternate" size="large"/>
            </a>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column textAlign="center">
              <a href="https://github.com/gcalica" style={fontStyle}>
                Gian Calica <Icon style={iconStyle} name="github"/>
              </a>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <a href="https://github.com/TysenImaiToyama" style={fontStyle}>
                Tysen-Imai Tomaya <Icon style={iconStyle} name="github"/>
              </a>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <a href="https://github.com/mercedezcastro" style={fontStyle}>
                Mercedez Castro <Icon style={iconStyle} name="github"/>
              </a>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <a href="https://github.com/hyosuns" style={fontStyle}>
                Hyosun Song <Icon style={iconStyle} name="github"/>
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </footer>
  </div>
);

export default Footer;

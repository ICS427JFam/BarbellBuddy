import React from 'react';
import { Image, Segment, Menu, Button } from 'semantic-ui-react';
import Footer from '../components/Shared/Footer';

const divStyle = {
  padding: '0',
  margin: '0',
  border: '0',
  borderRadius: '0',
};

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={divStyle}>

        <Menu inverted style={divStyle}>
          <Menu.Item>
            <Button secondary compact>Sign up</Button>
          </Menu.Item>

          <Menu.Item>
            <Button secondary compact>Log in</Button>
          </Menu.Item>
        </Menu>

        <Segment style={divStyle}>
          <Image fluid src="https://raw.githubusercontent.com/ICS427JFam/BarbellBuddy/NavBar/client/public/bbLogo.png"/>
        </Segment>

        <Segment style={divStyle}>
          <Image
            fluid
            src="https://raw.githubusercontent.com/ICS427JFam/BarbellBuddy/NavBar/client/public/landingDescription.png"
          />
        </Segment>

        <Segment style={divStyle}>
          <Image
            fluid
            src="https://raw.githubusercontent.com/ICS427JFam/BarbellBuddy/NavBar/client/public/landingCalc.png"
          />
        </Segment>

        < Footer/>
      </div>
    );
  }
}

export default LandingPage;

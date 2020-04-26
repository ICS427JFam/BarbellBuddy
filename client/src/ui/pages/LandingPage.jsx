import React from 'react';
import { Image, Segment } from 'semantic-ui-react';
import Footer from '../components/Shared/Footer';
import LandingNavBar from '../components/Shared/LandingNavBar';

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
        <LandingNavBar/>

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
